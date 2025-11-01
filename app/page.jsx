'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import BlogCard from './components/BlogCard';


export default function Home() {
  const { data: session, status } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, selectedTag]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let url = '/api/blogs';
      const params = new URLSearchParams();

      if (searchTerm) params.append('search', searchTerm);
      if (selectedTag) params.append('tag', selectedTag);

      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);

        // Extract unique tags
        const tags = new Set();
        data.data.forEach((blog) => {
          blog.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Header with Gradient */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">BlogVerse</h1>
                <p className="text-sm text-indigo-100">Share Your Stories</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {status === 'authenticated' && session?.user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-indigo-100 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    href="/blogs/new"
                    className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Blog
                  </Link>

                  <div className="flex items-center gap-3">
                    <div className="text-white text-right">
                      <p className="font-semibold">{session.user.name}</p>
                      <p className="text-xs text-indigo-100">{session.user.email}</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold shadow-lg">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-white hover:text-indigo-100 px-4 py-2 rounded-lg font-semibold transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Discover Amazing Blogs</h2>
            <p className="text-gray-600 text-lg">Explore stories, thinking, and expertise from writers on any topic</p>
          </div>

          <form onSubmit={handleSearch} className="mb-6 max-w-3xl mx-auto">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for blogs, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 shadow-sm text-lg transition-all"
              />
            </div>
          </form>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedTag === ''
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 shadow-sm'
                }`}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 shadow-sm'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading amazing content...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg max-w-2xl mx-auto p-12">
            <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Blogs Found</h3>
            <p className="text-gray-600 mb-6">Be the first to share your story with the world!</p>
            <Link href="/blogs/new" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
              Create First Blog Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>

      {/* Professional Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">BlogVerse</h3>
              <p className="text-gray-400">Empowering writers and readers to share and discover amazing content.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                <li><Link href="/blogs/new" className="hover:text-indigo-400 transition-colors">Create Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-lg">About</h4>
              <p className="text-gray-400">A modern blogging platform for sharing ideas, stories, and knowledge with the world.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BlogVerse. University Project - Built with Next.js & MongoDB</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
