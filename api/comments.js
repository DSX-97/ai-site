import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (req.method === 'GET') {
      const page = url.searchParams.get('page') || 'guestbook';
      const comments = await sql`
        SELECT id, parent_id, author, content, is_admin, created_at
        FROM comments
        WHERE page = ${page}
        ORDER BY created_at ASC
      `;
      return new Response(JSON.stringify(comments), { headers });
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const { page, author, email, content, parentId, adminSecret } = body;

      if (!author?.trim() || !content?.trim()) {
        return new Response(
          JSON.stringify({ error: '昵称和内容不能为空' }),
          { status: 400, headers }
        );
      }

      if (content.length > 2000) {
        return new Response(
          JSON.stringify({ error: '内容不能超过2000字' }),
          { status: 400, headers }
        );
      }

      const isAdmin = adminSecret && adminSecret === process.env.ADMIN_SECRET;

      const result = await sql`
        INSERT INTO comments (page, parent_id, author, email, content, is_admin)
        VALUES (${page || 'guestbook'}, ${parentId || null}, ${author.trim()}, ${email?.trim() || null}, ${content.trim()}, ${isAdmin})
        RETURNING id, parent_id, author, content, is_admin, created_at
      `;

      return new Response(JSON.stringify(result[0]), { status: 201, headers });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  } catch (err) {
    console.error('Comment API error:', err);
    return new Response(JSON.stringify({ error: '服务器内部错误' }), {
      status: 500,
      headers,
    });
  }
}
