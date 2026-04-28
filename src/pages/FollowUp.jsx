import { useState } from 'react';
import { Plus, Copy, CheckCircle, Clock, Trash2, Edit3, MessageCircle, Mail, Phone, AlertTriangle } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Modal from '../components/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEMO_FOLLOWUPS, WHATSAPP_TEMPLATES, EMAIL_TEMPLATES } from '../data/demoData';
import { formatDate, generateId, isOverdue } from '../utils/helpers';

const EMPTY = {
  type: 'whatsapp', leadName: '', leadPhone: '', task: '', dueDate: '', status: 'nefinalizat', priority: 'medie', template: '',
};

const TYPE_ICONS = {
  whatsapp: { icon: MessageCircle, label: 'WhatsApp', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  email: { icon: Mail, label: 'Email', color: 'text-blue-600', bg: 'bg-blue-50' },
  telefon: { icon: Phone, label: 'Telefon', color: 'text-purple-600', bg: 'bg-purple-50' },
};

const PRIORITY_COLORS = {
  ridicată: 'badge bg-red-50 text-red-600',
  medie: 'badge bg-amber-50 text-amber-600',
  scăzută: 'badge bg-gray-100 text-gray-500',
};

export default function FollowUp() {
  const [followups, setFollowups] = useLocalStorage('af_followups', DEMO_FOLLOWUPS);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [copiedId, setCopiedId] = useState(null);

  const filtered = filter
    ? followups.filter(f => filter === 'restante' ? f.status === 'nefinalizat' && isOverdue(f.dueDate) : f.status === filter)
    : followups;

  const pending = followups.filter(f => f.status === 'nefinalizat').length;
  const overdue = followups.filter(f => f.status === 'nefinalizat' && isOverdue(f.dueDate)).length;

  function openAdd() { setForm({ ...EMPTY, dueDate: new Date().toISOString().split('T')[0] }); setEditId(null); setModalOpen(true); }
  function openEdit(f) { setForm({ ...f }); setEditId(f.id); setModalOpen(true); }

  function handleSave() {
    if (!form.task.trim() || !form.leadName.trim()) return alert('Sarcina și clientul sunt obligatorii.');
    if (editId) {
      setFollowups(followups.map(f => f.id === editId ? { ...form, id: editId } : f));
    } else {
      setFollowups([{ ...form, id: generateId('fu') }, ...followups]);
    }
    setModalOpen(false);
  }

  function toggleDone(id) {
    setFollowups(followups.map(f => f.id === id ? { ...f, status: f.status === 'finalizat' ? 'nefinalizat' : 'finalizat' } : f));
  }

  function handleDelete(id) {
    if (window.confirm('Ștergi follow-up-ul?')) setFollowups(followups.filter(f => f.id !== id));
  }

  function copyTemplate(text, id) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <AppLayout title="Follow-up">
      <div className="max-w-6xl space-y-6">
        {/* Stats */}
        {overdue > 0 && (
          <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
            <AlertTriangle size={20} className="text-orange-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-orange-800 font-body text-sm">
                {overdue} follow-up{overdue > 1 ? '-uri restante' : ' restant'} — acționează acum!
              </p>
              <p className="text-xs text-orange-600 font-body">Nu lăsa clienții să aștepte prea mult.</p>
            </div>
            <button onClick={() => setFilter('restante')} className="ml-auto text-xs font-semibold text-orange-600 hover:text-orange-800 font-body">
              Vezi restantele →
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { key: '', label: 'Toate', count: followups.length },
              { key: 'nefinalizat', label: 'Nerezolvate', count: pending },
              { key: 'restante', label: '⚡ Restante', count: overdue },
              { key: 'finalizat', label: 'Rezolvate', count: followups.length - pending },
            ].map(({ key, label, count }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium font-body border transition-all ${filter === key ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-500 border-gray-200 hover:border-navy-300'}`}>
                {label} <span className="opacity-60">({count})</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTemplateModal(true)} className="btn-outline">
              <MessageCircle size={15} /> Template-uri
            </button>
            <button onClick={openAdd} className="btn-primary">
              <Plus size={16} /> Follow-up nou
            </button>
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <CheckCircle size={40} className="mx-auto mb-3 text-emerald-300" />
            <p className="font-display font-bold text-gray-400 mb-1">Totul la zi!</p>
            <p className="text-sm text-gray-400 font-body">Niciun follow-up de gestionat.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(fu => {
              const typeInfo = TYPE_ICONS[fu.type] || TYPE_ICONS.telefon;
              const Icon = typeInfo.icon;
              const done = fu.status === 'finalizat';
              const overdueFu = !done && isOverdue(fu.dueDate);

              return (
                <div key={fu.id} className={`card flex flex-col sm:flex-row sm:items-center gap-4 transition-all ${done ? 'opacity-60' : ''} ${overdueFu ? 'border-l-4 border-l-orange-400' : ''}`}>
                  {/* Checkbox */}
                  <button onClick={() => toggleDone(fu.id)} className="flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'}`}>
                      {done && <CheckCircle size={14} className="text-white" />}
                    </div>
                  </button>

                  {/* Type icon */}
                  <div className={`w-10 h-10 ${typeInfo.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={typeInfo.color} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className={`font-semibold text-navy-900 font-body ${done ? 'line-through' : ''}`}>{fu.task}</p>
                      <span className={PRIORITY_COLORS[fu.priority]}>{fu.priority}</span>
                      {overdueFu && <span className="badge bg-orange-50 text-orange-600">Restant</span>}
                    </div>
                    <p className="text-sm text-gray-500 font-body">
                      {fu.leadName} · {typeInfo.label}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right mr-2">
                      <p className="text-xs text-gray-400 font-body flex items-center gap-1">
                        <Clock size={10} /> {formatDate(fu.dueDate)}
                      </p>
                    </div>

                    {fu.template && (
                      <button
                        onClick={() => copyTemplate(fu.template, fu.id)}
                        className={`p-2 rounded-lg transition-colors ${copiedId === fu.id ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100 text-gray-400 hover:text-navy-700'}`}
                        title="Copiază mesaj"
                      >
                        {copiedId === fu.id ? <CheckCircle size={15} /> : <Copy size={15} />}
                      </button>
                    )}
                    <button onClick={() => openEdit(fu)} className="p-2 rounded-lg hover:bg-navy-50 text-gray-400 hover:text-navy-700 transition-colors">
                      <Edit3 size={15} />
                    </button>
                    <button onClick={() => handleDelete(fu.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Editează follow-up' : 'Follow-up nou'} size="md">
        <div className="space-y-4">
          <div>
            <label className="label">Client *</label>
            <input className="input-field" placeholder="Nume client" value={form.leadName} onChange={e => setForm(f => ({ ...f, leadName: e.target.value }))} />
          </div>
          <div>
            <label className="label">Sarcina *</label>
            <input className="input-field" placeholder="Descrie sarcina de follow-up" value={form.task} onChange={e => setForm(f => ({ ...f, task: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Canal</label>
              <select className="select-field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="telefon">Telefon</option>
              </select>
            </div>
            <div>
              <label className="label">Prioritate</label>
              <select className="select-field" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                <option value="ridicată">Ridicată</option>
                <option value="medie">Medie</option>
                <option value="scăzută">Scăzută</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Scadentă</label>
              <input type="date" className="input-field" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
            </div>
            <div>
              <label className="label">Telefon client</label>
              <input className="input-field" placeholder="07xx..." value={form.leadPhone} onChange={e => setForm(f => ({ ...f, leadPhone: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="label">Template mesaj (opțional)</label>
            <textarea className="textarea-field" rows={4} placeholder="Mesajul de trimis clientului..."
              value={form.template} onChange={e => setForm(f => ({ ...f, template: e.target.value }))} />
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">Anulează</button>
          <button onClick={handleSave} className="btn-primary flex-1 justify-center">{editId ? 'Salvează' : 'Adaugă'}</button>
        </div>
      </Modal>

      {/* Templates Modal */}
      <Modal open={templateModal} onClose={() => setTemplateModal(false)} title="Template-uri mesaje" size="lg">
        <div className="space-y-6">
          {/* WhatsApp */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={16} className="text-emerald-500" />
              <h4 className="font-display font-bold text-navy-900">Template-uri WhatsApp</h4>
            </div>
            <div className="space-y-3">
              {WHATSAPP_TEMPLATES.map(t => (
                <div key={t.id} className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <p className="font-semibold text-emerald-800 text-sm font-body mb-2">{t.name}</p>
                  <p className="text-sm text-gray-600 font-body leading-relaxed whitespace-pre-line">{t.text}</p>
                  <button
                    onClick={() => copyTemplate(t.text, t.id)}
                    className={`mt-3 flex items-center gap-1.5 text-xs font-semibold font-body transition-colors ${copiedId === t.id ? 'text-emerald-700' : 'text-emerald-600 hover:text-emerald-800'}`}
                  >
                    {copiedId === t.id ? <><CheckCircle size={12} /> Copiat!</> : <><Copy size={12} /> Copiază mesaj</>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} className="text-blue-500" />
              <h4 className="font-display font-bold text-navy-900">Template-uri Email</h4>
            </div>
            <div className="space-y-3">
              {EMAIL_TEMPLATES.map(t => (
                <div key={t.id} className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="font-semibold text-blue-800 text-sm font-body mb-1">{t.name}</p>
                  <p className="text-xs text-blue-600 font-body mb-2">Subiect: {t.subject}</p>
                  <p className="text-sm text-gray-600 font-body leading-relaxed whitespace-pre-line">{t.text}</p>
                  <button
                    onClick={() => copyTemplate(t.text, t.id)}
                    className={`mt-3 flex items-center gap-1.5 text-xs font-semibold font-body transition-colors ${copiedId === t.id ? 'text-blue-700' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    {copiedId === t.id ? <><CheckCircle size={12} /> Copiat!</> : <><Copy size={12} /> Copiază mesaj</>}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
