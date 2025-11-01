'use client';

import { useState, useEffect } from 'react';

function Comment({ comment, blogId, onReplyAdded, level = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyData, setReplyData] = useState({ author: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (comment.replies && comment.replies.length > 0) {
      setReplies(comment.replies);
    }
  }, [comment.replies]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...replyData,
          blogId,
          parentId: comment._id,
        }),
      });

      if (response.ok) {
        setReplyData({ author: '', content: '' });
        setShowReplyForm(false);
        onReplyAdded();
      }
    } catch (error) {
      console.error('Failed to post reply:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const marginLeft = level > 0 ? 'ml-12' : '';

  return (
    <div className={`${marginLeft}`}>
      <div className={`bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md border ${level > 0 ? 'border-indigo-200' : 'border-gray-100'} hover:shadow-lg transition-shadow mb-4`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${level > 0 ? 'from-purple-500 to-pink-500' : 'from-indigo-500 to-purple-500'} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-gray-800 text-lg">{comment.author}</span>
              <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>

            {/* Reply Button */}
            {level < 3 && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Reply
              </button>
            )}

            {/* Reply Form */}
            {showReplyForm && (
              <form onSubmit={handleReplySubmit} className="mt-4 bg-indigo-50 p-4 rounded-xl border-2 border-indigo-100">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={replyData.author}
                    onChange={(e) => setReplyData({ ...replyData, author: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    placeholder="Write your reply..."
                    value={replyData.content}
                    onChange={(e) => setReplyData({ ...replyData, content: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? 'Posting...' : 'Post Reply'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReplyForm(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {replies.length > 0 && (
        <div className="space-y-3">
          {replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              blogId={blogId}
              onReplyAdded={onReplyAdded}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?blogId=${blogId}`);
      const data = await response.json();
      if (data.success) {
        // Organize comments into tree structure
        const commentMap = {};
        const rootComments = [];

        // First pass: create map of all comments
        data.data.forEach(comment => {
          commentMap[comment._id] = { ...comment, replies: [] };
        });

        // Second pass: organize into tree
        data.data.forEach(comment => {
          if (comment.parentId) {
            // This is a reply
            if (commentMap[comment.parentId]) {
              commentMap[comment.parentId].replies.push(commentMap[comment._id]);
            }
          } else {
            // This is a root comment
            rootComments.push(commentMap[comment._id]);
          }
        });

        setComments(rootComments);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newComment, blogId }),
      });

      if (response.ok) {
        setNewComment({ author: '', content: '' });
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalCommentCount = (comments) => {
    let count = comments.length;
    comments.forEach(comment => {
      if (comment.replies && comment.replies.length > 0) {
        count += getTotalCommentCount(comment.replies);
      }
    });
    return count;
  };

  const totalComments = getTotalCommentCount(comments);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h3 className="text-3xl font-bold text-gray-800">Comments ({totalComments})</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-10 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Leave a Comment</h4>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Share your thoughts..."
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              Posting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Post Comment
            </>
          )}
        </button>
      </form>

      <div className="space-y-5">
        {comments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              blogId={blogId}
              onReplyAdded={fetchComments}
              level={0}
            />
          ))
        )}
      </div>
    </div>
  );
}
