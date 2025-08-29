// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useArticles } from '../contexts/ArticleContext';
// import { Save, ArrowLeft } from 'lucide-react';
// import Button from '../components/Button';

// const ArticleEditor = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { createArticle, updateArticle, getArticleById, categories } = useArticles();

//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     tags: '',
//     status: 'draft'
//   });
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (id) {
//       const article = getArticleById(id);
//       if (article) {
//         setFormData({
//           title: article.title,
//           content: article.content,
//           category: article.category,
//           tags: article.tags.join(', '),
//           status: article.status
//         });
//         setIsEditing(true);
//       }
//     }
//   }, [id, getArticleById]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSave = async (status) => {
//     if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const articleData = {
//         ...formData,
//         tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//         status: status
//       };

//       if (isEditing) {
//         updateArticle(parseInt(id), articleData);
//       } else {
//         createArticle(articleData);
//       }

//       navigate('/articles');
//     } catch (error) {
//       alert('Failed to save article');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" onClick={() => navigate('/articles')}>
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Articles
//             </Button>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {isEditing ? 'Edit Article' : 'Write New Article'}
//             </h1>
//           </div>
//           <div className="flex space-x-3">
//             <Button 
//               variant="outline" 
//               onClick={() => handleSave('draft')}
//               loading={loading}
//             >
//               <Save className="h-4 w-4 mr-2" />
//               Save Draft
//             </Button>
//             <Button 
//               onClick={() => handleSave('published')}
//               loading={loading}
//             >
//               Publish
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                 Article Title *
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your article title"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                   Category *
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   value={formData.category}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map(category => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
//                   Tags (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   id="tags"
//                   name="tags"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="AWS, Kubernetes, DevOps"
//                   value={formData.tags}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="content" className="block text-sm font-medium text-gray-700">
//                 Content *
//               </label>
//               <textarea
//                 id="content"
//                 name="content"
//                 rows={20}
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
//                 placeholder="Write your article content here using Markdown..."
//                 value={formData.content}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticleEditor;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import { Save, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    categories,
    createArticle,
    updateArticle,
    getArticleById
  } = useArticles();

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);

  // Load existing article into form when editing
  useEffect(() => {
    if (id) {
      const art = getArticleById(parseInt(id, 10));
      if (art) {
        setForm({
          title: art.title,
          content: art.content,
          category: art.category,
          tags: (art.tags || []).join(', '),
          status: art.status
        });
      }
    }
  }, [id, getArticleById]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async status => {
    if (!form.title || !form.content || !form.category) {
      alert('Title, content, and category are required.');
      return;
    }
    setLoading(true);
    const payload = {
      title: form.title,
      content: form.content,
      category: form.category,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      status
    };

    if (id) {
      await updateArticle(parseInt(id, 10), payload);
    } else {
      await createArticle(payload);
    }
    setLoading(false);
    navigate('/articles');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => navigate('/articles')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave('draft')}
            loading={loading}
          >
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={() => handleSave('published')} loading={loading}>
            Publish
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content *
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={12}
            className="w-full border p-2 rounded font-mono"
          />
        </div>
      </div>
    </div>
  );
}
