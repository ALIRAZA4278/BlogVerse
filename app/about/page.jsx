import Link from 'next/link';

export default function AboutPage() {
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
            <h1 className="text-3xl font-bold text-white">About Us</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to BlogVerse</h2>
            <p className="text-xl text-gray-600">A Modern Blogging Platform for Everyone</p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                BlogVerse is dedicated to empowering writers and readers to share and discover amazing content.
                We believe everyone has a story to tell, and our platform makes it easy to share your voice with the world.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Easy Publishing</h4>
                  <p className="text-gray-600">Create and publish beautiful blog posts with our intuitive editor.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Powerful Search</h4>
                  <p className="text-gray-600">Find content easily with our advanced search and tag filtering.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Engage with Readers</h4>
                  <p className="text-gray-600">Build community through comments and interactions.</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Secure Platform</h4>
                  <p className="text-gray-600">Your data is safe with our secure authentication system.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Technology</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Built with modern technologies for the best user experience:
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold">Next.js 16</span>
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-semibold">React 19</span>
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold">MongoDB</span>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold">NextAuth.js</span>
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold">Tailwind CSS</span>
              </div>
            </section>

            <section className="text-center pt-8 border-t-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Community</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Start sharing your stories today and connect with readers around the world.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/auth/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
                  Get Started
                </Link>
                <Link href="/contact" className="bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transform hover:scale-105 transition-all">
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
