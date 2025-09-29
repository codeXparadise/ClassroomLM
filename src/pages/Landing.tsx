import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, BarChart3, FileText, MessageCircle, Headphones, ArrowRight, CheckCircle, GraduationCap, UserCog, Sparkles, Brain, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Learning",
      description: "Advanced AI research tools with document analysis and intelligent insights."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Smart Classroom Management",
      description: "Comprehensive tools for managing students, tracking progress, and organizing classes."
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Assignment & Assessment",
      description: "Create, distribute, and grade assignments with intelligent analytics."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Advanced Analytics",
      description: "Real-time insights into student performance and learning patterns."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-indigo-600" />,
      title: "Collaborative Learning",
      description: "Interactive chat system for peer-to-peer learning and collaboration."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-pink-600" />,
      title: "Personalized Experience",
      description: "Adaptive learning paths and personalized study recommendations."
    }
  ];

  const benefits = [
    "AI-enhanced learning experience",
    "Real-time progress tracking",
    "Streamlined classroom management",
    "Intelligent study recommendations",
    "Collaborative learning environment",
    "Comprehensive analytics dashboard"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-floating delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="lg" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ClassroomLM</h1>
                <p className="text-sm text-gray-600">AI-Powered Education Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight animate-gradient">
              Transform Education with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient"> AI-Powered ClassroomLM</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              The future of education is here. Combine AI-powered research tools with intelligent classroom management 
              to create personalized learning experiences that adapt to every student's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Card 
                className="cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-blue-300 backdrop-blur-sm bg-white/70 hover:bg-white/80 hover:scale-105 group relative overflow-hidden p-8"
                onClick={() => navigate('/student')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <GraduationCap className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 mb-4">
                    Student Portal
                  </h3>
                  <p className="text-gray-600 mb-6">Access your AI-powered learning dashboard with personalized tools and insights</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Enter as Student
                  </Button>
                </div>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-purple-300 backdrop-blur-sm bg-white/70 hover:bg-white/80 hover:scale-105 group relative overflow-hidden p-8"
                onClick={() => navigate('/admin')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <UserCog className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300 mb-4">
                    Teacher Portal
                  </h3>
                  <p className="text-gray-600 mb-6">Comprehensive classroom management with AI-powered insights and analytics</p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Enter as Teacher
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 backdrop-blur-sm bg-white/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-gradient">
              Revolutionary Education Technology
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of classroom management powered by artificial intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm bg-white/70 hover:bg-white/80 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative">
                    {feature.icon}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-floating"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-floating delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                Why Choose ClassroomLM?
              </h2>
              <p className="text-2xl text-blue-100 mb-10 leading-relaxed">
                Experience the perfect fusion of artificial intelligence and educational excellence, 
                designed to transform how students learn and teachers teach.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 backdrop-blur-sm bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-floating">
              <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-10 border border-white/20 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6 p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">For Educators</h3>
                      <p className="text-blue-100 text-lg">Intelligent classroom orchestration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">For Students</h3>
                      <p className="text-blue-100 text-lg">Personalized AI learning companion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 backdrop-blur-sm bg-white/30 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Ready to Experience the Future?
          </h2>
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
            Join the revolution in AI-powered education and transform how learning happens.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
              onClick={() => navigate('/student')}
            >
              <GraduationCap className="mr-3 h-6 w-6" />
              Student Experience
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
              onClick={() => navigate('/admin')}
            >
              <UserCog className="mr-3 h-6 w-6" />
              Teacher Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <Logo size="lg" />
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ClassroomLM</h3>
                  <p className="text-gray-300 text-lg">AI-Powered Education Platform</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                Revolutionizing education through intelligent AI technology and comprehensive classroom management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-300">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-300 text-lg">&copy; 2025 ClassroomLM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;