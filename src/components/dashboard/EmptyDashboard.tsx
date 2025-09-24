import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Globe, Video, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotebooks } from '@/hooks/useNotebooks';
const EmptyDashboard = () => {
  const navigate = useNavigate();
  const {
    createNotebook,
    isCreating
  } = useNotebooks();
  const handleCreateNotebook = () => {
    console.log('Create notebook button clicked');
    console.log('isCreating:', isCreating);
    createNotebook({
      title: 'Untitled notebook',
      description: ''
    }, {
      onSuccess: data => {
        console.log('Navigating to notebook:', data.id);
        navigate(`/notebook/${data.id}`);
      },
      onError: error => {
        console.error('Failed to create notebook:', error);
      }
    });
  };
  return <div className="text-center py-16">
      <div className="mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Create your first notebook</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">InsightsLM is an AI-powered research and writing assistant that works best with the sources you upload</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        <div className="backdrop-blur-sm bg-white/70 rounded-2xl border border-white/20 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-md">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">PDFs</h3>
          <p className="text-gray-600">Upload research papers, reports, and documents</p>
        </div>

        <div className="backdrop-blur-sm bg-white/70 rounded-2xl border border-white/20 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-md">
            <Globe className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Websites</h3>
          <p className="text-gray-600">Add web pages and online articles as sources</p>
        </div>

        <div className="backdrop-blur-sm bg-white/70 rounded-2xl border border-white/20 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-md">
            <Video className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Audio</h3>
          <p className="text-gray-600">Include multimedia content in your research</p>
        </div>
      </div>

      <Button 
        onClick={handleCreateNotebook} 
        size="lg" 
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg rounded-2xl" 
        disabled={isCreating}
      >
        <Upload className="h-5 w-5 mr-2" />
        {isCreating ? 'Creating...' : 'Create notebook'}
      </Button>
    </div>;
};
export default EmptyDashboard;