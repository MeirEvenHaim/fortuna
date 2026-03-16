import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, UserCircle2 } from 'lucide-react';

interface Post {
  id: number;
  authorAlias: string;
  content: string;
  upvotes: number;
  createdAt: string;
}

export function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  // Generate a random comforting alias
  const aliases = ["לב אוהב", "מסע משותף", "תקווה חדשה", "אופק רחב", "חבר למסע", "נשמה טובה"];
  const randomAlias = () => aliases[Math.floor(Math.random() * aliases.length)];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/community/posts');
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setIsPublishing(true);
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorAlias: randomAlias(), content: newPostContent })
      });
      const data = await res.json();
      if (data.success && data.post) {
        setPosts([data.post, ...posts]);
        setNewPostContent('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUpvote = async (postId: number) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
    try {
      await fetch(`/api/community/posts/${postId}/upvote`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] pt-24 pb-20 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            הקליניקה <span className="text-pink-600">הפתוחה</span>
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            מקום אנונימי, בטוח ומכיל לשתף בו חוויות, קשיים והצלחות. כאן לא שופטים, רק מקשיבים.
          </p>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
              <UserCircle2 className="w-8 h-8 text-pink-500" />
            </div>
            <form onSubmit={handlePostSubmit} className="flex-grow">
              <textarea 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="שתפו אנונימית משהו שיושב לכם על הלב..."
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-pink-500/50 resize-none min-h-[100px]"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-400 font-medium px-2 bg-gray-100 rounded-full py-1">
                  הפרסום הוא אנונימי לחלוטין 🎭
                </span>
                <button 
                  type="submit" 
                  disabled={isPublishing || !newPostContent.trim()}
                  className="bg-pink-600 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isPublishing ? 'מפרסם...' : 'שתף קהילה'} 
                  <Send className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <UserCircle2 className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{post.authorAlias}</h3>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              <div className="text-gray-800 mb-6 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
              
              <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors group"
                >
                  <Heart className="w-5 h-5 group-hover:fill-pink-100" /> 
                  <span className="font-medium">חיבוק וירטואלי ({post.upvotes})</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" /> 
                  <span className="font-medium">תגובות (0)</span>
                </button>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <Heart className="w-12 h-12 text-pink-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500">תהיו הראשונים לשתף.</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
