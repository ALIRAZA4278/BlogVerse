import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');

    let filter = { status: 'published' };

    // Text search
    if (query) {
      filter.$text = { $search: query };
    }

    // Category filter
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Tag filter
    if (tag) {
      filter.tags = tag;
    }

    const blogs = await Blog.find(filter)
      .sort(query ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      data: blogs,
      count: blogs.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
