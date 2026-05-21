// ===== Data =====
const blogPosts = [
  {
    id: 1,
    title: '2026 年 AI 学习路线图：从入门到精通',
    tag: '学习',
    excerpt: '系统化的 AI 学习路径，涵盖数学基础、机器学习、深度学习到大语言模型的完整学习路线。',
    date: '2026-05-20',
    readTime: '8 分钟',
  },
  {
    id: 2,
    title: 'Claude Code 深度评测：AI 编程助手的新标杆',
    tag: '工具',
    excerpt: '全面评测 Claude Code 的编程能力、使用技巧和实际项目中的应用效果。',
    date: '2026-05-18',
    readTime: '6 分钟',
  },
  {
    id: 3,
    title: '用 AI 搭建一个智能客服机器人：完整教程',
    tag: '实验',
    excerpt: '手把手教你从零搭建一个基于大语言模型的智能客服系统，包含完整代码。',
    date: '2026-05-15',
    readTime: '12 分钟',
  },
  {
    id: 4,
    title: '10 个必知的 Prompt Engineering 技巧',
    tag: '学习',
    excerpt: '掌握提示词工程的核心技巧，大幅提升与大语言模型的协作效率。',
    date: '2026-05-13',
    readTime: '5 分钟',
  },
  {
    id: 5,
    title: '2026 年最佳 AI 免费资源合集',
    tag: '资源',
    excerpt: '整理 50+ 高质量的免费 AI 学习资源，包括课程、书籍、论文和数据集。',
    date: '2026-05-10',
    readTime: '10 分钟',
  },
  {
    id: 6,
    title: 'RAG 技术实战：构建知识库问答系统',
    tag: '实验',
    excerpt: '深入讲解 RAG（检索增强生成）技术原理，并动手实现一个文档问答系统。',
    date: '2026-05-08',
    readTime: '15 分钟',
  },
  {
    id: 7,
    title: '零成本搭建 AI 内容网站全记录',
    tag: '学习',
    excerpt: '用 Claude 生成网站、GitHub 管理代码、Vercel 自动部署——打造一个纯静态内容站点的完整过程。',
    date: '2026-05-21',
    readTime: '10 分钟',
  },
];

const tools = [
  {
    name: 'Claude',
    category: '对话',
    desc: 'Anthropic 出品的高级 AI 助手，擅长编程、写作、分析和创意任务。',
    url: 'https://claude.ai',
  },
  {
    name: 'ChatGPT',
    category: '对话',
    desc: 'OpenAI 开发的通用对话 AI，支持多模态、代码解释和插件扩展。',
    url: 'https://chat.openai.com',
  },
  {
    name: 'GitHub Copilot',
    category: '编程',
    desc: 'AI 编程助手，实时提供代码建议，支持主流 IDE 和多种编程语言。',
    url: 'https://github.com/features/copilot',
  },
  {
    name: 'Cursor',
    category: '编程',
    desc: 'AI-first 代码编辑器，内置强大的 AI 辅助编程功能。',
    url: 'https://cursor.sh',
  },
  {
    name: 'Notion AI',
    category: '写作',
    desc: '集成在 Notion 中的 AI 写作助手，帮助写作、总结和头脑风暴。',
    url: 'https://www.notion.so/product/ai',
  },
  {
    name: 'Midjourney',
    category: '设计',
    desc: 'AI 图像生成工具，通过文本描述创建高质量的艺术作品和设计。',
    url: 'https://www.midjourney.com',
  },
  {
    name: 'Perplexity',
    category: '对话',
    desc: 'AI 搜索引擎，提供带引用的实时答案，适合研究和学习。',
    url: 'https://www.perplexity.ai',
  },
  {
    name: 'Windsurf',
    category: '编程',
    desc: '智能 AI 编程 IDE，支持多文件编辑和深度代码理解。',
    url: 'https://codeium.com/windsurf',
  },
];

// ===== Render Functions =====
function createPostCard(post) {
  return `
    <article class="card">
      <span class="card-tag">${post.tag}</span>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <div class="card-meta">
        <span>${post.date}</span>
        <span>${post.readTime}</span>
      </div>
      <a href="/blog/post-${post.id}.html" class="card-link">阅读全文 →</a>
    </article>
  `;
}

function createToolCard(tool) {
  const icons = {
    '对话': '💬',
    '编程': '💻',
    '写作': '✍️',
    '设计': '🎨',
  };
  return `
    <div class="card tool-card" data-category="${tool.category}">
      <div class="tool-icon">${icons[tool.category] || '🔧'}</div>
      <h3>${tool.name}</h3>
      <p>${tool.desc}</p>
      <a href="${tool.url}" class="btn btn-outline" target="_blank" rel="noopener">访问网站 →</a>
    </div>
  `;
}

// ===== Load Posts =====
function loadPosts(filter = 'all') {
  const container = document.getElementById('blogPosts');
  if (!container) return;

  const filtered = filter === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.tag === filter);

  if (filtered.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem 0;">暂无相关内容</p>';
    return;
  }

  container.innerHTML = filtered.map(createPostCard).join('');
}

function loadLatestPosts() {
  const container = document.getElementById('latestPosts');
  if (!container) return;
  container.innerHTML = blogPosts.slice(0, 3).map(createPostCard).join('');
}

// ===== Load Tools =====
function loadTools(filter = 'all') {
  const container = document.getElementById('toolGrid');
  if (!container) return;

  const filtered = filter === 'all'
    ? tools
    : tools.filter(t => t.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem 0;">暂无该分类工具</p>';
    return;
  }

  container.innerHTML = filtered.map(createToolCard).join('');
}

// ===== Filter Bar =====
function setupFilters(barId, loadFn) {
  const bar = document.getElementById(barId);
  if (!bar) return;

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadFn(btn.dataset.filter);
  });
}

// ===== Mobile Toggle =====
function setupMobileToggle() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('navLinks');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
}

// ===== Newsletter =====
function setupNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const email = input.value.trim();

    if (!email) return;

    // Placeholder — 替换为真实的 API 端点
    const btn = form.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = '已订阅！';
    btn.style.opacity = '0.8';
    input.value = '';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.opacity = '1';
    }, 3000);
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  setupMobileToggle();
  setupNewsletter();

  // Page-specific init
  loadLatestPosts();
  loadPosts();
  loadTools();

  setupFilters('filterBar', loadPosts);
  setupFilters('toolFilterBar', loadTools);
});
