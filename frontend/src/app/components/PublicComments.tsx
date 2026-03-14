import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

interface Comment {
  id: number;
  entityType: string;
  entityId: number;
  text: string;
  createdAt: string;
}

export function PublicComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      // Fetch specifically customer comments for the public wall
      const response = await fetch('/api/comments/customer/0');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType: 'customer',
          // Using 0 as a generic ID for public wall comments since they aren't tied to a specific customer purchase
          entityId: 0, 
          text: newComment
        })
      });

      if (response.ok) {
        setNewComment('');
        fetchComments();
      } else {
        setError('אירעה שגיאה בשליחת התגובה');
      }
    } catch (err) {
      setError('אירעה שגיאה בשליחת התגובה');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-12 mb-12 border-2 border-pink-50">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-8 h-8 text-pink-500" />
        <h2 className="text-2xl font-bold text-gray-800">מה חושבים עלינו?</h2>
      </div>

      {/* Comment Submission Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 p-6 rounded-2xl">
        <h3 className="text-lg font-medium text-gray-700 mb-4">שתפו את החוויה שלכם</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="איך היה המשחק עבורכם? מה לקחתם ממנו?"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none resize-none"
            rows={2}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 md:w-auto h-fit"
          >
            {isSubmitting ? 'שולח...' : (
              <>
                <Send className="w-5 h-5" />
                <span>פרסם</span>
              </>
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">עדיין אין תגובות. תהיו הראשונים!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-lg leading-relaxed">{comment.text}</p>
                  <p className="text-sm text-gray-400 mt-2" dir="ltr">
                    {new Date(comment.createdAt).toLocaleDateString('he-IL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
