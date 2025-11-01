'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BlogCard from '../components/BlogCard';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('myBlogs');
  const [myBlogs, setMyBlogs] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, activeTab]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'myBlogs' || activeTab === 'drafts') {
        const response = await fetch('/api/blogs');
        const data = await response.json();

        if (data.success) {
          const userEmail = session.user.email;

          // Filter blogs by user
          const userBlogs = data.data.filter(blog =>
            blog.author === session.user.name || blog.userId === session.user.id
          );

          setMyBlogs(userBlogs.filter(blog => blog.status === 'published'));
          setDrafts(userBlogs.filter(blog => blog.status === 'draft'));
        }
      } else if (activeTab === 'bookmarks') {
        const response = await fetch('/api/user/bookmarks');
        const data = await response.json();

        if (data.success) {
          setBookmarks(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tabs = [
    { id: 'myBlogs', label: 'My Blogs', count: myBlogs.length },
    { id: 'drafts', label: 'Drafts', count: drafts.length },
    { id: 'bookmarks', label: 'Bookmarks', count: bookmarks.length },
  ];

  const currentData = activeTab === 'myBlogs' ? myBlogs : activeTab === 'drafts' ? drafts : bookmarks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 text-white hover:text-indigo-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{session.user.name}</h2>
              <p className="text-gray-600 text-lg">{session.user.email}</p>
              <div className="flex gap-4 mt-4">
                <div className="bg-indigo-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Published Blogs</p>
                  <p className="text-2xl font-bold text-indigo-600">{myBlogs.length}</p>
                </div>
                <div className="bg-purple-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-purple-600">{drafts.length}</p>
                </div>
                <div className="bg-pink-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Bookmarks</p>
                  <p className="text-2xl font-bold text-pink-600">{bookmarks.length}</p>
                </div>
              </div>
            </div>
            <Link
              href="/blogs/new"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Blog
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-4 border-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : currentData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No {activeTab === 'myBlogs' ? 'Blogs' : activeTab === 'drafts' ? 'Drafts' : 'Bookmarks'} Yet
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'myBlogs' && "Start writing your first blog post!"}
              {activeTab === 'drafts' && "You don't have any drafts saved."}
              {activeTab === 'bookmarks' && "Bookmark blogs you want to read later."}
            </p>
            {activeTab !== 'bookmarks' && (
              <Link
                href="/blogs/new"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Create New Blog
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentData.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
