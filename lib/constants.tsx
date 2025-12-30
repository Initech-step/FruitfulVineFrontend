// lib/constants.ts
// Shared constants for the application

// API Configuration
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORY: '/category/',
  PRODUCTS: '/products/',
  BLOG: '/blog/',
} as const;

// UI Constants
export const MESSAGES = {
  DELETE_CONFIRM: 'Are you sure you want to delete this item?',
  LOADING: 'Loading...',
  NO_CATEGORIES: 'No categories found. Create your first category!',
  NO_PRODUCTS: 'No products found. Create your first product!',
  NO_BLOGS: 'No blog posts found. Create your first post!',
} as const;

// Form States
export const FORM_STATES = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;