import { useState } from 'react';
import { Plus, Search, Building2, Trash2, Edit3, MapPin, Ruler, Tag, Sparkles } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEMO_PROPERTIES, PROPERTY_TYPES, PROPERTY_STATUSES } from '../data/demoData';
import { formatCurrency, generateId, calculateCommission, generateAIDescription } from '../utils/helpers';

const EMPTY_PROP = {
  title: '', type: 'Apartament', city: '', zone: '', address: '',
  price: '', currency: 'EUR', surface: '', rooms: '', floor: '',
  commission: '2', status: 'Activă', description: '', features: [],
};

export default function Properties() {
  const [properties, setProperties] = useLocalStorage('af_properties', DEMO_PROPERTIES);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_PROP);
  const [aiModal, setAiModal] = useState(false);
  const [aiProp, setAiProp] = useState(null);
  const [aiTone, setAiTone] = useState('Premium');
  const [aiText, setAiText] = useState('');

  const filtered = properties.filter(p => {
    const matchSearch = !search || [p.title, p.city, p.zone, p.address].some(v => v?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = !filterStatus || p.status === filterStatus;
    const matchType = !filterType || p.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  function openAdd() { setForm(EMPTY_PROP); setEditId(null); setModalOpen(true); }
  function openEdit(p) { setForm({ ...p, features: p.features || [] }); setEditId(p.id); setModalOpen(true); }

  function handleSave() {
    if (!form.title.trim() || !form.city.trim()) return alert('Titlu și oraș sunt obligatorii.');
    const comm = calculateCommission(form.price, form.commission);
    if (editId) {
      setProperties(properties.map(p => p.id === editId ? { ...form, id: editId, commissionEst: comm.total } : p));
    } else {
      setProperties([{ ...form, id: generateId('prop'), commissionEst: comm.total, createdAt: new Date().toISOString().split('T')[0] }, ...properties]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (window.confirm('Ștergi proprietatea?')) setProperties(properties.filter(p => p.id !== id));
  }

  function openAI(prop) {
    setAiProp(prop);
    setAiText(generateAIDescription(prop, aiTone));
    setAiModal(true);
  }

  function regenerateAI() {
    setAiText(generateAIDescription(aiProp, aiTone));
  }

  const statusColors = { 'Activă': 'emerald', 'Rezervată': 'amber', 'Vândută': 'blue', 'Închiriată': 'purple' };

  const F = ({ label, name, type = 'text', as, options, ...rest }) => (
    <div>
      <label className="label">{label}</label>
      {as === 'select' ? (
        <select className="select-field" value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} {...rest}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : as === 'textarea' ? (
        <textarea className="textarea-field" rows={3} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} {...rest} />
      ) : (
        <input type={type} className="input-field" value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} {...rest} />
      )}
    </div>
  );

  return (
    <AppLayout title="Proprietăți">
      <div className="max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-gray-500 font-body text-sm">
            {properties.length} proprietăți · {properties.filter(p => p.status === 'Activă').length} active
          </p>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} /> Adaugă proprietate
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Caută după titlu, oraș, zonă..." className="input-field pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="select-field sm:w-40" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">Toate tipurile</option>
            {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="select-field sm:w-40" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">Toate statusurile</option>
            {PROPERTY_STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <Building2 className="mx-auto mb-3 text-gray-300" size={40} />
            <p className="font-display font-bold text-gray-400 mb-2">Nicio proprietate găsită</p>
            <button onClick={openAdd} className="btn-primary mt-4 mx-auto">Adaugă prima proprietate</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(prop => {
              const comm = calculateCommission(prop.price, prop.commission);
              return (
                <div key={prop.id} className="card-hover flex flex-col">
                  {/* Type badge + status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge bg-navy-50 text-navy-700">{prop.type}</span>
                    <Badge status={prop.status} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-navy-900 text-base mb-1 leading-snug">{prop.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-body mb-3">
                    <MapPin size={11} />
                    {prop.zone ? `${prop.zone}, ` : ''}{prop.city}
                  </div>

                  {/* Details row */}
                  <div className="flex gap-3 text-sm mb-4">
                    {prop.surface && (
                      <span className="flex items-center gap-1 text-gray-500 font-body">
                        <Ruler size={12} className="text-gray-400" />{prop.surface} mp
                      </span>
                    )}
                    {prop.rooms && prop.rooms !== '—' && (
                      <span className="text-gray-500 font-body">{prop.rooms} camere</span>
                    )}
                    {prop.floor && (
                      <span className="text-gray-500 font-body">Et. {prop.floor}</span>
                    )}
                  </div>

                  {/* Price + Commission */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 font-body">Preț listat</p>
                        <p className="font-display font-bold text-navy-900 text-lg leading-none">
                          {parseFloat(prop.price || 0).toLocaleString('ro-RO')} {prop.currency}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-body">Comision ({prop.commission}%)</p>
                        <p className="font-semibold text-gold-600 font-body">≈ {comm.total.toLocaleString('ro-RO')} {prop.currency.replace('/lună', '')}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openAI(prop)} className="btn-outline flex-1 justify-center text-xs py-2">
                        <Sparkles size={13} /> Descriere AI
                      </button>
                      <button onClick={() => openEdit(prop)} className="p-2 rounded-lg hover:bg-navy-50 text-gray-400 hover:text-navy-700 transition-colors">
                        <Edit3 size={15} />
                      </button>
                      <button onClick={() => handleDelete(prop.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Editează proprietate' : 'Proprietate nouă'} size="xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><F label="Titlu anunț *" name="title" placeholder="Ex: Apartament 2 camere – Tineretului" /></div>
          <F label="Tip" name="type" as="select" options={PROPERTY_TYPES} />
          <F label="Status" name="status" as="select" options={PROPERTY_STATUSES} />
          <F label="Oraș *" name="city" placeholder="Ex: București" />
          <F label="Zonă" name="zone" placeholder="Ex: Tineretului" />
          <F label="Adresă" name="address" placeholder="Stradă, număr" />
          <div className="flex gap-2">
            <div className="flex-1"><F label="Preț *" name="price" type="number" placeholder="92000" /></div>
            <div className="w-32"><F label="Monedă" name="currency" as="select" options={['EUR', 'RON', 'EUR/lună', 'RON/lună']} /></div>
          </div>
          <F label="Suprafață (mp)" name="surface" type="number" placeholder="58" />
          <F label="Număr camere" name="rooms" placeholder="2" />
          <F label="Etaj / Regim" name="floor" placeholder="Ex: 4/8 sau P+1" />
          <F label="Comision (%)" name="commission" type="number" placeholder="2" />
          <div className="sm:col-span-2"><F label="Descriere" name="description" as="textarea" placeholder="Descrierea proprietății..." /></div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">Anulează</button>
          <button onClick={handleSave} className="btn-primary flex-1 justify-center">
            {editId ? 'Salvează' : 'Adaugă proprietate'}
          </button>
        </div>
      </Modal>

      {/* AI Modal */}
      <Modal open={aiModal} onClose={() => setAiModal(false)} title="Generare descriere AI" size="lg">
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 font-body">
              ⚠️ Simulare locală — nu este AI real conectat la server. Editați textul înainte de publicare.
            </p>
          </div>

          <div>
            <label className="label">Ton descriere</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Premium', 'Emoțional', 'Investițional', 'Minimalist'].map(t => (
                <button
                  key={t}
                  onClick={() => { setAiTone(t); setAiText(generateAIDescription(aiProp, t)); }}
                  className={`py-2 px-3 rounded-xl text-sm font-medium font-body border transition-all ${
                    aiTone === t ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-200 hover:border-navy-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Descriere generată</label>
            <textarea
              className="textarea-field"
              rows={10}
              value={aiText}
              onChange={e => setAiText(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button onClick={regenerateAI} className="btn-outline flex-1 justify-center">
              <Sparkles size={14} /> Regenerează
            </button>
            <button
              onClick={() => { navigator.clipboard.writeText(aiText); alert('Copiat în clipboard!'); }}
              className="btn-primary flex-1 justify-center"
            >
              Copiază descrierea
            </button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
