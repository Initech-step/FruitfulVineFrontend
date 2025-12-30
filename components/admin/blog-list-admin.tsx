// Blog List Component
function BlogList({ blogs, onEdit, onDelete }: any) {
  return (
    <div className="space-y-4">
      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No blog posts found. Create your first post!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog: BlogPost) => (
                <tr key={blog._id}>
                  <td className="px-6 py-4">
                    <img src={blog.image_url} alt={blog.post_title} className="h-12 w-12 rounded object-cover" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{blog.post_title}</div>
                    <div className="text-sm text-gray-500">{blog.short_title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{blog.category_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{blog.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(blog)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(blog._id)}
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
