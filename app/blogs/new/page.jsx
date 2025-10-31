import BlogForm from '@/app/components/BlogForm';
import Link from 'next/link';

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Blog Post</h1>
              <p className="text-indigo-100 mt-1">Share your story with the world</p>
            </div>
            <Link href="/" className="text-white hover:text-indigo-100 transition-colors flex items-center gap-2 font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12">
        <BlogForm />
      </main>
    </div>
  );
}
