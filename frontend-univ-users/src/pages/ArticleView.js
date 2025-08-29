// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useArticles } from '../contexts/ArticleContext';
// import { ArrowLeft, Edit, Calendar, Eye } from 'lucide-react';
// import Button from '../components/Button';
// import { format } from 'date-fns';

// const ArticleView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { getArticleById, incrementViews } = useArticles();

//   const article = getArticleById(parseInt(id));

//   useEffect(() => {
//     if (article) {
//       incrementViews(article.id);
//     }
//   }, [article, incrementViews]);

//   if (!article) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
//           <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
//           <Button onClick={() => navigate('/articles')}>Back to Articles</Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <Button variant="outline" onClick={() => navigate('/articles')}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Articles
//           </Button>
//           <Button onClick={() => navigate(`/articles/edit/${article.id}`)}>
//             <Edit className="h-4 w-4 mr-2" />
//             Edit
//           </Button>
//         </div>

//         <div className="border-b border-gray-200 pb-6">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
//             <span className="flex items-center">
//               <Calendar className="h-4 w-4 mr-1" />
//               {format(new Date(article.createdAt), 'MMMM d, yyyy')}
//             </span>
//             <span className="flex items-center">
//               <Eye className="h-4 w-4 mr-1" />
//               {article.views} views
//             </span>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//               article.status === 'published' 
//                 ? 'bg-green-100 text-green-800' 
//                 : 'bg-yellow-100 text-yellow-800'
//             }`}>
//               {article.status}
//             </span>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
//               {article.category}
//             </span>
//             {article.tags.map((tag, index) => (
//               <span 
//                 key={index}
//                 className="inline-block bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <article className="prose prose-lg max-w-none">
//         <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
//           {article.content}
//         </div>
//       </article>
//     </div>
//   );
// };

// export default ArticleView;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import { ArrowLeft, Edit, Calendar, Eye } from 'lucide-react';
import Button from '../components/Button';
import { format } from 'date-fns';

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArticleById, incrementViews } = useArticles();

  const article = getArticleById(parseInt(id));
  // useEffect(() => { if (article) incrementViews(article.id); }, [article]);
  useEffect(() => {   if (article) incrementViews(article.id); }, [article, incrementViews]);

  if (!article) {
    return <div className="p-4">Article not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => navigate('/articles')}>
          <ArrowLeft className="h-4 w-4 mr-2"/> Back
        </Button>
        <Button onClick={() => navigate(`/articles/edit/${article.id}`)}>
          <Edit className="h-4 w-4 mr-2"/> Edit
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <div className="text-sm text-gray-500 flex gap-4 mb-4">
        <Calendar className="h-4 w-4"/>{format(new Date(article.createdAt), 'MMM d, yyyy')}
        <Eye className="h-4 w-4"/>{article.views || 0} views
      </div>
      <div className="prose max-w-none whitespace-pre-wrap">
        {article.content}
      </div>
    </div>
  );
}
