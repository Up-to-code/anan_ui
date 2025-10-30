/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/clients/[id]/history/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiArrowLeft, FiSearch, FiMessageSquare, FiFileText, FiUser, FiClock, FiCpu, FiDownload, FiEye, FiEdit } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Enums matching Prisma schema
enum MessageSender {
  CLIENT = 'CLIENT',
  BOT = 'BOT',
  ADMIN = 'ADMIN'
}

enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  LOCATION = 'LOCATION',
  TEMPLATE = 'TEMPLATE'
}

enum FileType {
  DOCUMENT = 'DOCUMENT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  PDF = 'PDF',
  OTHER = 'OTHER'
}

interface Client {
  id: string;
  phoneNumber: string;
  name?: string;
  profileImage?: string;
  planType: string;
  status: string;
  createdAt: string;
  lastInteraction?: string;
}

interface AIHistory {
  id: string;
  userMessage: string;
  aiResponse: string;
  intent?: string;
  entities?: any;
  propertyIds: string[];
  modelUsed: string;
  tokens?: number;
  timestamp: string;
}

interface MessageHistory {
  id: string;
  content: string;
  messageType: MessageType;
  sender: MessageSender;
  mediaUrl?: string;
  thumbnailUrl?: string;
  whatsappId?: string;
  templateId?: string;
  isRead: boolean;
  delivered: boolean;
  timestamp: string;
}

interface FileHistory {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: FileType;
  fileSize?: number;
  mimeType?: string;
  createdByClient: boolean;
  createdAt: string;
}

type TabType = 'overview' | 'messages' | 'ai' | 'files';

export default function ClientHistoryPage() {
  const params = useParams();
  const clientId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<MessageHistory[]>([]);
  const [aiHistory, setAiHistory] = useState<AIHistory[]>([]);
  const [files, setFiles] = useState<FileHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAI, setEditingAI] = useState<AIHistory | null>(null);
  const [editForm, setEditForm] = useState({
    userMessage: '',
    aiResponse: ''
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock client data
      setClient({
        id: clientId,
        phoneNumber: '+966501234567',
        name: 'أحمد محمد',
        profileImage: '/api/placeholder/100/100',
        planType: 'MONTHLY',
        status: 'ACTIVE',
        createdAt: '2024-01-15T00:00:00Z',
        lastInteraction: '2024-03-20T10:34:00Z'
      });

      // Mock messages data
      setMessages([
        {
          id: '1',
          content: 'مرحباً، أريد استشارة حول عقار للإيجار في الرياض. هل لديكم شقق متاحة؟',
          messageType: MessageType.TEXT,
          sender: MessageSender.CLIENT,
          timestamp: '2024-03-20T10:30:00Z',
          isRead: true,
          delivered: true
        },
        {
          id: '2',
          content: 'أهلاً بك! سأساعدك في العثور على العقار المناسب. لدينا عدة خيارات لشقق في الرياض. ما نوع الشقة التي تبحث عنها؟',
          messageType: MessageType.TEXT,
          sender: MessageSender.BOT,
          timestamp: '2024-03-20T10:31:00Z',
          isRead: true,
          delivered: true
        },
        {
          id: '3',
          content: 'أبحث عن شقة بغرفتين وصالة في حي الصحافة. الميزانية 2500 ريال شهرياً',
          messageType: MessageType.TEXT,
          sender: MessageSender.CLIENT,
          timestamp: '2024-03-20T10:32:00Z',
          isRead: true,
          delivered: true
        },
        {
          id: '4',
          content: 'لدي شقة جميلة بغرفتين في حي الصحافة بسعر 2400 ريال. مساحة 110 متر، غرفتين نوم، صالة، مطبخ، وحمامين. هل تريد رؤية الصور؟',
          messageType: MessageType.TEXT,
          sender: MessageSender.BOT,
          timestamp: '2024-03-20T10:33:00Z',
          isRead: true,
          delivered: true
        }
      ]);

      // Mock AI history data
      setAiHistory([
        {
          id: '1',
          userMessage: 'أريد استشارة حول عقار للإيجار في الرياض',
          aiResponse: 'مرحباً! سأساعدك في العثور على العقار المناسب. هل تفضل شقة أم فيلا؟ وما هي ميزانيتك الشهرية؟',
          intent: 'property_inquiry',
          propertyIds: ['prop1', 'prop2'],
          modelUsed: 'gpt-4',
          tokens: 180,
          timestamp: '2024-03-20T10:31:00Z'
        },
        {
          id: '2',
          userMessage: 'أبحث عن شقة بغرفتين وصالة في حي الصحافة. الميزانية 2500 ريال شهرياً',
          aiResponse: 'لدي عدة خيارات لشقق بغرفتين في حي الصحافة. الشقة الأولى: غرفتين، صالة، مطبخ، حمامين، مساحة 110م، سعر 2400 ريال. الشقة الثانية: غرفتين، صالة، مطبخ مفتوح، حمام، مساحة 95م، سعر 2200 ريال. أي منهما تفضل؟',
          intent: 'property_search',
          propertyIds: ['prop3', 'prop4'],
          modelUsed: 'gpt-4',
          tokens: 250,
          timestamp: '2024-03-20T10:33:00Z'
        }
      ]);

      // Mock files data
      setFiles([
        {
          id: '1',
          fileName: 'عقد_الإيجار_النهائي.pdf',
          fileUrl: '/api/placeholder/document.pdf',
          fileType: FileType.PDF,
          fileSize: 2048576,
          mimeType: 'application/pdf',
          createdByClient: true,
          createdAt: '2024-03-20T10:35:00Z'
        },
        {
          id: '2',
          fileName: 'صورة_الهوية_الوطنية.jpg',
          fileUrl: '/api/placeholder/id.jpg',
          fileType: FileType.IMAGE,
          fileSize: 1024576,
          mimeType: 'image/jpeg',
          createdByClient: true,
          createdAt: '2024-03-20T10:40:00Z'
        }
      ]);

      setLoading(false);
    };

    loadData();
  }, [clientId]);

  const filteredData = {
    messages: messages.filter(msg => 
      msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    ai: aiHistory.filter(ai => 
      ai.userMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ai.aiResponse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ai.intent?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    files: files.filter(file => 
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  const handleEditAI = (ai: AIHistory) => {
    setEditingAI(ai);
    setEditForm({
      userMessage: ai.userMessage,
      aiResponse: ai.aiResponse
    });
  };

  const handleSaveEdit = () => {
    if (editingAI) {
      setAiHistory(prev => prev.map(ai => 
        ai.id === editingAI.id 
          ? { ...ai, userMessage: editForm.userMessage, aiResponse: editForm.aiResponse }
          : ai
      ));
      setEditingAI(null);
      setEditForm({ userMessage: '', aiResponse: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingAI(null);
    setEditForm({ userMessage: '', aiResponse: '' });
  };

  const getSenderText = (sender: MessageSender) => {
    switch (sender) {
      case MessageSender.CLIENT: return 'العميل';
      case MessageSender.BOT: return 'البوت';
      case MessageSender.ADMIN: return 'المشرف';
      default: return sender;
    }
  };

  const getSenderColor = (sender: MessageSender) => {
    switch (sender) {
      case MessageSender.CLIENT: return 'bg-blue-100 text-blue-800';
      case MessageSender.BOT: return 'bg-green-100 text-green-800';
      case MessageSender.ADMIN: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileTypeIcon = (fileType: FileType) => {
    switch (fileType) {
      case FileType.PDF: return '📄';
      case FileType.IMAGE: return '🖼️';
      case FileType.VIDEO: return '🎥';
      case FileType.AUDIO: return '🎵';
      case FileType.DOCUMENT: return '📝';
      default: return '📎';
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'overview' as TabType, name: 'نظرة عامة', icon: FiEye, count: 0 },
    { id: 'messages' as TabType, name: 'الرسائل', icon: FiMessageSquare, count: messages.length },
    { id: 'ai' as TabType, name: 'الذكاء الاصطناعي', icon: FiCpu, count: aiHistory.length },
    { id: 'files' as TabType, name: 'الملفات', icon: FiFileText, count: files.length },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل السجل...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">العميل غير موجود</p>
        <Link href="/dashboard/clients" className="text-blue-600 hover:underline">
          العودة إلى العملاء
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/clients"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">سجل العميل</h1>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  {client.profileImage ? (
                    <img 
                      src={client.profileImage} 
                      alt={client.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-blue-600" size={16} />
                  )}
                </div>
                <span className="font-medium">{client.name || 'بدون اسم'}</span>
              </div>
              <span>•</span>
              <span>{client.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
              {tab.count > 0 && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Search */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="relative">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`ابحث في ${tabs.find(t => t.id === activeTab)?.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content based on active tab */}
      <div className="space-y-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Messages */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiMessageSquare className="text-blue-600" size={20} />
                  آخر الرسائل
                </h3>
                <div className="space-y-4">
                  {messages.slice(0, 3).map((message) => (
                    <div 
                      key={message.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                      onClick={() => setActiveTab('messages')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getSenderColor(message.sender)}`}>
                          {getSenderText(message.sender)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-2">{message.content}</p>
                    </div>
                  ))}
                </div>
                {messages.length > 3 && (
                  <button 
                    onClick={() => setActiveTab('messages')}
                    className="w-full mt-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    عرض جميع الرسائل ({messages.length})
                  </button>
                )}
              </CardContent>
            </Card>

            {/* Recent AI Interactions */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiCpu className="text-green-600" size={20} />
                  آخر تفاعلات الذكاء الاصطناعي
                </h3>
                <div className="space-y-4">
                  {aiHistory.slice(0, 2).map((ai) => (
                    <div 
                      key={ai.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-green-300 cursor-pointer transition-colors"
                      onClick={() => setActiveTab('ai')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        {ai.intent && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {ai.intent}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatDate(ai.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-2">
                        <strong>سؤال:</strong> {ai.userMessage}
                      </p>
                    </div>
                  ))}
                </div>
                {aiHistory.length > 2 && (
                  <button 
                    onClick={() => setActiveTab('ai')}
                    className="w-full mt-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    عرض جميع التفاعلات ({aiHistory.length})
                  </button>
                )}
              </CardContent>
            </Card>

            {/* Recent Files */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiFileText className="text-purple-600" size={20} />
                  آخر الملفات
                </h3>
                <div className="space-y-3">
                  {files.slice(0, 3).map((file) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors"
                      onClick={() => setActiveTab('files')}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getFileTypeIcon(file.fileType)}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{file.fileName}</p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {files.length > 3 && (
                  <button 
                    onClick={() => setActiveTab('files')}
                    className="w-full mt-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    عرض جميع الملفات ({files.length})
                  </button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <>
            {filteredData.messages.map((message) => (
              <Card key={message.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getSenderColor(message.sender)}`}>
                        {getSenderText(message.sender)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {message.messageType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiClock size={12} />
                      <span>{formatDate(message.timestamp)}</span>
                    </div>
                  </div>
                  <p className="text-gray-800">{message.content}</p>
                  {message.mediaUrl && (
                    <div className="mt-2">
                      <img 
                        src={message.mediaUrl} 
                        alt="Media content"
                        className="max-w-xs rounded-lg"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {filteredData.messages.length === 0 && (
              <Card className="border border-gray-200">
                <CardContent className="text-center py-12">
                  <FiMessageSquare className="mx-auto text-gray-400 mb-3" size={48} />
                  <div className="text-gray-500 text-lg">لا توجد رسائل</div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* AI History Tab */}
        {activeTab === 'ai' && (
          <>
            {filteredData.ai.map((ai) => (
              <Card key={ai.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FiCpu className="text-green-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">تفاعل ذكاء اصطناعي</span>
                      {ai.intent && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {ai.intent}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditAI(ai)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="تعديل"
                      >
                        <FiEdit size={14} />
                      </button>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiClock size={12} />
                        <span>{formatDate(ai.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  {editingAI?.id === ai.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">رسالة العميل:</label>
                        <textarea
                          value={editForm.userMessage}
                          onChange={(e) => setEditForm(prev => ({ ...prev, userMessage: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">رد الذكاء الاصطناعي:</label>
                        <textarea
                          value={editForm.aiResponse}
                          onChange={(e) => setEditForm(prev => ({ ...prev, aiResponse: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          حفظ
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3 border-r-4 border-blue-500">
                        <p className="text-sm text-gray-600 mb-1">رسالة العميل:</p>
                        <p className="text-gray-800">{ai.userMessage}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 border-r-4 border-green-500">
                        <p className="text-sm text-gray-600 mb-1">رد الذكاء الاصطناعي:</p>
                        <p className="text-gray-800">{ai.aiResponse}</p>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>النموذج: {ai.modelUsed}</span>
                        {ai.tokens && <span>الرموز: {ai.tokens}</span>}
                        {ai.propertyIds.length > 0 && (
                          <span>العقارات: {ai.propertyIds.length}</span>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {filteredData.ai.length === 0 && (
              <Card className="border border-gray-200">
                <CardContent className="text-center py-12">
                  <FiCpu className="mx-auto text-gray-400 mb-3" size={48} />
                  <div className="text-gray-500 text-lg">لا توجد تفاعلات ذكاء اصطناعي</div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <>
            {filteredData.files.map((file) => (
              <Card key={file.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileTypeIcon(file.fileType)}</span>
                      <div>
                        <p className="font-medium text-gray-800">{file.fileName}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{file.fileType}</span>
                          {file.fileSize && <span>{formatFileSize(file.fileSize)}</span>}
                          <span>{file.createdByClient ? 'مرفوع من العميل' : 'مُنشأ من البوت'}</span>
                        </div>
                      </div>
                    </div>
                    <a 
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      <FiDownload size={14} />
                      تحميل
                    </a>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    {formatDate(file.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredData.files.length === 0 && (
              <Card className="border border-gray-200">
                <CardContent className="text-center py-12">
                  <FiFileText className="mx-auto text-gray-400 mb-3" size={48} />
                  <div className="text-gray-500 text-lg">لا توجد ملفات</div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}