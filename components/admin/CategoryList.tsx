"use client";
import { Category } from "@/lib/types";

export default function CategoryList({ categories, onEdit, onDelete }: any) {
  return (
    <div className="space-y-4">
      {categories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No categories found. Create your first category!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: Category) => (
            <div
              key={category._id}
              className="rounded-lg bg-white/70 p-6 shadow-sm shadow-black/[0.03] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  category.type === 'product' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {category.type}
                </span>
              </div>
              <p className="mb-4 text-sm text-gray-600">{category.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(category)}
                  className="btn-sm flex-1 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(category._id)}
                  className="btn-sm flex-1 bg-red-50 text-red-600 shadow-sm hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

