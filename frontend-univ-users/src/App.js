// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Import the context hooks and providers
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { ArticleProvider } from './contexts/ArticleContext';

// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';
// import ArticleList from './pages/ArticleList';
// import ArticleEditor from './pages/ArticleEditor';
// import ArticleView from './pages/ArticleView';
// import Profile from './pages/Profile';

// import './styles/globals.css';


// // Protected Route component
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// // Public Route component
// const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return !user ? children : <Navigate to="/dashboard" />;
// };

// function App() {
//   return (
//     // Wrap routing in both providers
//     <AuthProvider>
//       <ArticleProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50">
//             <Navbar />
//             <main className="pt-16">
//               <Routes>
//                 {/* Public */}
//                 <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
//                 <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
//                 <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

//                 {/* Protected */}
//                 <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//                 <Route path="/articles" element={<ProtectedRoute><ArticleList /></ProtectedRoute>} />
//                 <Route path="/articles/new" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
//                 <Route path="/articles/edit/:id" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
//                 <Route path="/articles/view/:id" element={<ProtectedRoute><ArticleView /></ProtectedRoute>} />
//                 <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

//                 {/* Catch all */}
//                 <Route path="*" element={<Navigate to="/" />} />
//               </Routes>
//             </main>
//           </div>
//         </Router>
//       </ArticleProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ArticleProvider } from './contexts/ArticleContext';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ArticleList from './pages/ArticleList';
import ArticleEditor from './pages/ArticleEditor';
import ArticleView from './pages/ArticleView';
import Profile from './pages/Profile';

import './styles/globals.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return !user ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <ArticleProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            {/* Make main grow to fill remaining space */}
            <main className="flex-grow pt-16 animate-fadeIn">
              <Routes>
                {/* Public */}
                <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                
                {/* Protected */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/articles" element={<ProtectedRoute><ArticleList /></ProtectedRoute>} />
                <Route path="/articles/new" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
                <Route path="/articles/edit/:id" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
                <Route path="/articles/view/:id" element={<ProtectedRoute><ArticleView /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                
                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ArticleProvider>
    </AuthProvider>
  );
}

export default App;
