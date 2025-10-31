# Blog Platform - University Project

A full-featured blogging platform built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

## Features

- **User Authentication** - Secure login and registration system with NextAuth.js
- **User Sessions** - Persistent user sessions with JWT tokens
- **Create, Read, Update, Delete (CRUD)** blog posts
- **Featured Images** - Add cover images to your blog posts via URL
- **Rich Text Content** - Write detailed blog posts with formatted content
- **Search functionality** - Search blogs by title, content, or tags
- **Tag filtering** - Filter blogs by tags with beautiful pill-style buttons
- **Comments system** - Interactive comment section with real-time updates
- **Responsive UI** - Fully responsive design that works on desktop, tablet, and mobile
- **Professional Design** - Modern gradient design with smooth animations and transitions
- **Beautiful Cards** - Eye-catching blog cards with hover effects
- **Sticky Navigation** - Header stays at top for easy navigation
- **User Profiles** - Display user information in the navigation bar

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose ODM
- **API**: Next.js API Routes

## Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local MongoDB installation - [Download here](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas (free cloud database) - [Sign up here](https://www.mongodb.com/cloud/atlas)

## Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB on your computer
2. Start MongoDB service:
   - Windows: MongoDB should start automatically, or run `mongod` in terminal
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string from the "Connect" button
4. Replace the connection string in `.env.local`

### Step 3: Environment Configuration

The `.env.local` file is already created with local MongoDB setup:

```env
MONGODB_URI=mongodb://localhost:27017/blog-platform
```

If using MongoDB Atlas, update it to:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/blog-platform
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   ├── blogs/          # Blog CRUD API routes
│   │   └── comments/       # Comments API routes
│   ├── blogs/
│   │   ├── [id]/           # Individual blog view
│   │   │   ├── edit/       # Edit blog page
│   │   │   └── page.tsx    # Blog detail page
│   │   └── new/            # Create new blog page
│   ├── components/
│   │   ├── BlogCard.tsx    # Blog card component
│   │   ├── BlogForm.tsx    # Blog create/edit form
│   │   └── CommentSection.tsx  # Comments component
│   ├── globals.css         # Global styles
│   └── page.tsx            # Home page with blog listing
├── lib/
│   └── mongodb.ts          # MongoDB connection
├── models/
│   ├── Blog.ts             # Blog model
│   └── Comment.ts          # Comment model
└── README.md
```

## Usage Guide

### Creating a Blog Post

1. Click "Create New Blog" button on the home page
2. Fill in:
   - Title
   - Author name
   - Content
   - Tags (comma-separated)
3. Click "Create Blog"

### Searching Blogs

- Use the search bar on the home page
- Search works on title, content, and tags
- Real-time filtering as you type

### Filtering by Tags

- Click on any tag to filter blogs
- Click "All" to show all blogs

### Adding Comments

1. Open any blog post
2. Scroll to the comments section
3. Enter your name and comment
4. Click "Post Comment"

### Editing/Deleting Blogs

1. Open the blog post
2. Click "Edit" to modify or "Delete" to remove

## Testing Checklist

### Usability Testing
- [ ] Can create a new blog post
- [ ] Can edit existing blog posts
- [ ] Can delete blog posts
- [ ] Can search for blogs
- [ ] Can filter by tags
- [ ] Can add comments
- [ ] Navigation is intuitive
- [ ] Forms are user-friendly

### Performance Testing
- [ ] Pages load quickly
- [ ] Search is responsive
- [ ] No lag when typing
- [ ] Images/content render smoothly

### Security Testing
- [ ] Input validation works
- [ ] No XSS vulnerabilities
- [ ] Database queries are safe
- [ ] Error messages don't expose sensitive info

### Responsive Design Testing
- [ ] Works on mobile devices
- [ ] Works on tablets
- [ ] Works on desktop
- [ ] Layout adjusts properly

## Database Schema

### Blog Collection
```typescript
{
  title: String (required, max 200 chars)
  content: String (required)
  author: String (required)
  tags: Array of Strings
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Comment Collection
```typescript
{
  blogId: String (required)
  author: String (required)
  content: String (required, max 500 chars)
  createdAt: Date (auto)
}
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `.env.local`
- Verify network access if using MongoDB Atlas

### Port Already in Use
```bash
# Change the port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs (with optional search and tag filters)
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/[id]` - Get a specific blog
- `PUT /api/blogs/[id]` - Update a blog
- `DELETE /api/blogs/[id]` - Delete a blog

### Comments
- `GET /api/comments?blogId=[id]` - Get comments for a blog
- `POST /api/comments` - Create a new comment

## Features for Demo/Presentation

1. **Home Page**: Show blog listing with search and tag filters
2. **Create Blog**: Demonstrate creating a new blog post
3. **View Blog**: Show individual blog page with comments
4. **Search**: Demonstrate search functionality
5. **Tags**: Show tag filtering
6. **Comments**: Add and display comments
7. **Edit/Delete**: Demonstrate CRUD operations
8. **Responsive**: Show mobile/tablet view

## License

This is a university project for educational purposes.

## Support

For issues or questions, please refer to the Next.js and MongoDB documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
