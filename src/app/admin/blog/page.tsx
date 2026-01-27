'use client';

/**
 * Admin Blog Page
 * 
 * Frontend-only blog management page with editor UI placeholder.
 * No API calls, authentication, or backend dependencies.
 * Uses static mock data from /data/admin/blog.ts
 * Editor is UI-only with no submission logic.
 */

import { adminBlogPosts } from '@/data/admin/blog';
import { useState } from 'react';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function AdminBlog() {
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);

  const handleAddPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (slug: string) => {
    setEditingPost(slug);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const currentPost = editingPost
    ? adminBlogPosts.find((p) => p.slug === editingPost)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage blog posts and content
          </p>
        </div>
        <button
          onClick={handleAddPost}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Post
        </button>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {adminBlogPosts.map((post) => (
            <div
              key={post.slug}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {post.slug}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleEditPost(post.slug)}
                    className="text-blue-600 hover:text-blue-900 transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {adminBlogPosts.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new blog post.
          </p>
        </div>
      )}

      {/* Editor Modal/Overlay */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Editor Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPost ? 'Edit Post' : 'New Post'}
              </h2>
              <button
                onClick={handleCloseEditor}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="editor-title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editor-title"
                  defaultValue={currentPost?.title || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter blog post title..."
                />
              </div>

              {/* Slug Field */}
              <div>
                <label
                  htmlFor="editor-slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editor-slug"
                  defaultValue={currentPost?.slug || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="url-friendly-slug"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Used in the URL (e.g., /blog/url-friendly-slug)
                </p>
              </div>

              {/* Excerpt Field */}
              <div>
                <label
                  htmlFor="editor-excerpt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="editor-excerpt"
                  rows={3}
                  defaultValue={currentPost?.excerpt || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="A brief summary of the blog post..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Short description shown in blog listings
                </p>
              </div>

              {/* Content Editor Placeholder */}
              <div>
                <label
                  htmlFor="editor-content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Content <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Toolbar Placeholder */}
                  <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      title="Bold"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a1 1 0 011-1h4a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4zM13 4a1 1 0 011-1h1a3 3 0 010 6h-1v2a1 1 0 01-1 1h-1a1 1 0 01-1-1V4z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      title="Italic"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8zM5 4h10a1 1 0 011 1v1a1 1 0 01-1 1h-3l-2 8h3a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1a1 1 0 011-1h3l2-8H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
                      </svg>
                    </button>
                    <div className="w-px h-4 bg-gray-300" />
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      title="Heading"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2h-5v11a1 1 0 11-2 0V5H4a1 1 0 01-1-1z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      title="List"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                      </svg>
                    </button>
                  </div>
                  {/* Content Area */}
                  <textarea
                    id="editor-content"
                    rows={15}
                    defaultValue={currentPost?.content || ''}
                    className="w-full px-4 py-3 border-0 focus:ring-0 focus:outline-none resize-none"
                    placeholder="Start writing your blog post content here..."
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Editor UI placeholder - CMS integration coming soon
                </p>
              </div>

              {/* Published Date */}
              <div>
                <label
                  htmlFor="editor-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Published Date
                </label>
                <input
                  type="date"
                  id="editor-date"
                  defaultValue={currentPost?.publishedAt || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Editor Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={handleCloseEditor}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingPost ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
