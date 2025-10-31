import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/Comment';

// GET comments for a specific blog
export async function GET(request) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST create a new comment
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const comment = await Comment.create(body);

    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create comment' },
      { status: 400 }
    );
  }
}
