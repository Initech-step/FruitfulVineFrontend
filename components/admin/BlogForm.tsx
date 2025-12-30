"use client";

import { useState } from "react";
import { API_BASE } from "@/lib/constants";
import { Category } from "@/lib/types";

// Blog Form Component
export default function BlogForm({ editingItem, categories, onSuccess, onCancel }: any) {
  const [formData, setFormData] = useState({
    image_url: editingItem?.image_url || '',
    category_id: editingItem?.category_id || '',
    category_name: editingItem?.category_name || '',
    post_title: editingItem?.post_title || '',
    short_title: editingItem?.short_title || '',
    body: editingItem?.body || '',
    iframe: editingItem?.iframe || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const blogCategories = categories.filter((c: Category) => c.type === 'blog');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = blogCategories.find((c: Category) => c._id === e.target.value);
    setFormData({
      ...formData,
      category_id: e.target.value,
      category_name: selectedCategory?.name || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/blog/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-semibold text-gray-900">
            {editingItem ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="post_title">
                    Post Title
                    </label>
                    <input
                    id="post_title"
                    className="form-input w-full"
                    type="text"
                    value={formData.post_title}
                    onChange={(e) => setFormData({ ...formData, post_title: e.target.value })}
                    required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="category">
                    Category
                    </label>
                    <select
                    id="category"
                    className="form-select w-full"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                    required
                    >
                    <option value="">Select a category</option>
                    {blogCategories.map((category: Category) => (
                        <option key={category._id} value={category._id}>
                        {category.name}
                        </option>
                    ))}
                    </select>
                </div>
                
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="short_title">
                    Short Title
                    </label>
                    <input
                    id="short_title"
                    className="form-input w-full"
                    type="text"
                    value={formData.short_title}
                    onChange={(e) => setFormData({ ...formData, short_title: e.target.value })}
                    required
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="body">
                    Body
                    </label>
                    <input
                    id="body"
                    className="form-input w-full"
                    type="text"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    required
                    />
                </div>
                
            </div>
        </form>
    </div>

  )
}
        