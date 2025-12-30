"use client";
import { useState } from 'react';

// Types based on your Pydantic models
interface Category {
  _id: string;
  name: string;
  type: 'product' | 'blog';
  description: string;
}

interface BlogPost {
  _id: string;
  image_url: string;
  category_id: string;
  category_name: string;
  post_title: string;
  short_title: string;
  body: string;
  date: string;
  iframe: string;
}

interface Product {
  _id: string;
  image_url: string;
  category_id: string;
  category_name: string;
  product_name: string;
  short_description: string;
  body: string;
  date: string;
  iframe: string;
}

// API Base URL
const API_BASE = 'http://127.0.0.1:8000/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'categories' | 'products' | 'blogs'>('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch data
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/category/`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/products/`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/blog/`);
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete handlers
  const handleDelete = async (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = type === 'category' ? 'category' : type === 'product' ? 'products' : 'blog';
      const response = await fetch(`${API_BASE}/${endpoint}/?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (type === 'category') fetchCategories();
        else if (type === 'product') fetchProducts();
        else fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Load data on tab change
  const handleTabChange = (tab: 'categories' | 'products' | 'blogs') => {
    setActiveTab(tab);
    setShowForm(false);
    setEditingItem(null);
    
    if (tab === 'categories') fetchCategories();
    else if (tab === 'products') fetchProducts();
    else fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-sm bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900"
            >
              Exit Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => handleTabChange('categories')}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => handleTabChange('products')}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => handleTabChange('blogs')}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'blogs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Blog Posts
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Action Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeTab === 'categories' && 'Manage Categories'}
            {activeTab === 'products' && 'Manage Products'}
            {activeTab === 'blogs' && 'Manage Blog Posts'}
          </h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
            }}
            className="btn bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]"
          >
            + Add New {activeTab === 'categories' ? 'Category' : activeTab === 'products' ? 'Product' : 'Blog Post'}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Content based on active tab */}
        {!loading && !showForm && (
          <>
            {activeTab === 'categories' && (
              <CategoryList
                categories={categories}
                onEdit={(item) => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete(id, 'category')}
              />
            )}
            {activeTab === 'products' && (
              <ProductList
                products={products}
                onEdit={(item) => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete(id, 'product')}
              />
            )}
            {activeTab === 'blogs' && (
              <BlogList
                blogs={blogs}
                onEdit={(item) => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
                onDelete={(id) => handleDelete(id, 'blog')}
              />
            )}
          </>
        )}

        {/* Forms */}
        {showForm && (
          <>
            {activeTab === 'categories' && (
              <CategoryForm
                editingItem={editingItem}
                onSuccess={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  fetchCategories();
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}
            {activeTab === 'products' && (
              <ProductForm
                editingItem={editingItem}
                categories={categories}
                onSuccess={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  fetchProducts();
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}
            {activeTab === 'blogs' && (
              <BlogForm
                editingItem={editingItem}
                categories={categories}
                onSuccess={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  fetchBlogs();
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

