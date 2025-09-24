import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Share2, Search, Users, BookOpen, Eye, MessageCircle, Plus, Clock, Star } from 'lucide-react';

const SharedNotebooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareData, setShareData] = useState({
    notebookId: '',
    shareWith: 'class',
    message: '',
    shareType: 'view'
  });

  // Mock data - replace with actual API calls
  const myNotebooks = [
    { id: '1', title: 'Biology Research Notes', icon: '🧬' },
    { id: '2', title: 'Chemistry Lab Reports', icon: '⚗️' },
    { id: '3', title: 'Physics Problem Solutions', icon: '⚡' }
  ];

  const sharedNotebooks = [
    {
      id: '1',
      title: 'Advanced Genetics Study Guide',
      description: 'Comprehensive study guide for the upcoming genetics exam',
      sharedBy: 'John Smith',
      sharedByAvatar: null,
      className: 'Advanced Biology',
      shareType: 'view',
      sharedAt: '2025-01-14T10:30:00',
      viewCount: 23,
      isStarred: true,
      tags: ['genetics', 'exam-prep', 'study-guide']
    },
    {
      id: '2',
      title: 'Machine Learning Project Notes',
      description: 'Research notes and implementation details for ML project',
      sharedBy: 'Mary Johnson',
      sharedByAvatar: null,
      className: 'Education Technology',
      shareType: 'collaborate',
      sharedAt: '2025-01-13T15:45:00',
      viewCount: 18,
      isStarred: false,
      tags: ['machine-learning', 'project', 'research']
    },
    {
      id: '3',
      title: 'Business Case Analysis Framework',
      description: 'Step-by-step framework for analyzing business cases',
      sharedBy: 'Robert Wilson',
      sharedByAvatar: null,
      className: 'Business Studies',
      shareType: 'view',
      sharedAt: '2025-01-12T11:20:00',
      viewCount: 31,
      isStarred: true,
      tags: ['business', 'analysis', 'framework']
    }
  ];

  const handleShareNotebook = () => {
    // TODO: Implement actual API call
    console.log('Sharing notebook:', shareData);
    setShowShareDialog(false);
    setShareData({
      notebookId: '',
      shareWith: 'class',
      message: '',
      shareType: 'view'
    });
  };

  const handleStarNotebook = (notebookId: string) => {
    // TODO: Implement actual API call
    console.log('Starring notebook:', notebookId);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const filteredNotebooks = sharedNotebooks.filter(notebook =>
    notebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notebook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notebook.sharedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notebook.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Shared Notebooks</h2>
            <p className="text-gray-600">Collaborate and learn from your classmates' research</p>
          </div>
          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share Notebook
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md backdrop-blur-sm bg-white/90">
              <DialogHeader>
                <DialogTitle>Share Notebook</DialogTitle>
                <DialogDescription>Share your notebook with classmates</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notebook">Select Notebook</Label>
                  <Select value={shareData.notebookId} onValueChange={(value) => setShareData({...shareData, notebookId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a notebook to share" />
                    </SelectTrigger>
                    <SelectContent>
                      {myNotebooks.map((notebook) => (
                        <SelectItem key={notebook.id} value={notebook.id}>
                          <div className="flex items-center space-x-2">
                            <span>{notebook.icon}</span>
                            <span>{notebook.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shareWith">Share With</Label>
                  <Select value={shareData.shareWith} onValueChange={(value) => setShareData({...shareData, shareWith: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Entire Class</SelectItem>
                      <SelectItem value="study-group">Study Group</SelectItem>
                      <SelectItem value="specific">Specific Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shareType">Permission Level</Label>
                  <Select value={shareData.shareType} onValueChange={(value) => setShareData({...shareData, shareType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="collaborate">Can Collaborate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={shareData.message}
                    onChange={(e) => setShareData({...shareData, message: e.target.value})}
                    placeholder="Add a message for your classmates..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleShareNotebook}>Share Notebook</Button>
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
              placeholder="Search shared notebooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 border-white/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shared Notebooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotebooks.map((notebook) => (
          <Card 
            key={notebook.id}
            className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight mb-2">{notebook.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{notebook.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStarNotebook(notebook.id)}
                  className={`hover:bg-white/50 ${notebook.isStarred ? 'text-yellow-600' : 'text-gray-400'}`}
                >
                  <Star className={`h-4 w-4 ${notebook.isStarred ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Shared by */}
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={notebook.sharedByAvatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                      {getInitials(notebook.sharedBy)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">by {notebook.sharedBy}</span>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-white/50 border-white/30">
                      {notebook.className}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={notebook.shareType === 'collaborate' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-blue-100 text-blue-800 border-blue-200'
                      }
                    >
                      {notebook.shareType === 'collaborate' ? 'Collaborative' : 'View Only'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(notebook.sharedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{notebook.viewCount} views</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {notebook.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-white/50 border-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Open
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-white/50 border-white/30 hover:bg-white/70 transition-all duration-300"
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotebooks.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
          <CardContent className="text-center py-12">
            <Share2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No shared notebooks found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'No notebooks have been shared with you yet'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setShowShareDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Your First Notebook
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SharedNotebooks;