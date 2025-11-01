'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';

export default function BlogForm({ initialData, blogId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    author: initialData?.author || '',
    tags: initialData?.tags?.join(', ') || '',
    imageUrl: initialData?.imageUrl || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      const body = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        tags: tagsArray,
        imageUrl: formData.imageUrl,
      };

      const url = blogId ? `/api/blogs/${blogId}` : '/api/blogs';
      const method = blogId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog');
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-800 font-bold mb-2 text-lg">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter an engaging title for your blog..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 text-lg transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-800 font-bold mb-2 text-lg">
            Author Name
          </label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Your name..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-gray-800 font-bold mb-2 text-lg">
            Featured Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">Add a cover image URL for your blog post</p>
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-800 font-bold mb-2 text-lg">
            Content
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(html) => setFormData({ ...formData, content: html })}
            placeholder="Write your blog content here... Use the toolbar to format your text!"
          />
          <p className="text-sm text-gray-500 mt-2">Write your full blog post content with rich formatting</p>
        </div>

        <div>
          <label htmlFor="tags" className="block text-gray-800 font-bold mb-2 text-lg">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="technology, programming, tutorial"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">Separate tags with commas to help readers discover your content</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {blogId ? 'Update Blog Post' : 'Publish Blog Post'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
