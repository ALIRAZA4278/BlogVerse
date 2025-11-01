import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Like from '@/models/Like';
import Blog from '@/models/Blog';

// Toggle like on a blog post
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

    // Check if already liked
    const existingLike = await Like.findOne({ blogId, userId });

    if (existingLike) {
      // Unlike - remove the like
      await Like.deleteOne({ _id: existingLike._id });
      await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: -1 } });

      return NextResponse.json({
        success: true,
        message: 'Blog unliked',
        liked: false,
      });
    } else {
      // Like - add new like
      await Like.create({ blogId, userId });
      await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } });

      return NextResponse.json({
        success: true,
        message: 'Blog liked',
        liked: true,
      });
    }
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process like' },
      { status: 500 }
    );
  }
}

// Get like status for a blog
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: true, liked: false });
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
    const like = await Like.findOne({ blogId, userId });

    return NextResponse.json({
      success: true,
      liked: !!like,
    });
  } catch (error) {
    console.error('Get like status error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
