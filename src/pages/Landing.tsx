import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, BarChart3, FileText, MessageCircle, Headphones, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered NotebookLM",
      description: "Upload documents and get instant, context-aware answers with verifiable citations."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Student Management",
      description: "Efficiently manage student enrollments, track progress, and organize classes."
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Assignment System",
      description: "Create, distribute, and grade assignments with integrated AI assistance."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into student performance and engagement metrics."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-indigo-600" />,
      title: "Interactive Chat",
      description: "Students can chat with their documents and get instant AI-powered responses."
    },
    {
      icon: <Headphones className="h-8 w-8 text-pink-600" />,
      title: "Audio Overviews",
      description: "Generate podcast-style audio summaries from uploaded materials."
    }
  ];

  const benefits = [
    "Streamline classroom administration",
    "Enhance student learning with AI",
    "Track progress in real-time",
    "Reduce grading workload",
    "Improve student engagement",
    "Data-driven insights"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="lg" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">InsightsLM</h1>
                <p className="text-sm text-gray-600">Classroom Management System</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="hover:bg-gray-50"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Classroom with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI-Powered Learning</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Combine the power of NotebookLM's AI research capabilities with comprehensive classroom management tools. 
              Empower students to learn smarter while giving educators the insights they need to teach better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => navigate('/auth')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for AI-Powered Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ClassroomLM combines cutting-edge AI technology with comprehensive classroom management tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose ClassroomLM?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Built on the foundation of NotebookLM's powerful AI capabilities, our classroom management system 
                provides educators and students with the tools they need to succeed in the digital age.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">For Educators</h3>
                      <p className="text-blue-100">Comprehensive classroom management</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">For Students</h3>
                      <p className="text-blue-100">AI-enhanced learning experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of educators who are already using ClassroomLM to enhance their teaching and student outcomes.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg"
            onClick={() => navigate('/auth')}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Logo size="md" className="bg-white" />
                <div>
                  <h3 className="text-xl font-bold">ClassroomLM</h3>
                  <p className="text-gray-400">Classroom Management System</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering education through AI-driven insights and comprehensive classroom management tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ClassroomLM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;