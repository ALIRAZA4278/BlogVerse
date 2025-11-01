'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CommentSection from '@/app/components/CommentSection';


export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Blog not found</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-white hover:text-indigo-100 transition-colors flex items-center gap-2 font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <div className="flex gap-3">
              <Link
                href={`/blogs/${params.id}/edit`}
                className="bg-white text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Featured Image */}
          {blog.imageUrl && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm px-4 py-2 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 pb-8 mb-8 border-b-2 border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{blog.author}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{formatDate(blog.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
                {blog.content}
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12">
          <CommentSection blogId={params.id} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025 BlogVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
