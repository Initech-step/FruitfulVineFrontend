"use client";
import { useState } from "react";

// Product Form Component
function ProductForm({ editingItem, categories, onSuccess, onCancel }: any) {
  const [formData, setFormData] = useState({
    image_url: editingItem?.image_url || '',
    category_id: editingItem?.category_id || '',
    category_name: editingItem?.category_name || '',
    product_name: editingItem?.product_name || '',
    short_description: editingItem?.short_description || '',
    body: editingItem?.body || '',
    iframe: editingItem?.iframe || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const productCategories = categories.filter((c: Category) => c.type === 'product');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = productCategories.find((c: Category) => c._id === e.target.value);
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
      const response = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-gray-900">
        {editingItem ? 'Edit Product' : 'Create New Product'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="product_name">
              Product Name
            </label>
            <input
              id="product_name"
              className="form-input w-full"
              type="text"
              value={formData.product_name}
              onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
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
              {productCategories.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="image_url">
            Image URL
          </label>
          <input
            id="image_url"
            className="form-input w-full"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="short_description">
            Short Description
          </label>
          <input
            id="short_description"
            className="form-input w-full"
            type="text"
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="body">
            Full Description
          </label>
          <textarea
            id="body"
            className="form-textarea w-full"
            rows={6}
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="iframe">
            Embed Code (Optional)
          </label>
          <textarea
            id="iframe"
            className="form-textarea w-full"
            rows={3}
            value={formData.iframe}
            onChange={(e) => setFormData({ ...formData, iframe: e.target.value })}
            placeholder="Paste iframe or embed code here"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="btn flex-1 bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] disabled:opacity-50"
          >
            {submitting ? 'Saving...' : editingItem ? 'Update Product' : 'Create Product'}
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
