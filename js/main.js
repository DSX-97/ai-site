// ===== Data =====
const blogPosts = [
  {
    id: 1,
    file: true,
    title: '维权日记（一）：国企六年，一场竞聘让我看清了什么',
    tag: '维权',
    excerpt: '从规划设计中心总经理到被"优化"对象，我用一纸法律文书回应了公司三年的调岗降薪。这不是一篇诉苦文，是我维权路上第一课。',
    date: '2026-05-20',
    readTime: '8 分钟',
  },
  {
    id: 2,
    title: '50 岁学 AI 晚不晚？我的三个月入门总结',
    tag: 'AI',
    excerpt: '一个建筑专业出身、离开校园二十多年的人，从零开始学AI的真实经历。踩过的坑、用对的方法、最推荐的工具。',
    date: '2026-05-18',
    readTime: '6 分钟',
  },
  {
    id: 3,
    title: '我和二十多岁的同学坐在一起读研',
    tag: '生活',
    excerpt: '重返校园的第一周，我就坐在比自己小二十多岁的同学中间。说说这种奇妙的感觉，以及为什么这个年纪读书反而更有效率。',
    date: '2026-05-15',
    readTime: '5 分钟',
  },
  {
    id: 4,
    title: '中年创业想法的萌芽：从被逼到主动',
    tag: '创业',
    excerpt: '当公司告诉你"你该走了"，你面前只有两条路。我选了那条更难但也更有意思的路——自己当老板。',
    date: '2026-05-13',
    readTime: '7 分钟',
  },
  {
    id: 5,
    title: '劳动仲裁全流程记录：我学到的五件事',
    tag: '维权',
    excerpt: '从提交申请到开庭，一个普通人的劳动仲裁完整记录。不煽情，只讲实操——证据怎么准备、流程怎么走、心态怎么稳。',
    date: '2026-05-10',
    readTime: '10 分钟',
  },
  {
    id: 6,
    title: '我用 AI 搭建了一个法律文书助手',
    tag: 'AI',
    excerpt: '为自己的维权案件写法律文书时，我发现 AI 可以帮大忙。从提示词到工作流，手把手教你用 AI 处理法律文档。',
    date: '2026-05-08',
    readTime: '12 分钟',
  },
  {
    id: 7,
    file: true,
    title: '零成本搭建个人博客全记录',
    tag: 'AI',
    excerpt: '用 Claude 生成网站、GitHub 管理代码、Vercel 自动部署——一个 50 岁的建筑人搞定自己博客的完整过程。',
    date: '2026-05-21',
    readTime: '10 分钟',
  },
];

const tools = [
  {
    name: 'Claude',
    category: 'AI',
    desc: 'Anthropic 出品的高级 AI 助手，擅长编程、写作、分析和创意任务。我用来写博客、学编程、搭自动化。',
    url: 'https://claude.ai',
  },
  {
    name: 'ChatGPT',
    category: 'AI',
    desc: '通用对话 AI，支持多模态和插件。日常学习、法律咨询、文档起草都能用上。',
    url: 'https://chat.openai.com',
  },
  {
    name: '中国法律服务网',
    category: '法律',
    desc: '司法部官方法律援助平台，提供免费法律咨询、文书模板和案例检索。维权必备。',
    url: 'https://www.12348.gov.cn',
  },
  {
    name: '中国裁判文书网',
    category: '法律',
    desc: '公开裁判文书数据库，可以检索类似案件的判决结果，为维权提供参考。',
    url: 'https://wenshu.court.gov.cn',
  },
  {
    name: '中国大学MOOC',
    category: '学习',
    desc: '国内最大的在线课程平台，有大量名校免费课程。我在这里补法学和计算机基础。',
    url: 'https://www.icourse163.org',
  },
  {
    name: '知网',
    category: '学习',
    desc: '学术论文数据库，写论文查资料的首选。研究生阶段的必备工具。',
    url: 'https://www.cnki.net',
  },
  {
    name: 'Notion',
    category: '效率',
    desc: 'All-in-one 笔记和项目管理工具。我用它记课堂笔记、管理维权进度、梳理创业想法。',
    url: 'https://www.notion.so',
  },
  {
    name: '飞书',
    category: '效率',
    desc: '字节跳动出品的一体化办公平台。文档、会议、任务管理一站式解决。',
    url: 'https://www.feishu.cn',
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
    'AI': '🤖',
    '法律': '⚖',
    '学习': '📖',
    '效率': '⚡',
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
  container.innerHTML = blogPosts.filter(p => p.file).slice(0, 3).map(createPostCard).join('');
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
