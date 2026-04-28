import { useState } from 'react';
import { Plus, Search, Filter, Trash2, Edit3, Phone, Mail, MapPin, Wallet } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEMO_LEADS, LEAD_STATUSES, LEAD_SOURCES, LEAD_INTERESTS } from '../data/demoData';
import { formatDate, generateId, getInitials } from '../utils/helpers';

const EMPTY_LEAD = {
  name: '', phone: '', email: '', status: 'Nou', source: 'Website',
  interest: 'Cumpărare', budget: '', currency: 'EUR', location: '', notes: '',
};

export default function CRM() {
  const [leads, setLeads] = useLocalStorage('af_leads', DEMO_LEADS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [form, setForm] = useState(EMPTY_LEAD);

  const filtered = leads.filter(l => {
    const matchSearch = !search || [l.name, l.phone, l.email, l.location].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    );
    const matchStatus = !filterStatus || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function openAdd() {
    setForm(EMPTY_LEAD);
    setEditLead(null);
    setModalOpen(true);
  }

  function openEdit(lead) {
    setForm({ ...lead });
    setEditLead(lead.id);
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.name.trim()) return alert('Numele este obligatoriu.');
    if (editLead) {
      setLeads(leads.map(l => l.id === editLead ? { ...form, id: editLead, updatedAt: new Date().toISOString().split('T')[0] } : l));
    } else {
      setLeads([{ ...form, id: generateId('lead'), createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }, ...leads]);
    }
    setModalOpen(false);
  }

  function handleDelete(id) {
    if (window.confirm('Ștergi acest lead?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  }

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
    <AppLayout title="Leaduri CRM">
      <div className="max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-gray-500 font-body text-sm">{leads.length} leaduri total · {leads.filter(l => l.status === 'Nou').length} noi</p>
          </div>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} /> Adaugă lead
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Caută după nume, telefon, email..."
              className="input-field pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="select-field sm:w-48"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">Toate statusurile</option>
            {LEAD_STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Pipeline pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {['', ...LEAD_STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium font-body border transition-all ${
                filterStatus === s
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-navy-300'
              }`}
            >
              {s || 'Toate'}
              <span className="ml-1.5 opacity-60">({s ? leads.filter(l => l.status === s).length : leads.length})</span>
            </button>
          ))}
        </div>

        {/* Table / Cards */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <Users className="mx-auto mb-3 text-gray-300" size={40} />
            <p className="font-display font-bold text-gray-400 mb-2">Niciun lead găsit</p>
            <p className="text-gray-400 text-sm font-body">Modifică filtrele sau adaugă un lead nou.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(lead => (
              <div key={lead.id} className="card-hover flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Avatar + Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-navy-gradient rounded-full flex items-center justify-center text-white text-sm font-bold font-display flex-shrink-0">
                    {getInitials(lead.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy-900 font-body truncate">{lead.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {lead.phone && <span className="flex items-center gap-1 text-xs text-gray-400 font-body"><Phone size={10} />{lead.phone}</span>}
                      {lead.location && <span className="flex items-center gap-1 text-xs text-gray-400 font-body"><MapPin size={10} />{lead.location}</span>}
                    </div>
                  </div>
                </div>

                {/* Interest + Budget */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-400 font-body">{lead.interest}</p>
                    {lead.budget && (
                      <p className="font-semibold text-navy-900 font-body flex items-center gap-1">
                        <Wallet size={12} className="text-gold-500" />
                        {parseFloat(lead.budget).toLocaleString('ro-RO')} {lead.currency}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-400 font-body mb-0.5">{lead.source}</p>
                    <Badge status={lead.status} />
                  </div>
                </div>

                {/* Date + Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-400 font-body hidden lg:block">{formatDate(lead.updatedAt)}</span>
                  <button onClick={() => openEdit(lead)} className="p-2 rounded-lg hover:bg-navy-50 text-gray-400 hover:text-navy-700 transition-colors">
                    <Edit3 size={15} />
                  </button>
                  <button onClick={() => handleDelete(lead.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editLead ? 'Editează lead' : 'Lead nou'} size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <F label="Nume complet *" name="name" placeholder="Ex: Andrei Popescu" />
          </div>
          <F label="Telefon" name="phone" placeholder="07xx xxx xxx" />
          <F label="Email" name="email" type="email" placeholder="client@email.com" />
          <F label="Status" name="status" as="select" options={LEAD_STATUSES} />
          <F label="Sursă lead" name="source" as="select" options={LEAD_SOURCES} />
          <F label="Tip interes" name="interest" as="select" options={LEAD_INTERESTS} />
          <div className="flex gap-2">
            <div className="flex-1">
              <F label="Buget estimat" name="budget" type="number" placeholder="95000" />
            </div>
            <div className="w-28">
              <F label="Monedă" name="currency" as="select" options={['EUR', 'RON', 'EUR/lună', 'RON/lună']} />
            </div>
          </div>
          <F label="Locație" name="location" placeholder="Ex: București, Floreasca" />
          <div className="sm:col-span-2">
            <F label="Notițe" name="notes" as="textarea" placeholder="Detalii suplimentare despre client..." />
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">Anulează</button>
          <button onClick={handleSave} className="btn-primary flex-1 justify-center">
            {editLead ? 'Salvează modificările' : 'Adaugă lead'}
          </button>
        </div>
      </Modal>
    </AppLayout>
  );
}

function Users({ className, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
