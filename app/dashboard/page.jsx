'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchUserBlogs();
    }
  }, [status]);

  const fetchUserBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        // Filter blogs by current user's name
        const userBlogs = data.data.filter(blog => blog.author === session?.user?.name);
        setBlogs(userBlogs);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 text-white hover:text-indigo-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* User Info Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{session?.user?.name}</h2>
              <p className="text-gray-600">{session?.user?.email}</p>
              <div className="flex gap-4 mt-4">
                <div className="bg-indigo-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-indigo-600 font-semibold">Total Blogs</p>
                  <p className="text-2xl font-bold text-indigo-700">{blogs.length}</p>
                </div>
                <Link href="/blogs/new" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Blog
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs List */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Blog Posts</h3>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No blogs yet</h4>
              <p className="text-gray-500 mb-6">Start sharing your stories with the world!</p>
              <Link href="/blogs/new" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
                Create Your First Blog
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link href={`/blogs/${blog._id}`}>
                        <h4 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors mb-2">{blog.title}</h4>
                      </Link>
                      <p className="text-gray-600 line-clamp-2 mb-3">{blog.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link href={`/blogs/${blog._id}/edit`} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
