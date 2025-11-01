import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET a single blog by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT update a blog by ID
export async function PUT(
  request,
  { params }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const blog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 400 }
    );
  }
}

// DELETE a blog by ID
export async function DELETE(
  request,
  { params }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
