'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';

export default function BlogForm({ initialData, blogId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    author: initialData?.author || '',
    tags: initialData?.tags?.join(', ') || '',
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || 'Other',
    metaDescription: initialData?.metaDescription || '',
    status: initialData?.status || 'published',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dummyBlogData = {
    title: 'The Future of Artificial Intelligence in 2025',
    author: 'Ali Raza',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category: 'Technology',
    tags: 'AI, Machine Learning, Technology, Future, Innovation',
    metaDescription: 'Explore how artificial intelligence is transforming our world in 2025 with groundbreaking innovations in healthcare, education, and daily life.',
    content: `<h1>The Future of Artificial Intelligence in 2025</h1>

<p>Artificial Intelligence has become an integral part of our daily lives, revolutionizing industries and changing how we interact with technology. As we navigate through 2025, the impact of AI continues to grow exponentially.</p>

<h2>Key Developments in AI</h2>

<p>The landscape of artificial intelligence has evolved dramatically over the past few years. Here are some of the most significant developments:</p>

<ul>
<li><strong>Natural Language Processing</strong> - AI systems can now understand and generate human-like text with remarkable accuracy</li>
<li><strong>Computer Vision</strong> - Advanced image recognition is transforming healthcare diagnostics and autonomous vehicles</li>
<li><strong>Generative AI</strong> - Creative AI tools are helping artists, writers, and designers push boundaries</li>
<li><strong>Edge Computing</strong> - AI processing is moving closer to data sources for faster response times</li>
</ul>

<h2>Impact on Healthcare</h2>

<p>One of the most promising applications of AI is in the healthcare sector. AI-powered diagnostic tools can now detect diseases earlier and with greater accuracy than ever before. Machine learning algorithms analyze medical images, predict patient outcomes, and even assist in drug discovery.</p>

<blockquote>
"AI is not replacing doctors, but doctors who use AI will replace those who don't." - Dr. Eric Topol
</blockquote>

<h2>Education Revolution</h2>

<p>The education sector is experiencing a transformation through AI-powered personalized learning. Adaptive learning platforms analyze student performance in real-time and adjust content difficulty accordingly. This ensures that each student receives a customized learning experience tailored to their needs.</p>

<h3>Benefits of AI in Education:</h3>

<ol>
<li>Personalized learning paths for every student</li>
<li>Instant feedback and assessment</li>
<li>24/7 availability of learning resources</li>
<li>Automated administrative tasks for teachers</li>
<li>Enhanced accessibility for students with disabilities</li>
</ol>

<h2>Ethical Considerations</h2>

<p>As AI becomes more powerful, it's crucial to address the ethical implications. Questions about privacy, bias, transparency, and accountability must be at the forefront of AI development. Organizations worldwide are working to establish guidelines and regulations to ensure responsible AI deployment.</p>

<h2>The Road Ahead</h2>

<p>Looking forward, the potential of AI seems limitless. From climate change solutions to space exploration, AI will play a pivotal role in addressing humanity's greatest challenges. However, success will depend on our ability to develop and deploy AI responsibly, ensuring it benefits all of humanity.</p>

<p>The future is not about AI replacing humans, but about humans and AI working together to create a better world. As we continue this journey, staying informed and engaged with AI developments will be essential for everyone.</p>

<hr>

<p><em>What are your thoughts on AI's impact on society? Share your perspectives in the comments below!</em></p>`,
    status: 'published',
  };

  const handleAutoFill = () => {
    setFormData(dummyBlogData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      // Calculate reading time (rough estimate: 200 words per minute)
      const wordCount = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);

      const body = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        tags: tagsArray,
        imageUrl: formData.imageUrl,
        category: formData.category,
        metaDescription: formData.metaDescription,
        status: formData.status,
        readingTime,
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
      {/* Auto Fill Button */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={handleAutoFill}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Auto Fill Demo Blog
        </button>
      </div>

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
          <ImageUpload
            currentImage={formData.imageUrl}
            onImageUploaded={(url) => setFormData({ ...formData, imageUrl: url })}
          />
          <p className="text-sm text-gray-500 mt-2">Upload a cover image for your blog post (max 5MB)</p>
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
          <label htmlFor="category" className="block text-gray-800 font-bold mb-2 text-lg">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          >
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
          <p className="text-sm text-gray-500 mt-2">Choose the most relevant category for your blog</p>
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

        <div>
          <label htmlFor="metaDescription" className="block text-gray-800 font-bold mb-2 text-lg">
            Meta Description (SEO)
          </label>
          <textarea
            id="metaDescription"
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            rows={3}
            maxLength={160}
            placeholder="A brief description of your blog post for search engines (max 160 characters)"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">{formData.metaDescription.length}/160 characters</p>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
          <div>
            <label className="text-gray-800 font-bold text-lg">Publish Status</label>
            <p className="text-sm text-gray-500 mt-1">
              {formData.status === 'published' ? 'Your blog will be visible to everyone' : 'Save as draft to continue editing later'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, status: 'draft' })}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                formData.status === 'draft'
                  ? 'bg-gray-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-300'
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, status: 'published' })}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                formData.status === 'published'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-green-600 border-2 border-green-300'
              }`}
            >
              Published
            </button>
          </div>
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
