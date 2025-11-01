import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Bookmark from '@/models/Bookmark';

// Toggle bookmark on a blog post
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { blogId } = await request.json();

    if (!blogId) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({ blogId, userId });

    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.deleteOne({ _id: existingBookmark._id });

      return NextResponse.json({
        success: true,
        message: 'Bookmark removed',
        bookmarked: false,
      });
    } else {
      // Add bookmark
      await Bookmark.create({ blogId, userId });

      return NextResponse.json({
        success: true,
        message: 'Blog bookmarked',
        bookmarked: true,
      });
    }
  } catch (error) {
    console.error('Bookmark error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process bookmark' },
      { status: 500 }
    );
  }
}

// Get bookmark status for a blog
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: true, bookmarked: false });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const bookmark = await Bookmark.findOne({ blogId, userId });

    return NextResponse.json({
      success: true,
      bookmarked: !!bookmark,
    });
  } catch (error) {
    console.error('Get bookmark status error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
