
"use client";
import { useState } from "react";
import { API_BASE } from "@/lib/constants";


export default function CategoryForm({ editingItem, onSuccess, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: editingItem?.name || '',
    type: editingItem?.type || 'product',
    description: editingItem?.description || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/category/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">
        {editingItem ? 'Edit Category' : 'Create New Category'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
            Category Name
          </label>
          <input
            id="name"
            className="form-input w-full"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            className="form-select w-full"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="product">Product</option>
            <option value="blog">Blog</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="form-textarea w-full"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="btn flex-1 bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] disabled:opacity-50"
          >
            {submitting ? 'Saving...' : editingItem ? 'Update Category' : 'Create Category'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn flex-1 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

