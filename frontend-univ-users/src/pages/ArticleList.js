// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useArticles } from '../contexts/ArticleContext';
// import { PlusCircle, Search, Eye, Edit, Trash2, Calendar } from 'lucide-react';
// import Button from '../components/Button';
// import { format } from 'date-fns';

// const ArticleList = () => {
//   const { getUserArticles, deleteArticle, categories } = useArticles();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');

//   const articles = getUserArticles();

//   const filteredArticles = articles.filter(article => {
//     const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

//     const matchesCategory = !categoryFilter || article.category === categoryFilter;
//     const matchesStatus = !statusFilter || article.status === statusFilter;

//     return matchesSearch && matchesCategory && matchesStatus;
//   }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

//   const handleDelete = (id, title) => {
//     if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
//       deleteArticle(id);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
//           <p className="text-gray-600 mt-2">
//             Manage and organize your technical knowledge base
//           </p>
//         </div>
//         <Button onClick={() => navigate('/articles/new')}>
//           <PlusCircle className="h-5 w-5 mr-2" />
//           New Article
//         </Button>
//       </div>

//       <div className="bg-white rounded-lg shadow mb-6">
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search articles..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <select
//                 className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//               >
//                 <option value="">All Categories</option>
//                 {categories.map(category => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <select
//                 className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="">All Status</option>
//                 <option value="published">Published</option>
//                 <option value="draft">Draft</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         {filteredArticles.length === 0 ? (
//           <div className="text-center py-12">
//             <PlusCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {articles.length === 0 ? 'No articles yet' : 'No articles match your filters'}
//             </h3>
//             <p className="text-gray-600 mb-4">
//               {articles.length === 0 
//                 ? 'Start sharing your cloud expertise with the community'
//                 : 'Try adjusting your search terms or filters'
//               }
//             </p>
//             {articles.length === 0 && (
//               <Button onClick={() => navigate('/articles/new')}>
//                 <PlusCircle className="h-5 w-5 mr-2" />
//                 Write Your First Article
//               </Button>
//             )}
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-200">
//             {filteredArticles.map((article) => (
//               <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                       <Link 
//                         to={`/articles/view/${article.id}`}
//                         className="hover:text-blue-600 transition-colors"
//                       >
//                         {article.title}
//                       </Link>
//                     </h3>

//                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
//                       <span className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         Updated {format(new Date(article.updatedAt), 'MMM d, yyyy')}
//                       </span>
//                       <span className="flex items-center">
//                         <Eye className="h-4 w-4 mr-1" />
//                         {article.views} views
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         article.status === 'published' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {article.status}
//                       </span>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-2 mb-3">
//                       <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                         {article.category}
//                       </span>
//                       {article.tags.map((tag, index) => (
//                         <span 
//                           key={index}
//                           className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>

//                     <p className="text-gray-600 line-clamp-2">
//                       {article.content.substring(0, 200)}...
//                     </p>
//                   </div>

//                   <div className="flex space-x-2 ml-6">
//                     <Button 
//                       variant="outline" 
//                       size="sm" 
//                       onClick={() => navigate(`/articles/view/${article.id}`)}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => navigate(`/articles/edit/${article.id}`)}
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => handleDelete(article.id, article.title)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {filteredArticles.length > 0 && (
//         <div className="mt-4 text-center text-sm text-gray-500">
//           Showing {filteredArticles.length} of {articles.length} articles
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArticleList;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import { PlusCircle, Eye, Edit, Trash2, Calendar } from 'lucide-react';
import Button from '../components/Button';
import { format } from 'date-fns';

export default function ArticleList() {
  const navigate = useNavigate();
  const { articles, deleteArticle } = useArticles();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = articles
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
    .filter(a => !categoryFilter || a.category === categoryFilter)
    .filter(a => !statusFilter || a.status === statusFilter);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Articles</h1>
        <Button onClick={() => navigate('/articles/new')}>
          <PlusCircle className="h-5 w-5 mr-2" /> New Article
        </Button>
      </div>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 border rounded px-3 py-2"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {useArticles().categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(article => (
          <div key={article.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <Link to={`/articles/view/${article.id}`} className="text-xl font-semibold hover:text-blue-600">
                {article.title}
              </Link>
              <div className="text-sm text-gray-500 flex gap-4 mt-1">
                <Calendar className="h-4 w-4"/> {format(new Date(article.updatedAt || article.createdAt), 'MMM d, yyyy')}
                <Eye className="h-4 w-4"/> {article.views || 0} views
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/articles/view/${article.id}`)}>
                <Eye className="h-4 w-4"/>
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate(`/articles/edit/${article.id}`)}>
                <Edit className="h-4 w-4"/>
              </Button>
              <Button variant="outline" size="sm" className="text-red-600" onClick={() => deleteArticle(article.id)}>
                <Trash2 className="h-4 w-4"/>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
);
}
