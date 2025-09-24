import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/dropdown-menu';
import { FileText, Download, Eye, Search, Filter, BookOpen, Video, FileAudio, Image, Star, Clock } from 'lucide-react';

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterClass, setFilterClass] = useState('all');

  // Mock data - replace with actual API calls
  const materials = [
    {
      id: '1',
      title: 'Molecular Biology Lecture Notes',
      description: 'Comprehensive notes covering DNA replication and protein synthesis',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      uploadedBy: 'Dr. Smith',
      className: 'Advanced Biology',
      tags: ['biology', 'molecular', 'dna'],
      uploadedAt: '2025-01-10T10:00:00',
      downloadCount: 45,
      isSaved: true
    },
    {
      id: '2',
      title: 'AI in Education Video Series',
      description: 'Video lectures on artificial intelligence applications in modern education',
      fileType: 'video',
      fileSize: '156 MB',
      uploadedBy: 'Prof. Johnson',
      className: 'Education Technology',
      tags: ['ai', 'education', 'technology'],
      uploadedAt: '2025-01-12T14:30:00',
      downloadCount: 32,
      isSaved: false
    },
    {
      id: '3',
      title: 'Business Strategy Case Studies',
      description: 'Collection of real-world business case studies and analysis',
      fileType: 'pdf',
      fileSize: '5.1 MB',
      uploadedBy: 'Dr. Wilson',
      className: 'Business Studies',
      tags: ['business', 'strategy', 'case-study'],
      uploadedAt: '2025-01-08T09:15:00',
      downloadCount: 67,
      isSaved: true
    },
    {
      id: '4',
      title: 'Chemistry Lab Audio Guide',
      description: 'Audio instructions for organic chemistry lab procedures',
      fileType: 'audio',
      fileSize: '12.3 MB',
      uploadedBy: 'Dr. Brown',
      className: 'Organic Chemistry',
      tags: ['chemistry', 'lab', 'procedures'],
      uploadedAt: '2025-01-14T16:45:00',
      downloadCount: 23,
      isSaved: false
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-600" />;
      case 'audio':
        return <FileAudio className="h-5 w-5 text-purple-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'video':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'audio':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'image':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSaveMaterial = (materialId: string) => {
    // TODO: Implement actual API call
    console.log('Saving material:', materialId);
  };

  const handleDownload = (materialId: string) => {
    // TODO: Implement actual download
    console.log('Downloading material:', materialId);
  };

  const handleView = (materialId: string) => {
    // TODO: Implement material viewer
    console.log('Viewing material:', materialId);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || material.fileType === filterType;
    const matchesClass = filterClass === 'all' || material.className === filterClass;
    return matchesSearch && matchesType && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Materials</h2>
        <p className="text-gray-600">Access and save study materials shared by your instructors</p>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 border-white/30"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
                <Filter className="h-4 w-4 mr-2" />
                Type: All
              </Button>
              <Button variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
                <BookOpen className="h-4 w-4 mr-2" />
                Class: All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card 
            key={material.id}
            className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getFileIcon(material.fileType)}
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getFileTypeColor(material.fileType)}>
                        {material.fileType.toUpperCase()}
                      </Badge>
                      {material.isSaved && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Star className="h-3 w-3 mr-1" />
                          Saved
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {material.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By {material.uploadedBy}</span>
                  <span>{material.fileSize}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <BookOpen className="h-3 w-3" />
                  <span>{material.className}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Uploaded {new Date(material.uploadedAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {material.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-white/50 border-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                    onClick={() => handleView(material.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                    onClick={() => handleDownload(material.id)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300 ${
                      material.isSaved ? 'text-yellow-600' : ''
                    }`}
                    onClick={() => handleSaveMaterial(material.id)}
                  >
                    <Star className={`h-3 w-3 ${material.isSaved ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria' : 'No study materials have been shared yet'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudyMaterials;