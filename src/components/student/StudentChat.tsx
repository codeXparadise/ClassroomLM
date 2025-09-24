import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Users, MessageCircle, Search, Paperclip, Smile, MoreVertical } from 'lucide-react';

const StudentChat = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>('class-1');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - replace with actual API calls
  const chatRooms = [
    {
      id: 'class-1',
      name: 'Advanced Biology',
      type: 'class',
      participants: 28,
      lastMessage: 'Hey everyone, did you finish the lab report?',
      lastMessageTime: '2 min ago',
      unreadCount: 3,
      isOnline: true
    },
    {
      id: 'class-2',
      name: 'Education Technology',
      type: 'class',
      participants: 35,
      lastMessage: 'The presentation slides are really helpful!',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 'study-group-1',
      name: 'Biology Study Group',
      type: 'group',
      participants: 6,
      lastMessage: 'Let\'s meet at the library tomorrow',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: false
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: 'user-1',
      senderName: 'John Smith',
      message: 'Hey everyone, did you finish the lab report?',
      timestamp: '2025-01-15T14:30:00',
      isCurrentUser: false,
      avatar: null
    },
    {
      id: '2',
      senderId: 'current-user',
      senderName: 'You',
      message: 'Yes, I submitted it this morning. The enzyme analysis was tricky!',
      timestamp: '2025-01-15T14:32:00',
      isCurrentUser: true,
      avatar: null
    },
    {
      id: '3',
      senderId: 'user-2',
      senderName: 'Mary Johnson',
      message: 'I had trouble with the calculations too. Can someone share their approach?',
      timestamp: '2025-01-15T14:35:00',
      isCurrentUser: false,
      avatar: null
    },
    {
      id: '4',
      senderId: 'current-user',
      senderName: 'You',
      message: 'Sure! I used the Henderson-Hasselbalch equation. I can share my notes.',
      timestamp: '2025-01-15T14:37:00',
      isCurrentUser: true,
      avatar: null
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // TODO: Implement actual message sending
      console.log('Sending message:', message, 'to chat:', selectedChat);
      setMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const selectedChatRoom = chatRooms.find(room => room.id === selectedChat);

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Chat</h2>
        <p className="text-gray-600">Connect and collaborate with your classmates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span>Chats</span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 border-white/30"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-1 p-4">
                {chatRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedChat(room.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-102 ${
                      selectedChat === room.id
                        ? 'bg-gradient-to-r from-blue-100/80 to-purple-100/80 border border-blue-200/50 shadow-md'
                        : 'hover:bg-white/50 border border-transparent hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                          {room.type === 'class' ? (
                            <Users className="h-5 w-5 text-white" />
                          ) : (
                            <MessageCircle className="h-5 w-5 text-white" />
                          )}
                        </div>
                        {room.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 truncate">{room.name}</h4>
                          {room.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                              {room.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{room.lastMessageTime}</span>
                          <span className="text-xs text-gray-500">{room.participants} members</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 backdrop-blur-sm bg-white/70 border border-white/20 shadow-lg flex flex-col">
          {selectedChatRoom ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b border-white/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                      {selectedChatRoom.type === 'class' ? (
                        <Users className="h-5 w-5 text-white" />
                      ) : (
                        <MessageCircle className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedChatRoom.name}</h3>
                      <p className="text-sm text-gray-600">{selectedChatRoom.participants} members</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-white/50">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-96 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${msg.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {!msg.isCurrentUser && (
                            <Avatar className="w-8 h-8 shadow-md">
                              <AvatarImage src={msg.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                                {getInitials(msg.senderName)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`rounded-2xl p-3 shadow-md transition-all duration-300 hover:shadow-lg ${
                            msg.isCurrentUser
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'backdrop-blur-sm bg-white/80 border border-white/30 text-gray-900'
                          }`}>
                            {!msg.isCurrentUser && (
                              <p className="text-xs font-medium mb-1 text-gray-600">{msg.senderName}</p>
                            )}
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-white/30">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="hover:bg-white/50">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-white/50 border-white/30 focus:bg-white/70 transition-all duration-300"
                  />
                  <Button variant="ghost" size="sm" className="hover:bg-white/50">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a chat</h3>
                <p className="text-gray-600">Choose a class or study group to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentChat;