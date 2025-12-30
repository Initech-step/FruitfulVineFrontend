// Product List Component
"use client";

import { useState } from "react";
import { Product } from "@/lib/types";

export default function ProductList({ products, onEdit, onDelete }: any) {
  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No products found. Create your first product!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product: Product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    <img src={product.image_url} alt={product.product_name} className="h-12 w-12 rounded object-cover" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.product_name}</div>
                    <div className="text-sm text-gray-500">{product.short_description.substring(0, 60)}...</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.category_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(product._id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

