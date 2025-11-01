'use client';

import Link from 'next/link';

export default function BlogCard({ blog }) {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

        {/* Category Badge */}
        {blog.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/95 backdrop-blur-sm text-indigo-700 px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg">
              {blog.category}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-white/90 backdrop-blur-sm text-indigo-700 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <Link href={`/blogs/${blog._id}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
            {blog.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {stripHtml(blog.content)}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          {blog.readingTime && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {blog.readingTime} min read
            </div>
          )}
          {blog.views !== undefined && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {blog.views} views
            </div>
          )}
          {blog.likesCount !== undefined && blog.likesCount > 0 && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-red-500 fill-current" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {blog.likesCount}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{blog.author}</p>
              <p className="text-xs text-gray-500">{formatDate(blog.createdAt)}</p>
            </div>
          </div>

          <Link href={`/blogs/${blog._id}`}>
            <svg className="w-6 h-6 text-indigo-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
