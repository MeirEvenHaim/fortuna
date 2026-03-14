import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Check, X, Users, ShoppingBag, MessageSquare, Star, Plus } from 'lucide-react';

interface Order { id: number; firstName: string; phone: string; email: string; city: string; createdAt: string; }
interface Customer { id: number; firstName: string; lastName: string; phone: string; email: string; city: string; createdAt: string; }
interface Comment { id: number; entityType: string; entityId: number; text: string; createdAt: string; }
interface Feedback { id: number; rating: number; favoriteStage: string; favoriteCard: string; lessConnected: string; wouldRecommend: string; message: string; name: string; phone: string; email: string; createdAt: string; }

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'customers' | 'comments' | 'feedbacks'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState<any>({});

  const fetchData = async () => {
    try {
      const [ordersRes, customersRes, commentsRes, feedbacksRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/customers'),
        fetch('/api/comments'),
        fetch('/api/feedbacks')
      ]);
      
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (customersRes.ok) setCustomers(await customersRes.json());
      if (commentsRes.ok) setComments(await commentsRes.json());
      if (feedbacksRes.ok) setFeedbacks(await feedbacksRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type: string, id: number) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק רשומה זו?')) return;
    
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('שגיאה במחיקה');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (type: string, id: number) => {
    try {
      const res = await fetch(`/api/${type}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setEditingId(null);
        fetchData();
      } else {
        alert('שגיאה בעדכון');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startCreate = () => {
    setIsCreating(true);
    setCreateForm({});
  };

  const cancelCreate = () => {
    setIsCreating(false);
    setCreateForm({});
  };

  const saveCreate = async (type: string) => {
    try {
      const res = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm)
      });
      if (res.ok) {
        setIsCreating(false);
        fetchData();
      } else {
        alert('שגיאה ביצירה. אנא ודא שכל שדות החובה מלאים.');
      }
    } catch (err) {
      console.error(err);
      alert('שגיאה ביצירה');
    }
  };

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={startCreate} className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" /> הוסף הזמנה
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right bg-white rounded-xl shadow-md">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="p-4">מזהה</th>
            <th className="p-4">שם פרטי</th>
            <th className="p-4">טלפון</th>
            <th className="p-4">אימייל</th>
            <th className="p-4">עיר</th>
            <th className="p-4">תאריך</th>
            <th className="p-4">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {isCreating && (
            <tr className="border-t border-gray-100 hover:bg-gray-50 bg-blue-50">
              <td className="p-4 text-gray-400">חדש</td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="שם פרטי" value={createForm.firstName || ''} onChange={e => setCreateForm({...createForm, firstName: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="טלפון" value={createForm.phone || ''} onChange={e => setCreateForm({...createForm, phone: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="אימייל" value={createForm.email || ''} onChange={e => setCreateForm({...createForm, email: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="עיר" value={createForm.city || ''} onChange={e => setCreateForm({...createForm, city: e.target.value})} /></td>
              <td className="p-4">-</td>
              <td className="p-4 flex gap-2">
                <button onClick={() => saveCreate('orders')} className="text-green-600 hover:bg-green-100 p-2 rounded"><Check className="w-5 h-5"/></button>
                <button onClick={cancelCreate} className="text-red-600 hover:bg-red-100 p-2 rounded"><X className="w-5 h-5"/></button>
              </td>
            </tr>
          )}
          {orders.map(o => (
            <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="p-4">{o.id}</td>
              {editingId === o.id ? (
                <>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.firstName || ''} onChange={e => setEditForm({...editForm, firstName: e.target.value})} /></td>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.phone || ''} onChange={e => setEditForm({...editForm, phone: e.target.value})} /></td>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} /></td>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.city || ''} onChange={e => setEditForm({...editForm, city: e.target.value})} /></td>
                </>
              ) : (
                <>
                  <td className="p-4">{o.firstName}</td>
                  <td className="p-4" dir="ltr">{o.phone}</td>
                  <td className="p-4" dir="ltr">{o.email}</td>
                  <td className="p-4">{o.city}</td>
                </>
              )}
              <td className="p-4 text-sm text-gray-500" dir="ltr">{new Date(o.createdAt).toLocaleString('he-IL')}</td>
              <td className="p-4 flex gap-2">
                {editingId === o.id ? (
                  <>
                    <button onClick={() => saveEdit('orders', o.id)} className="text-green-600 hover:bg-green-50 p-2 rounded"><Check className="w-5 h-5"/></button>
                    <button onClick={cancelEdit} className="text-red-600 hover:bg-red-50 p-2 rounded"><X className="w-5 h-5"/></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(o)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit2 className="w-5 h-5"/></button>
                    <button onClick={() => handleDelete('orders', o.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 className="w-5 h-5"/></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={startCreate} className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" /> הוסף לקוח
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right bg-white rounded-xl shadow-md">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="p-4">מזהה</th>
            <th className="p-4">שם פרטי</th>
            <th className="p-4">שם משפחה</th>
            <th className="p-4">טלפון</th>
            <th className="p-4">אימייל</th>
            <th className="p-4">עיר</th>
            <th className="p-4">תאריך</th>
            <th className="p-4">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {isCreating && (
            <tr className="border-t border-gray-100 hover:bg-gray-50 bg-blue-50">
              <td className="p-4 text-gray-400">חדש</td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="שם פרטי" value={createForm.firstName || ''} onChange={e => setCreateForm({...createForm, firstName: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="שם משפחה" value={createForm.lastName || ''} onChange={e => setCreateForm({...createForm, lastName: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="טלפון" value={createForm.phone || ''} onChange={e => setCreateForm({...createForm, phone: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="אימייל" value={createForm.email || ''} onChange={e => setCreateForm({...createForm, email: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="עיר" value={createForm.city || ''} onChange={e => setCreateForm({...createForm, city: e.target.value})} /></td>
              <td className="p-4">-</td>
              <td className="p-4 flex gap-2">
                <button onClick={() => saveCreate('customers')} className="text-green-600 hover:bg-green-100 p-2 rounded"><Check className="w-5 h-5"/></button>
                <button onClick={cancelCreate} className="text-red-600 hover:bg-red-100 p-2 rounded"><X className="w-5 h-5"/></button>
              </td>
            </tr>
          )}
          {customers.map(c => (
            <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="p-4">{c.id}</td>
              {editingId === c.id ? (
                <>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.firstName || ''} onChange={e => setEditForm({...editForm, firstName: e.target.value})} /></td>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.lastName || ''} onChange={e => setEditForm({...editForm, lastName: e.target.value})} /></td>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.phone || ''} onChange={e => setEditForm({...editForm, phone: e.target.value})} /></td>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} /></td>
                  <td className="p-4"><input className="border p-1 w-full" value={editForm.city || ''} onChange={e => setEditForm({...editForm, city: e.target.value})} /></td>
                </>
              ) : (
                <>
                  <td className="p-4">{c.firstName}</td>
                  <td className="p-4">{c.lastName}</td>
                  <td className="p-4" dir="ltr">{c.phone}</td>
                  <td className="p-4" dir="ltr">{c.email}</td>
                  <td className="p-4">{c.city}</td>
                </>
              )}
              <td className="p-4 text-sm text-gray-500" dir="ltr">{new Date(c.createdAt).toLocaleString('he-IL')}</td>
              <td className="p-4 flex gap-2">
                {editingId === c.id ? (
                  <>
                    <button onClick={() => saveEdit('customers', c.id)} className="text-green-600 hover:bg-green-50 p-2 rounded"><Check className="w-5 h-5"/></button>
                    <button onClick={cancelEdit} className="text-red-600 hover:bg-red-50 p-2 rounded"><X className="w-5 h-5"/></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(c)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit2 className="w-5 h-5"/></button>
                    <button onClick={() => handleDelete('customers', c.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 className="w-5 h-5"/></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

  const renderComments = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={startCreate} className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" /> הוסף תגובה
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right bg-white rounded-xl shadow-md">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="p-4">מזהה</th>
            <th className="p-4">סוג ישות</th>
            <th className="p-4">מזהה ישות</th>
            <th className="p-4">תוכן</th>
            <th className="p-4">תאריך</th>
            <th className="p-4">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {isCreating && (
            <tr className="border-t border-gray-100 hover:bg-gray-50 bg-blue-50">
              <td className="p-4 text-gray-400">חדש</td>
              <td className="p-4"><input className="border p-1 w-full" placeholder="סוג: order / customer" value={createForm.entityType || ''} onChange={e => setCreateForm({...createForm, entityType: e.target.value})} /></td>
              <td className="p-4"><input className="border p-1 w-full" type="number" placeholder="מזהה ישות או 0" value={createForm.entityId || ''} onChange={e => setCreateForm({...createForm, entityId: parseInt(e.target.value)})} /></td>
              <td className="p-4"><textarea className="border p-1 w-full" placeholder="תוכן התגובה" rows={2} value={createForm.text || ''} onChange={e => setCreateForm({...createForm, text: e.target.value})} /></td>
              <td className="p-4">-</td>
              <td className="p-4 flex gap-2">
                <button onClick={() => saveCreate('comments')} className="text-green-600 hover:bg-green-100 p-2 rounded"><Check className="w-5 h-5"/></button>
                <button onClick={cancelCreate} className="text-red-600 hover:bg-red-100 p-2 rounded"><X className="w-5 h-5"/></button>
              </td>
            </tr>
          )}
          {comments.map(c => (
            <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="p-4">{c.id}</td>
              <td className="p-4">{c.entityType}</td>
              <td className="p-4">{c.entityId}</td>
              {editingId === c.id ? (
                <td className="p-4"><textarea className="border p-1 w-full" value={editForm.text || ''} onChange={e => setEditForm({...editForm, text: e.target.value})} rows={2} /></td>
              ) : (
                <td className="p-4 max-w-xs">{c.text}</td>
              )}
              <td className="p-4 text-sm text-gray-500" dir="ltr">{new Date(c.createdAt).toLocaleString('he-IL')}</td>
              <td className="p-4 flex gap-2">
                {editingId === c.id ? (
                  <>
                    <button onClick={() => saveEdit('comments', c.id)} className="text-green-600 hover:bg-green-50 p-2 rounded"><Check className="w-5 h-5"/></button>
                    <button onClick={cancelEdit} className="text-red-600 hover:bg-red-50 p-2 rounded"><X className="w-5 h-5"/></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(c)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit2 className="w-5 h-5"/></button>
                    <button onClick={() => handleDelete('comments', c.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 className="w-5 h-5"/></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

  const renderFeedbacks = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={startCreate} className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" /> הוסף משוב
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right bg-white rounded-xl shadow-md text-sm">
        <thead className="bg-gray-50 text-gray-700 whitespace-nowrap">
          <tr>
            <th className="p-4">מזהה</th>
            <th className="p-4">פרטים אישיים</th>
            <th className="p-4">דירוג (1-10)</th>
            <th className="p-4 min-w-[150px]">שלב אהוב</th>
            <th className="p-4 min-w-[150px]">קלף אהוב</th>
            <th className="p-4 min-w-[200px]">פחות התחבר/ה (אופציונלי)</th>
            <th className="p-4">המלצה</th>
            <th className="p-4 min-w-[200px]">מסר</th>
            <th className="p-4">תאריך</th>
            <th className="p-4">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {isCreating && (
            <tr className="border-t border-gray-100 hover:bg-gray-50 bg-blue-50">
              <td className="p-4 text-gray-400">חדש</td>
              <td className="p-4">
                <input className="border p-1 w-full mb-1 text-xs" placeholder="שם" value={createForm.name || ''} onChange={e => setCreateForm({...createForm, name: e.target.value})} />
                <input className="border p-1 w-full mb-1 text-xs" placeholder="טלפון" value={createForm.phone || ''} onChange={e => setCreateForm({...createForm, phone: e.target.value})} />
                <input className="border p-1 w-full text-xs" placeholder="אימייל" value={createForm.email || ''} onChange={e => setCreateForm({...createForm, email: e.target.value})} />
              </td>
              <td className="p-2"><input type="number" min="1" max="10" placeholder="1-10" className="border p-1 w-full" value={createForm.rating || ''} onChange={e => setCreateForm({...createForm, rating: parseInt(e.target.value)})} /></td>
              <td className="p-2"><input className="border p-1 w-full text-xs" placeholder="שלב אהוב" value={createForm.favoriteStage || ''} onChange={e => setCreateForm({...createForm, favoriteStage: e.target.value})} /></td>
              <td className="p-2"><input className="border p-1 w-full text-xs" placeholder="קלף אהוב" value={createForm.favoriteCard || ''} onChange={e => setCreateForm({...createForm, favoriteCard: e.target.value})} /></td>
              <td className="p-2"><textarea className="border p-1 w-full text-xs" placeholder="פחות התחבר..." rows={2} value={createForm.lessConnected || ''} onChange={e => setCreateForm({...createForm, lessConnected: e.target.value})} /></td>
              <td className="p-2">
                <select className="border p-1 w-full text-xs" value={createForm.wouldRecommend || ''} onChange={e => setCreateForm({...createForm, wouldRecommend: e.target.value})}>
                  <option value="">בחר</option>
                  <option value="yes">כן</option>
                  <option value="no">לא</option>
                </select>
              </td>
              <td className="p-2"><textarea className="border p-1 w-full text-xs" placeholder="מסר" rows={2} value={createForm.message || ''} onChange={e => setCreateForm({...createForm, message: e.target.value})} /></td>
              <td className="p-4">-</td>
              <td className="p-4 flex gap-2">
                <button onClick={() => saveCreate('feedbacks')} className="text-green-600 hover:bg-green-100 p-1 rounded"><Check className="w-5 h-5"/></button>
                <button onClick={cancelCreate} className="text-red-600 hover:bg-red-100 p-1 rounded"><X className="w-5 h-5"/></button>
              </td>
            </tr>
          )}
          {feedbacks.map(f => (
            <tr key={f.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="p-4">{f.id}</td>
              <td className="p-4 max-w-[150px] truncate text-xs">
                {f.name && <div>{f.name}</div>}
                {f.phone && <div dir="ltr" className="text-gray-500">{f.phone}</div>}
                {f.email && <div dir="ltr" className="text-gray-500">{f.email}</div>}
                {!f.name && !f.phone && !f.email && <span className="text-gray-400">אנונימי</span>}
              </td>
              {editingId === f.id ? (
                <>
                  <td className="p-2"><input type="number" min="1" max="10" className="border p-1 w-16" value={editForm.rating || ''} onChange={e => setEditForm({...editForm, rating: parseInt(e.target.value)})} /></td>
                  <td className="p-2"><input className="border p-1 w-full min-w-[100px]" value={editForm.favoriteStage || ''} onChange={e => setEditForm({...editForm, favoriteStage: e.target.value})} /></td>
                  <td className="p-2"><input className="border p-1 w-full min-w-[100px]" value={editForm.favoriteCard || ''} onChange={e => setEditForm({...editForm, favoriteCard: e.target.value})} /></td>
                  <td className="p-2"><textarea className="border p-1 w-full text-xs" rows={2} value={editForm.lessConnected || ''} onChange={e => setEditForm({...editForm, lessConnected: e.target.value})} /></td>
                  <td className="p-2">
                    <select className="border p-1 w-full" value={editForm.wouldRecommend || ''} onChange={e => setEditForm({...editForm, wouldRecommend: e.target.value})}>
                      <option value="yes">כן</option>
                      <option value="no">לא</option>
                    </select>
                  </td>
                  <td className="p-2"><textarea className="border p-1 w-full text-xs" rows={2} value={editForm.message || ''} onChange={e => setEditForm({...editForm, message: e.target.value})} /></td>
                </>
              ) : (
                <>
                  <td className="p-4 font-bold text-center">{f.rating}</td>
                  <td className="p-4 truncate max-w-[150px] hover:text-clip hover:overflow-visible relative" title={f.favoriteStage}>{f.favoriteStage}</td>
                  <td className="p-4 truncate max-w-[150px]" title={f.favoriteCard}>{f.favoriteCard}</td>
                  <td className="p-4 text-xs whitespace-normal max-w-[200px]">{f.lessConnected || '-'}</td>
                  <td className="p-4 text-center">{f.wouldRecommend === 'yes' ? 'כן' : 'לא'}</td>
                  <td className="p-4 text-xs whitespace-normal max-w-[200px]">{f.message}</td>
                </>
              )}
              <td className="p-4 text-xs text-gray-500 whitespace-nowrap" dir="ltr">{new Date(f.createdAt).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' })}</td>
              <td className="p-4 flex gap-2">
                {editingId === f.id ? (
                  <>
                    <button onClick={() => saveEdit('feedbacks', f.id)} className="text-green-600 hover:bg-green-50 p-1 rounded"><Check className="w-5 h-5"/></button>
                    <button onClick={cancelEdit} className="text-red-600 hover:bg-red-50 p-1 rounded"><X className="w-5 h-5"/></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(f)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit2 className="w-4 h-4"/></button>
                    <button onClick={() => handleDelete('feedbacks', f.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">פאנל ניהול</h1>
          <p className="text-gray-600">ניהול הזמנות, לקוחות ותגובות</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'orders' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            <ShoppingBag className="w-5 h-5" /> הזמנות ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'customers' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            <Users className="w-5 h-5" /> לקוחות ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'comments' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" /> תגובות למוצר ({comments.length})
          </button>
          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'feedbacks' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            <Star className="w-5 h-5" /> משובים ({feedbacks.length})
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'comments' && renderComments()}
          {activeTab === 'feedbacks' && renderFeedbacks()}
        </div>
      </div>
    </div>
  );
}
