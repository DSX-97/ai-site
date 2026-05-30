CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  parent_id INTEGER REFERENCES comments(id),
  author TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comments_page ON comments(page);
