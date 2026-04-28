export const generateId = (prefix) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  return d.toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

export const calculateCommission = (price, percentage) => {
  const p = parseFloat(price) || 0;
  const pct = parseFloat(percentage) || 0;
  return { total: (p * pct) / 100 };
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateString);
  return d < today;
};

export const daysUntil = (dateString) => {
  if (!dateString) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateString);
  const diffTime = d - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const generateAIDescription = (prop, tone) => {
  if (!prop) return 'Selectați o proprietate pentru a genera descrierea.';
  const intro = tone === 'Premium' ? 'O oportunitate excepțională de a achiziționa un imobil deosebit.' :
                tone === 'Emoțional' ? 'Descoperiți locul perfect pe care îl puteți numi acasă.' :
                tone === 'Investițional' ? 'Randament excelent garantat într-o zonă cu cerere ridicată.' :
                'Proprietate disponibilă imediat. Spațiu optimizat.';
  
  return `${intro}\n\nVă propunem spre atenție acest ${prop.type.toLowerCase()} situat în ${prop.city}, zona ${prop.zone}. Oferind o suprafață de ${prop.surface} mp și ${prop.rooms} camere, imobilul se prezintă în condiții excelente.\n\nPreț: ${prop.price} ${prop.currency}\nPentru detalii suplimentare, vă stau la dispoziție.`;
};
export const formatCurrency = (value, currency = '') => {
  const num = parseFloat(value);
  if (isNaN(num)) return `0 ${currency}`.trim();
  return `${num.toLocaleString('ro-RO')} ${currency}`.trim();
};