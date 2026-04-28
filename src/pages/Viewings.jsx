import { useState } from 'react';
import { Plus, Calendar, Clock, Trash2, Edit3, User, Building2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEMO_VIEWINGS, DEMO_LEADS, DEMO_PROPERTIES, VIEWING_STATUSES } from '../data/demoData';
import { formatDate, generateId, isOverdue, daysUntil } from '../utils/helpers';

const EMPTY = {
  leadName: '', propertyTitle: '', date: '', time: '10:00', status: 'Programată', notes: '',
};

export default function Viewings() {
  const [viewings, setViewings] = useLocalStorage('af_viewings', DEMO_VIEWINGS);
  const [leads] = useLocalStorage('af_leads', DEMO_LEADS);
  const [properties] = useLocalStorage('af_properties', DEMO_PROPERTIES);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const filtered = filter ? viewings.filter(v => v.status === filter) : viewings;
  const scheduled = viewings.filter(v => v.status === 'Programată');
  const finished = viewings.filter(v => v.status === 'Finalizată');
  const cancelled = viewings.filter(v => v.status === 'Anulată');

  function openAdd() { setForm({ ...EMPTY, date: new Date().toISOString().split('T')[0] }); setEditId(null); setModalOpen(true); }
  function openEdit(v) { setForm({ ...v }); setEditId(v.id); setModalOpen(true); }

  function handleSave() {
    if (!form.leadName.trim() || !form.date) return alert('Client și dată sunt obligatorii.');
    if (editId) {
      setViewings(viewings.map(v => v.id === editId ? { ...form, id: editId } : v));
    } else {
      setViewings([{ ...form, id: generateId('view') }, ...viewings]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (window.confirm('Ștergi vizionarea?')) setViewings(viewings.filter(v => v.id !== id));
  }

  function updateStatus(id, status) {
    setViewings(viewings.map(v => v.id === id ? { ...v, status } : v));
  }

  function getStatusIcon(status) {
    if (status === 'Finalizată') return <CheckCircle size={15} className="text-emerald-500" />;
    if (status === 'Anulată') return <XCircle size={15} className="text-red-400" />;
    return <Clock size={15} className="text-blue-500" />;
  }

  return (
    <AppLayout title="Vizionări">
      <div className="max-w-6xl space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Programate', count: scheduled.length, color: 'blue', icon: Clock },
            { label: 'Finalizate', count: finished.length, color: 'emerald', icon: CheckCircle },
            { label: 'Anulate', count: cancelled.length, color: 'red', icon: XCircle },
          ].map(({ label, count, color, icon: Icon }) => (
            <div key={label} className={`card text-center cursor-pointer border-2 transition-all ${filter === label.slice(0,-1) + (label === 'Finalizate' ? 'ă' : label === 'Anulate' ? 'ă' : 'ă') ? 'border-navy-900' : 'border-gray-100'}`}
              onClick={() => setFilter(f => f === label ? '' : (label === 'Programate' ? 'Programată' : label === 'Finalizate' ? 'Finalizată' : 'Anulată'))}>
              <Icon size={22} className={`mx-auto mb-2 text-${color}-500`} />
              <p className="font-display font-bold text-2xl text-navy-900">{count}</p>
              <p className="text-xs text-gray-400 font-body">{label}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['', 'Programată', 'Finalizată', 'Anulată'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium font-body border transition-all ${filter === s ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-500 border-gray-200 hover:border-navy-300'}`}>
                {s || 'Toate'}
              </button>
            ))}
          </div>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} /> Adaugă vizionare
          </button>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <Calendar className="mx-auto mb-3 text-gray-300" size={40} />
            <p className="font-display font-bold text-gray-400">Nicio vizionare</p>
            <button onClick={openAdd} className="btn-primary mt-4 mx-auto">Programează vizionare</button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(v => {
              const days = daysUntil(v.date);
              const overdue = v.status === 'Programată' && isOverdue(v.date);
              return (
                <div key={v.id} className={`card-hover flex flex-col sm:flex-row sm:items-center gap-4 ${overdue ? 'border-l-4 border-l-orange-400' : ''}`}>
                  {/* Date box */}
                  <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                    v.status === 'Finalizată' ? 'bg-emerald-50 border border-emerald-200' :
                    v.status === 'Anulată' ? 'bg-gray-100 border border-gray-200' :
                    overdue ? 'bg-orange-50 border border-orange-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    <p className="font-display font-bold text-lg leading-none text-navy-900">
                      {v.date ? new Date(v.date).getDate() : '—'}
                    </p>
                    <p className="text-xs text-gray-400 font-body">
                      {v.date ? new Date(v.date).toLocaleString('ro-RO', { month: 'short' }) : ''}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(v.status)}
                      <span className="font-semibold text-navy-900 font-body">{v.leadName || '—'}</span>
                      <Badge status={v.status} />
                      {overdue && <span className="badge bg-orange-50 text-orange-600">Restantă</span>}
                    </div>
                    <p className="text-sm text-gray-500 font-body flex items-center gap-1">
                      <Building2 size={12} /> {v.propertyTitle || 'Proprietate necunoscută'}
                    </p>
                    {v.notes && <p className="text-xs text-gray-400 font-body mt-1 truncate">{v.notes}</p>}
                  </div>

                  {/* Time + Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-bold text-navy-900 font-body">{v.time || '—'}</p>
                      <p className="text-xs text-gray-400 font-body">{formatDate(v.date)}</p>
                      {v.status === 'Programată' && days !== null && (
                        <p className={`text-xs font-body ${overdue ? 'text-orange-500' : days <= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
                          {overdue ? 'Depășit' : days === 0 ? 'Azi' : days === 1 ? 'Mâine' : `Peste ${days} zile`}
                        </p>
                      )}
                    </div>

                    {v.status === 'Programată' && (
                      <div className="flex flex-col gap-1">
                        <button onClick={() => updateStatus(v.id, 'Finalizată')} className="text-xs px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 font-body transition-colors">
                          Finalizat
                        </button>
                        <button onClick={() => updateStatus(v.id, 'Anulată')} className="text-xs px-2 py-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-body transition-colors">
                          Anulat
                        </button>
                      </div>
                    )}

                    <button onClick={() => openEdit(v)} className="p-2 rounded-lg hover:bg-navy-50 text-gray-400 hover:text-navy-700 transition-colors">
                      <Edit3 size={15} />
                    </button>
                    <button onClick={() => handleDelete(v.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Editează vizionare' : 'Vizionare nouă'} size="md">
        <div className="space-y-4">
          <div>
            <label className="label">Client *</label>
            <input className="input-field" placeholder="Nume client" value={form.leadName}
              onChange={e => setForm(f => ({ ...f, leadName: e.target.value }))} />
          </div>
          <div>
            <label className="label">Proprietate</label>
            <input className="input-field" placeholder="Titlu proprietate" value={form.propertyTitle}
              onChange={e => setForm(f => ({ ...f, propertyTitle: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Dată *</label>
              <input type="date" className="input-field" value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="label">Ora</label>
              <input type="time" className="input-field" value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="label">Status</label>
            <select className="select-field" value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {VIEWING_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Notițe</label>
            <textarea className="textarea-field" rows={2} placeholder="Detalii vizionare..."
              value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">Anulează</button>
          <button onClick={handleSave} className="btn-primary flex-1 justify-center">{editId ? 'Salvează' : 'Adaugă vizionare'}</button>
        </div>
      </Modal>
    </AppLayout>
  );
}
