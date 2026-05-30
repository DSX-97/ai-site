(function () {
  'use strict';

  const container = document.getElementById('comments-section');
  if (!container) return;

  const page = container.dataset.postId || 'guestbook';
  const api = '/api/comments';

  // Load saved author name
  const savedAuthor = localStorage.getItem('comment_author') || '';

  // State
  let comments = [];
  let replyTo = null; // { id, author }

  // --- Render ---

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function timeAgo(dateStr) {
    const now = new Date();
    const d = new Date(dateStr);
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
    if (diff < 2592000) return Math.floor(diff / 86400) + '天前';
    return d.toLocaleDateString('zh-CN');
  }

  function buildCommentTree(commentsList) {
    const map = {};
    const roots = [];
    commentsList.forEach((c) => {
      map[c.id] = { ...c, replies: [] };
    });
    commentsList.forEach((c) => {
      if (c.parent_id && map[c.parent_id]) {
        map[c.parent_id].replies.push(map[c.id]);
      } else {
        roots.push(map[c.id]);
      }
    });
    return roots;
  }

  function renderComment(comment, isReply = false) {
    const adminBadge = comment.is_admin
      ? '<span class="cmt-admin-badge">作者</span>'
      : '';
    return `
      <div class="cmt-item ${isReply ? 'cmt-reply' : ''}" data-id="${comment.id}">
        <div class="cmt-head">
          <span class="cmt-avatar">${escapeHtml(comment.author.charAt(0))}</span>
          <span class="cmt-author">${adminBadge}${escapeHtml(comment.author)}</span>
          <span class="cmt-time">${timeAgo(comment.created_at)}</span>
        </div>
        <div class="cmt-body">${escapeHtml(comment.content)}</div>
        <button class="cmt-reply-btn" data-id="${comment.id}" data-author="${escapeHtml(comment.author)}">回复</button>
        ${comment.replies && comment.replies.length
          ? '<div class="cmt-replies">' + comment.replies.map((r) => renderComment(r, true)).join('') + '</div>'
          : ''}
      </div>
    `;
  }

  function render() {
    const tree = buildCommentTree(comments);
    list.innerHTML =
      tree.length === 0
        ? '<p class="cmt-empty">还没有留言，来做第一个吧！</p>'
        : tree.map((c) => renderComment(c)).join('');
  }

  // --- API calls ---

  async function loadComments() {
    try {
      const res = await fetch(api + '?page=' + encodeURIComponent(page));
      if (!res.ok) throw new Error('Failed to load');
      comments = await res.json();
      render();
    } catch (e) {
      list.innerHTML = '<p class="cmt-error">加载留言失败，请刷新重试</p>';
    }
  }

  async function postComment(data) {
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || '提交失败');
      }
      return await res.json();
    } catch (e) {
      throw e;
    }
  }

  // --- Form handling ---

  function showForm() {
    form.style.display = 'block';
    toggleBtn.style.display = 'none';
  }

  function hideForm() {
    form.style.display = 'none';
    toggleBtn.style.display = 'block';
    replyTo = null;
    formNote.textContent = '';
    contentEl.value = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const author = authorEl.value.trim();
    const content = contentEl.value.trim();
    const email = emailEl.value.trim();

    if (!author || !content) return;

    submitBtn.disabled = true;
    submitBtn.textContent = '提交中…';

    postComment({
      author,
      content,
      email: email || undefined,
      parentId: replyTo ? replyTo.id : undefined,
    })
      .then(() => {
        localStorage.setItem('comment_author', author);
        hideForm();
        loadComments();
      })
      .catch((err) => {
        submitMsg.textContent = err.message;
        submitMsg.style.display = 'block';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = replyTo ? '提交回复' : '发布留言';
      });
  }

  // --- Event delegation ---

  function handleListClick(e) {
    const replyBtn = e.target.closest('.cmt-reply-btn');
    if (!replyBtn) return;

    const id = replyBtn.dataset.id;
    const author = replyBtn.dataset.author;
    replyTo = { id, author };
    formNote.textContent = '回复 @' + author;
    showForm();
    contentEl.focus();
  }

  function handleCancelReply() {
    replyTo = null;
    formNote.textContent = '';
    contentEl.value = '';
  }

  // --- DOM ---

  container.innerHTML = `
    <div class="cmt-section">
      <h3 class="cmt-title"><span class="cmt-title-icon">💬</span> 留言</h3>
      <div class="cmt-list" id="cmtList"></div>
      <div class="cmt-form-wrap" id="cmtForm" style="display:none">
        <div class="cmt-form-note" id="cmtFormNote"></div>
        <form id="cmtFormEl" class="cmt-form">
          <div class="cmt-form-row">
            <input type="text" id="cmtAuthor" placeholder="你的昵称" value="${escapeHtml(savedAuthor)}" maxlength="30" required>
            <input type="email" id="cmtEmail" placeholder="邮箱（选填，仅用于回复通知）" maxlength="100">
          </div>
          <textarea id="cmtContent" placeholder="写下你的想法…" maxlength="2000" required></textarea>
          <div class="cmt-form-actions">
            <span class="cmt-cancel" id="cmtCancel">取消</span>
            <span class="cmt-char-count" id="cmtCharCount">0/2000</span>
            <button type="submit" class="btn btn-primary" id="cmtSubmit">发布留言</button>
          </div>
          <div class="cmt-submit-msg" id="cmtSubmitMsg"></div>
        </form>
      </div>
      <button class="btn btn-outline cmt-toggle-btn" id="cmtToggleBtn">写留言</button>
    </div>
  `;

  const list = document.getElementById('cmtList');
  const form = document.getElementById('cmtForm');
  const toggleBtn = document.getElementById('cmtToggleBtn');
  const formNote = document.getElementById('cmtFormNote');
  const formEl = document.getElementById('cmtFormEl');
  const authorEl = document.getElementById('cmtAuthor');
  const emailEl = document.getElementById('cmtEmail');
  const contentEl = document.getElementById('cmtContent');
  const submitBtn = document.getElementById('cmtSubmit');
  const submitMsg = document.getElementById('cmtSubmitMsg');
  const cancelBtn = document.getElementById('cmtCancel');
  const charCount = document.getElementById('cmtCharCount');

  // --- Character count ---
  contentEl.addEventListener('input', function () {
    charCount.textContent = this.value.length + '/2000';
  });

  // --- Events ---
  toggleBtn.addEventListener('click', showForm);
  cancelBtn.addEventListener('click', handleCancelReply);
  formEl.addEventListener('submit', handleSubmit);
  list.addEventListener('click', handleListClick);

  // Close form on outside click
  document.addEventListener('click', (e) => {
    if (
      form.style.display === 'block' &&
      !form.contains(e.target) &&
      !toggleBtn.contains(e.target) &&
      !e.target.closest('.cmt-reply-btn')
    ) {
      hideForm();
    }
  });

  // --- Init ---
  loadComments();
})();
