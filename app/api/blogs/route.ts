import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET all blogs with search and tag filtering
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');

    let query: any = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create a new blog
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const blog = await Blog.create(body);

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 400 }
    );
  }
}
