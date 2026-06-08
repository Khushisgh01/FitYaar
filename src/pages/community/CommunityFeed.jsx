// src/pages/community/CommunityFeed.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

// ─── helpers ─────────────────────────────────────────────────────────────────
const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const TAGS = ['Anxiety', 'Depression', 'Mindfulness', 'Sleep', 'Motivation', 'Relationships', 'Grief', 'Self-care'];

// ─── PostCard ─────────────────────────────────────────────────────────────────
function PostCard({ post, onLike, onComment, currentUser, getAuthHeader }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText,  setCommentText]  = useState('');
  const [submitting,   setSubmitting]   = useState(false);
  const [likeAnim,     setLikeAnim]     = useState(false);
  const inputRef = useRef(null);

  const handleLike = async () => {
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 600);
    await onLike(post._id);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    await onComment(post._id, commentText.trim());
    setCommentText('');
    setSubmitting(false);
  };

  const toggleComments = () => {
    setShowComments(v => !v);
    if (!showComments) setTimeout(() => inputRef.current?.focus(), 150);
  };

  return (
    <div className="pc-card">
      {/* Header */}
      <div className="pc-header">
        <div className="pc-avatar">
          {(post.author?.[0] || 'A').toUpperCase()}
        </div>
        <div className="pc-meta">
          <span className="pc-author">{post.author || 'Anonymous'}</span>
          <span className="pc-time">{timeAgo(post.createdAt)}</span>
        </div>
      </div>

      {/* Body */}
      <p className="pc-text">{post.text}</p>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="pc-tags">
          {post.tags.map((t, i) => (
            <span key={i} className="pc-tag">#{t}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="pc-actions">
        <button
          className={`pc-btn pc-like ${likeAnim ? 'pop' : ''} ${post.likedByMe ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label="Like post"
        >
          <span className="pc-btn-icon">🤍</span>
          <span>{post.likes || 0}</span>
        </button>

        <button className="pc-btn pc-comment-btn" onClick={toggleComments} aria-label="Toggle comments">
          <span className="pc-btn-icon">💬</span>
          <span>{post.comments?.length || 0} {(post.comments?.length || 0) === 1 ? 'reply' : 'replies'}</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="pc-comments">
          {/* Existing comments */}
          {post.comments?.length > 0 ? (
            <div className="pc-comment-list">
              {post.comments.map((c) => (
                <div key={c._id} className="pc-comment">
                  <div className="pc-comment-avatar">
                    {(c.author?.[0] || 'A').toUpperCase()}
                  </div>
                  <div className="pc-comment-body">
                    <span className="pc-comment-author">{c.author || 'Anonymous'}</span>
                    <span className="pc-comment-time">{timeAgo(c.createdAt)}</span>
                    <p className="pc-comment-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="pc-no-comments">No replies yet. Be the first to respond 💛</p>
          )}

          {/* New comment input */}
          <form className="pc-comment-form" onSubmit={handleComment}>
            <div className="pc-comment-avatar small">
              {(currentUser?.name?.[0] || 'Y').toUpperCase()}
            </div>
            <input
              ref={inputRef}
              className="pc-comment-input"
              placeholder="Add a supportive reply…"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              disabled={submitting}
              maxLength={400}
            />
            <button
              type="submit"
              className="pc-comment-send"
              disabled={submitting || !commentText.trim()}
            >
              {submitting ? '…' : '➤'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// ─── Main Feed ────────────────────────────────────────────────────────────────
export default function CommunityFeed() {
  const { user, getAuthHeader } = useAuth();

  const [posts,       setPosts]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [postText,    setPostText]    = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitting,  setSubmitting]  = useState(false);
  const [charCount,   setCharCount]   = useState(0);

  const MAX_CHARS = 500;

  // ── Fetch posts ─────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/community', { headers: getAuthHeader() });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError('Could not load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Create post ─────────────────────────────────────────────────────────────
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/community/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({
          text: postText.trim(),
          tags: selectedTags,
          author: user?.name || 'Anonymous',
        }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      const newPost = await res.json();
      setPosts(prev => [newPost, ...prev]);
      setPostText('');
      setSelectedTags([]);
      setCharCount(0);
    } catch {
      alert('Could not create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Like ────────────────────────────────────────────────────────────────────
  const handleLike = async (postId) => {
    // Optimistic update
    setPosts(prev =>
      prev.map(p =>
        p._id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
    try {
      const res = await fetch(`/api/community/post/${postId}/like`, {
        method: 'POST',
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error();
      const { likes } = await res.json();
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes } : p));
    } catch {
      // Revert optimistic update on failure
      setPosts(prev =>
        prev.map(p =>
          p._id === postId ? { ...p, likes: Math.max(0, (p.likes || 1) - 1) } : p
        )
      );
    }
  };

  // ── Comment ─────────────────────────────────────────────────────────────────
  const handleComment = async (postId, text) => {
    try {
      const res = await fetch(`/api/community/post/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ text, author: user?.name || 'Anonymous' }),
      });
      if (!res.ok) throw new Error();
      const newComment = await res.json();
      setPosts(prev =>
        prev.map(p =>
          p._id === postId
            ? { ...p, comments: [...(p.comments || []), newComment] }
            : p
        )
      );
    } catch {
      alert('Could not post reply. Please try again.');
    }
  };

  // ── Tag toggle ───────────────────────────────────────────────────────────────
  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Lora:wght@600&display=swap');

        /* ── Composer ────────────────────────────────────────────── */
        .cf-composer {
          background: #fff;
          border: 1px solid rgba(120,53,15,0.12);
          border-radius: 20px;
          padding: 22px 24px;
          margin-bottom: 28px;
          box-shadow: 0 2px 16px rgba(120,53,15,0.05);
        }
        .cf-composer-label {
          font-family: 'Lora', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #78350f;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cf-textarea {
          width: 100%;
          min-height: 90px;
          border: 1.5px solid rgba(120,53,15,0.15);
          border-radius: 12px;
          padding: 14px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #3c3325;
          resize: vertical;
          outline: none;
          background: #fffbf5;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .cf-textarea:focus { border-color: #d97706; }
        .cf-textarea::placeholder { color: #a8967a; }

        .cf-char-count {
          text-align: right;
          font-size: 0.75rem;
          color: #a8967a;
          margin: 4px 2px 10px;
        }
        .cf-char-count.warn { color: #d97706; }
        .cf-char-count.over { color: #dc2626; }

        .cf-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }
        .cf-tag-chip {
          padding: 5px 13px;
          border-radius: 20px;
          border: 1.5px solid rgba(120,53,15,0.2);
          background: transparent;
          font-size: 0.78rem;
          font-weight: 600;
          color: #78350f;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s;
        }
        .cf-tag-chip:hover { background: rgba(217,119,6,0.08); }
        .cf-tag-chip.active {
          background: linear-gradient(135deg, #d97706, #b45309);
          color: white;
          border-color: transparent;
          box-shadow: 0 2px 8px rgba(217,119,6,0.3);
        }

        .cf-submit-row {
          display: flex;
          justify-content: flex-end;
        }
        .cf-submit-btn {
          padding: 10px 24px;
          background: linear-gradient(135deg, #d97706, #b45309);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 3px 12px rgba(217,119,6,0.3);
        }
        .cf-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }
        .cf-submit-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(217,119,6,0.4);
        }

        /* ── Loading / Error ─────────────────────────────────────── */
        .cf-state {
          text-align: center;
          padding: 60px 20px;
          color: #92400e;
          font-size: 0.95rem;
          opacity: 0.7;
        }

        /* ── Post Card ───────────────────────────────────────────── */
        .pc-card {
          background: #fff;
          border: 1px solid rgba(120,53,15,0.1);
          border-radius: 18px;
          padding: 20px 22px;
          margin-bottom: 16px;
          box-shadow: 0 2px 12px rgba(120,53,15,0.04);
          transition: box-shadow 0.2s;
          animation: fadeUp 0.35s ease both;
        }
        .pc-card:hover { box-shadow: 0 4px 20px rgba(120,53,15,0.08); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pc-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .pc-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d97706, #b45309);
          color: white;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .pc-meta { display: flex; flex-direction: column; }
        .pc-author { font-weight: 700; font-size: 0.875rem; color: #78350f; }
        .pc-time   { font-size: 0.75rem; color: #a8967a; }

        .pc-text {
          font-size: 0.92rem;
          color: #3c3325;
          line-height: 1.7;
          margin: 0 0 12px;
        }

        .pc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .pc-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #b45309;
          background: rgba(217,119,6,0.08);
          padding: 3px 10px;
          border-radius: 20px;
        }

        .pc-actions {
          display: flex;
          gap: 10px;
          border-top: 1px solid rgba(120,53,15,0.08);
          padding-top: 12px;
        }
        .pc-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1.5px solid rgba(120,53,15,0.15);
          background: transparent;
          font-size: 0.82rem;
          font-weight: 600;
          color: #78350f;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.18s;
        }
        .pc-btn:hover { background: rgba(217,119,6,0.07); }
        .pc-btn.liked { background: rgba(217,119,6,0.1); border-color: #d97706; color: #d97706; }

        @keyframes pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .pc-btn.pop .pc-btn-icon { display: inline-block; animation: pop 0.5s ease; }
        .pc-btn-icon { font-size: 1rem; line-height: 1; }

        /* ── Comments ────────────────────────────────────────────── */
        .pc-comments {
          margin-top: 14px;
          border-top: 1px solid rgba(120,53,15,0.08);
          padding-top: 14px;
        }
        .pc-comment-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
        .pc-comment {
          display: flex;
          gap: 9px;
          align-items: flex-start;
        }
        .pc-comment-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #d97706);
          color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .pc-comment-avatar.small {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #d97706, #b45309);
          font-size: 0.7rem;
        }
        .pc-comment-body { flex: 1; }
        .pc-comment-author { font-weight: 700; font-size: 0.78rem; color: #78350f; margin-right: 6px; }
        .pc-comment-time   { font-size: 0.7rem; color: #a8967a; }
        .pc-comment-text   { font-size: 0.83rem; color: #57534e; line-height: 1.6; margin: 3px 0 0; }

        .pc-no-comments {
          font-size: 0.83rem;
          color: #a8967a;
          text-align: center;
          margin: 0 0 12px;
          font-style: italic;
        }

        .pc-comment-form {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pc-comment-input {
          flex: 1;
          border: 1.5px solid rgba(120,53,15,0.15);
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 0.82rem;
          font-family: 'DM Sans', sans-serif;
          color: #3c3325;
          background: #fffbf5;
          outline: none;
          transition: border-color 0.2s;
        }
        .pc-comment-input:focus { border-color: #d97706; }
        .pc-comment-input::placeholder { color: #a8967a; }

        .pc-comment-send {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d97706, #b45309);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.18s;
          box-shadow: 0 2px 8px rgba(217,119,6,0.3);
        }
        .pc-comment-send:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
        .pc-comment-send:not(:disabled):hover { transform: scale(1.08); }

        /* ── Empty state ─────────────────────────────────────────── */
        .cf-empty {
          text-align: center;
          padding: 48px 20px;
          color: #92400e;
          opacity: 0.6;
        }
        .cf-empty-icon { font-size: 2.5rem; margin-bottom: 10px; }
        .cf-empty-msg  { font-size: 0.9rem; }
      `}</style>

      {/* ── Composer ─────────────────────────────────────────────────────────── */}
      <div className="cf-composer">
        <div className="cf-composer-label">✏️ Share something with the community</div>
        <textarea
          className="cf-textarea"
          placeholder="What's on your mind? This is a safe space…"
          value={postText}
          maxLength={MAX_CHARS}
          onChange={e => {
            setPostText(e.target.value);
            setCharCount(e.target.value.length);
          }}
        />
        <div className={`cf-char-count ${charCount > MAX_CHARS * 0.9 ? (charCount >= MAX_CHARS ? 'over' : 'warn') : ''}`}>
          {charCount}/{MAX_CHARS}
        </div>

        {/* Tag picker */}
        <div className="cf-tag-row">
          {TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              className={`cf-tag-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="cf-submit-row">
          <button
            className="cf-submit-btn"
            onClick={handleCreatePost}
            disabled={submitting || !postText.trim() || charCount > MAX_CHARS}
          >
            {submitting ? 'Posting…' : 'Share Post 🌱'}
          </button>
        </div>
      </div>

      {/* ── Feed ─────────────────────────────────────────────────────────────── */}
      {loading && <div className="cf-state">Loading posts…</div>}
      {error   && <div className="cf-state">⚠️ {error}</div>}

      {!loading && !error && posts.length === 0 && (
        <div className="cf-empty">
          <div className="cf-empty-icon">🌸</div>
          <div className="cf-empty-msg">No posts yet. Be the first to share!</div>
        </div>
      )}

      {!loading && !error && posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          currentUser={user}
          getAuthHeader={getAuthHeader}
        />
      ))}
    </>
  );
}