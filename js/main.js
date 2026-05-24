// ===== Data =====
const blogPosts = [
  {
    id: 11,
    file: true,
    title: '深夜收到竞聘通知',
    tag: '维权日记',
    excerpt: '晚上十点多收到竞聘通知，自己的岗位被拿出来公开竞聘，规划设计中心仅保留两个人——这一夜我想了很多。',
    date: '2026-04-24',
    readTime: '5 分钟',
  },
  {
    id: 10,
    file: true,
    title: '用 AI 卸载 360 安全卫士',
    tag: 'AI 心得',
    excerpt: '我说了一句话，AI 自己把 360 卸载了——从侦察、试错、突破到生成卸载工具，全程自主完成。这是我见过 AI 最有"自主性"的一次。',
    date: '2026-05-24',
    readTime: '12 分钟',
  },
  {
    id: 7,
    file: true,
    title: '零成本搭建个人博客全记录',
    tag: 'AI 资源',
    excerpt: '用 Claude 生成网站、GitHub 管理代码、Vercel 自动部署——一个 50 岁的建筑人搞定自己博客的完整过程。',
    date: '2026-05-21',
    readTime: '10 分钟',
  },
  {
    id: 8,
    title: 'RAG 到底是什么？一个建筑人的理解',
    tag: 'AI 心得',
    excerpt: '不用技术术语，用建筑人的方式理解 RAG——从什么是向量数据库到怎么搭一个自己的知识库，这是我学 RAG 的心得。',
    date: '2026-05-22',
    readTime: '8 分钟',
  },
  {
    id: 9,
    title: '我每天都在用的 5 个 AI 工具',
    tag: 'AI 资源',
    excerpt: 'Claude、ChatGPT、Perplexity、Cursor……这些工具每天帮我写文档、学新知识、搭原型。推荐给每一位想用AI提效的朋友。',
    date: '2026-05-23',
    readTime: '7 分钟',
  },
  {
    id: 2,
    title: '50 岁学 AI 晚不晚？我的三个月入门总结',
    tag: 'AI 心得',
    excerpt: '一个建筑专业出身、离开校园二十多年的人，从零开始学AI的真实经历。踩过的坑、用对的方法、最推荐的工具。',
    date: '2026-05-18',
    readTime: '6 分钟',
  },
  {
    id: 6,
    title: '我用 AI 搭建了一个法律文书助手',
    tag: 'AI 作品',
    excerpt: '为自己的维权案件写法律文书时，我发现 AI 可以帮大忙。从提示词到工作流，手把手教你用 AI 处理法律文档。',
    date: '2026-05-08',
    readTime: '12 分钟',
  },
];

const tools = [
  {
    name: 'Claude',
    category: '对话助手',
    desc: 'Anthropic 出品的高级 AI 助手，擅长编程、写作、分析和创意任务。我每天用得最多的 AI 工具。',
    url: 'https://claude.ai',
  },
  {
    name: 'ChatGPT',
    category: '对话助手',
    desc: '通用对话 AI，支持多模态和插件。日常头脑风暴、文档起草的好帮手。',
    url: 'https://chat.openai.com',
  },
  {
    name: 'Perplexity',
    category: '对话助手',
    desc: 'AI 搜索引擎，带引用来源的实时回答。查资料比传统搜索高效太多。',
    url: 'https://www.perplexity.ai',
  },
  {
    name: 'Kimi',
    category: '对话助手',
    desc: '国产长文本 AI，一次能处理几十万字的文档。我用来读论文、分析合同。',
    url: 'https://kimi.moonshot.cn',
  },
  {
    name: 'Cursor',
    category: '编程开发',
    desc: 'AI 优先的代码编辑器，内置对话式编程助手。我学写代码全靠它。',
    url: 'https://cursor.sh',
  },
  {
    name: 'GitHub Copilot',
    category: '编程开发',
    desc: 'VS Code 里的 AI 代码补全插件，写代码时自动提示，效率翻倍。',
    url: 'https://github.com/features/copilot',
  },
  {
    name: 'Claude Code',
    category: '编程开发',
    desc: '终端里的 AI 编程助手，能读整个项目、改代码、跑命令。这个网站就是用 Claude Code 做的。',
    url: 'https://claude.ai/code',
  },
  {
    name: 'Notion',
    category: '内容创作',
    desc: 'AI 增强笔记工具，写文档、做计划、记笔记一站式搞定。我的知识库就在 Notion 里。',
    url: 'https://www.notion.so',
  },
  {
    name: 'Gamma',
    category: '内容创作',
    desc: 'AI 生成演示文稿的工具，输入主题就能生成漂亮的 PPT。做分享汇报太方便了。',
    url: 'https://gamma.app',
  },
  {
    name: '飞书',
    category: '内容创作',
    desc: '字节跳动出品的一体化办公平台。文档协作、会议、知识库都好用。',
    url: 'https://www.feishu.cn',
  },
  {
    name: 'Midjourney',
    category: '设计创意',
    desc: 'AI 图像生成工具，输入描述就能生成高质量图片。我用来做博客配图和设计灵感。',
    url: 'https://www.midjourney.com',
  },
  {
    name: 'Canva',
    category: '设计创意',
    desc: '在线设计平台，内置 AI 功能。非设计人员也能做出好看的海报和封面图。',
    url: 'https://www.canva.cn',
  },
  {
    name: 'Suno',
    category: '设计创意',
    desc: 'AI 音乐生成工具，用文字描述就能生成音乐。玩一玩很有意思。',
    url: 'https://suno.com',
  },
];

// ===== Render Functions =====
function createPostCard(post) {
  const link = post.file
    ? `<a href="/blog/post-${post.id}.html" class="card-link">阅读全文 →</a>`
    : '';
  return `
    <article class="card">
      <span class="card-tag">${post.tag}</span>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <div class="card-meta">
        <span>${post.date}</span>
        <span>${post.readTime}</span>
      </div>
      ${link}
    </article>
  `;
}

function createToolCard(tool) {
  const icons = {
    '对话助手': '💬',
    '编程开发': '💻',
    '内容创作': '✍',
    '设计创意': '🎨',
  };
  return `
    <div class="card tool-card" data-category="${tool.category}">
      <div class="tool-icon">${icons[tool.category] || '🔧'}</div>
      <h3>${tool.name}</h3>
      <p>${tool.desc}</p>
      <a href="${tool.url}" class="btn btn-outline" target="_blank" rel="noopener">访问 →</a>
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
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem 0;">暂无该分类文章</p>';
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
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-secondary);padding:2rem 0;">暂无该分类资源</p>';
    return;
  }

  // Remove cards briefly so re-enter animation plays
  container.style.animation = 'none';
  container.offsetHeight; // force reflow
  container.innerHTML = filtered.map(createToolCard).join('');
  container.style.animation = '';
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

// ===== Dark Mode =====
function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function setupThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  setTheme(getPreferredTheme());

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// ===== Scroll Animations =====
function setupScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (els.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  els.forEach((el) => observer.observe(el));
}

// ===== Back to Top =====
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const btn = form.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = '已订阅！';
    btn.style.opacity = '0.7';
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
  setupThemeToggle();
  setupBackToTop();
  setupScrollAnimations();

  // Page-specific init
  loadLatestPosts();
  loadPosts();
  loadTools();

  setupFilters('filterBar', loadPosts);
  setupFilters('toolFilterBar', loadTools);
});
