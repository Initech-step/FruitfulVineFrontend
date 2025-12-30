// lib/types.ts
// Shared TypeScript interfaces for the application

export interface Category {
  _id: string;
  name: string;
  type: 'product' | 'blog';
  description: string;
}

export interface BlogPost {
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

export interface Product {
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

// Form props interfaces
export interface CategoryFormProps {
  editingItem: Category | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface ProductFormProps {
  editingItem: Product | null;
  categories: Category[];
  onSuccess: () => void;
  onCancel: () => void;
}

export interface BlogFormProps {
  editingItem: BlogPost | null;
  categories: Category[];
  onSuccess: () => void;
  onCancel: () => void;
}

// List props interfaces
export interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export interface BlogListProps {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void;
}