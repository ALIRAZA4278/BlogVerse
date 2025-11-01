import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Bookmark from '@/models/Bookmark';
import Blog from '@/models/Blog';

// Get all bookmarked blogs for the current user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const userId = session.user.id;

    // Get all bookmarks for this user
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });

    // Get all blog IDs
    const blogIds = bookmarks.map((b) => b.blogId);

    // Fetch all bookmarked blogs
    const blogs = await Blog.find({ _id: { $in: blogIds }, status: 'published' });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
