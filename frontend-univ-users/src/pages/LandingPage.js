import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud, Edit, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Edit className="h-12 w-12 text-blue-600" />,
      title: "Rich Content Creation",
      description: "Write and publish technical articles with our advanced editor supporting markdown, code snippets, and rich formatting."
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Expert Community",
      description: "Connect with cloud professionals, DevOps engineers, and architects sharing real-world insights and best practices."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: "Track Your Impact",
      description: "Monitor article views, engagement metrics, and build your reputation as a thought leader in cloud technology."
    }
  ];

  const stats = [
    { number: "247", label: "Technical Articles" },
    { number: "156", label: "Active Contributors" },
    { number: "10", label: "Cloud Categories" },
    { number: "12.5K", label: "Monthly Readers" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Gateway to{' '}
                <span className="text-blue-600">Cloud Expertise</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn, Share, and Grow with the premier technical knowledge platform for cloud professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  className="justify-center"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="justify-center"
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Cloud className="h-64 w-64 text-blue-600 opacity-80 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ecloudWorx University?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a community of cloud experts and elevate your technical knowledge
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Share Your Expertise?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of cloud professionals sharing knowledge and building their reputation
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            className="justify-center"
          >
            <span>Start Writing Today</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;