import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Search, FileText, Video, FileAudio, Image, Download, Eye, Trash2, Edit, Plus, Users } from 'lucide-react';

const StudyMaterialsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    classId: '',
    isPublic: false,
    tags: '',
    file: null as File | null
  });

  // Mock data - replace with actual API calls
  const classes = [
    { id: '1', name: 'Advanced Biology' },
    { id: '2', name: 'Education Technology' },
    { id: '3', name: 'Business Studies' }
  ];

  const materials = [
    {
      id: '1',
      title: 'Molecular Biology Lecture Notes',
      description: 'Comprehensive notes covering DNA replication and protein synthesis',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      className: 'Advanced Biology',
      isPublic: true,
      tags: ['biology', 'molecular', 'dna'],
      uploadedAt: '2025-01-10T10:00:00',
      downloadCount: 45,
      viewCount: 78
    },
    {
      id: '2',
      title: 'AI in Education Video Series',
      description: 'Video lectures on artificial intelligence applications',
      fileType: 'video',
      fileSize: '156 MB',
      className: 'Education Technology',
      isPublic: false,
      tags: ['ai', 'education', 'technology'],
      uploadedAt: '2025-01-12T14:30:00',
      downloadCount: 32,
      viewCount: 56
    },
    {
      id: '3',
      title: 'Business Strategy Case Studies',
      description: 'Collection of real-world business case studies',
      fileType: 'pdf',
      fileSize: '5.1 MB',
      className: 'Business Studies',
      isPublic: true,
      tags: ['business', 'strategy', 'case-study'],
      uploadedAt: '2025-01-08T09:15:00',
      downloadCount: 67,
      viewCount: 92
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData({...uploadData, file: e.target.files[0]});
    }
  };

  const handleUpload = () => {
    // TODO: Implement actual file upload
    console.log('Uploading material:', uploadData);
    setShowUploadDialog(false);
    setUploadData({
      title: '',
      description: '',
      classId: '',
      isPublic: false,
      tags: '',
      file: null
    });
  };

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Materials Management</h2>
            <p className="text-gray-600">Upload and manage study materials for your students</p>
          </div>
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                <Upload className="h-4 w-4 mr-2" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl backdrop-blur-sm bg-white/90">
              <DialogHeader>
                <DialogTitle>Upload Study Material</DialogTitle>
                <DialogDescription>Share educational content with your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                    placeholder="Enter material title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadData.description}
                    onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                    placeholder="Describe the material content"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={uploadData.classId} onValueChange={(value) => setUploadData({...uploadData, classId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={uploadData.tags}
                      onChange={(e) => setUploadData({...uploadData, tags: e.target.value})}
                      placeholder="e.g., biology, exam-prep"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={uploadData.isPublic}
                    onCheckedChange={(checked) => setUploadData({...uploadData, isPublic: checked})}
                  />
                  <Label>Make public to all classes</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.wav,.jpg,.png"
                  />
                  <p className="text-xs text-gray-500">
                    Supported: PDF, DOC, PPT, MP4, MP3, WAV, JPG, PNG (Max 100MB)
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={!uploadData.title || !uploadData.file}>
                  Upload Material
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 border-white/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Materials Table */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle>Study Materials</CardTitle>
          <CardDescription>Manage all uploaded study materials</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id} className="hover:bg-white/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getFileIcon(material.fileType)}
                      <div>
                        <div className="font-medium text-gray-900">{material.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{material.description}</div>
                        <div className="text-xs text-gray-400">{material.fileSize}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white/50 border-white/30">
                      {material.className}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getFileTypeColor(material.fileType)}>
                      {material.fileType.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={material.isPublic 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-blue-100 text-blue-800 border-blue-200'
                      }
                    >
                      {material.isPublic ? 'Public' : 'Class Only'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Eye className="h-3 w-3" />
                        <span>{material.viewCount}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Download className="h-3 w-3" />
                        <span>{material.downloadCount}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(material.uploadedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="hover:bg-blue-50 text-blue-600">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-50">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyMaterialsManagement;