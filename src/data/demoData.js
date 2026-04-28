export const LEAD_STATUSES = ['Nou', 'Contactat', 'Vizionare', 'Negociere', 'Închis', 'Pierdut'];
export const LEAD_SOURCES = ['Website', 'Facebook', 'OLX', 'Imobiliare.ro', 'Recomandare', 'Telefon'];
export const LEAD_INTERESTS = ['Cumpărare', 'Închiriere', 'Vânzare'];
export const PROPERTY_TYPES = ['Apartament', 'Casă', 'Teren', 'Spațiu comercial'];
export const PROPERTY_STATUSES = ['Activă', 'Rezervată', 'Vândută', 'Închiriată'];
export const VIEWING_STATUSES = ['Programată', 'Finalizată', 'Anulată'];

export const STATUS_COLORS = {
  'Nou': 'bg-blue-100 text-blue-700',
  'Contactat': 'bg-amber-100 text-amber-700',
  'Vizionare': 'bg-purple-100 text-purple-700',
  'Negociere': 'bg-orange-100 text-orange-700',
  'Închis': 'bg-emerald-100 text-emerald-700',
  'Pierdut': 'bg-gray-100 text-gray-700',
  'Activă': 'bg-emerald-100 text-emerald-700',
  'Rezervată': 'bg-amber-100 text-amber-700',
  'Vândută': 'bg-blue-100 text-blue-700',
  'Închiriată': 'bg-purple-100 text-purple-700',
  'Programată': 'bg-blue-100 text-blue-700',
  'Finalizată': 'bg-emerald-100 text-emerald-700',
  'Anulată': 'bg-red-100 text-red-700',
};

export const DEMO_LEADS = [
  { id: 'l1', name: 'Andrei Popescu', phone: '0722123456', email: 'andrei@demo.ro', status: 'Nou', source: 'Website', interest: 'Cumpărare', budget: '95000', currency: 'EUR', location: 'București', notes: 'Caută apartament 2 camere.', updatedAt: '2024-05-10' },
  { id: 'l2', name: 'Ioana Marinescu', phone: '0733987654', email: 'ioana@demo.ro', status: 'Vizionare', source: 'Facebook', interest: 'Închiriere', budget: '450', currency: 'EUR/lună', location: 'Cluj-Napoca', notes: 'Garsonieră centrală.', updatedAt: '2024-05-09' },
  { id: 'l3', name: 'Radu Ionescu', phone: '0744111222', email: 'radu@demo.ro', status: 'Contactat', source: 'Recomandare', interest: 'Vânzare', budget: '185000', currency: 'EUR', location: 'Brașov', notes: 'Vinde casă Stupini.', updatedAt: '2024-05-08' }
];

export const DEMO_PROPERTIES = [
  { id: 'p1', title: 'Apartament 2 camere Tineretului', type: 'Apartament', city: 'București', zone: 'Tineretului', address: 'Str. Piscului', price: '92000', currency: 'EUR', surface: '58', rooms: '2', floor: '4/8', commission: '2', status: 'Activă' },
  { id: 'p2', title: 'Casă individuală Stupini', type: 'Casă', city: 'Brașov', zone: 'Stupini', address: 'Str. Lânii', price: '185000', currency: 'EUR', surface: '120', rooms: '4', floor: 'P+1', commission: '3', status: 'Activă' },
  { id: 'p3', title: 'Garsonieră modernă Mărăști', type: 'Apartament', city: 'Cluj-Napoca', zone: 'Mărăști', address: 'Bd. 21 Decembrie', price: '450', currency: 'EUR/lună', surface: '35', rooms: '1', floor: '2/4', commission: '50', status: 'Închiriată' }
];

export const DEMO_VIEWINGS = [
  { id: 'v1', leadName: 'Andrei Popescu', propertyTitle: 'Apartament 2 camere Tineretului', date: new Date().toISOString().split('T')[0], time: '14:00', status: 'Programată', notes: 'Confirmare telefonică necesară.' }
];

export const DEMO_FOLLOWUPS = [
  { id: 'f1', type: 'whatsapp', leadName: 'Ioana Marinescu', task: 'Confirmare buget final', dueDate: new Date().toISOString().split('T')[0], status: 'nefinalizat', priority: 'ridicată' }
];

export const WHATSAPP_TEMPLATES = [
  { id: 'wt1', name: 'Confirmare Vizionare', text: 'Bună ziua, vă contactez în legătură cu proprietatea discutată. Doriți să programăm o vizionare în această săptămână?' }
];

export const EMAIL_TEMPLATES = [
  { id: 'et1', name: 'Detalii Proprietate', subject: 'Detalii proprietate AgentFlow', text: 'Bună ziua, vă mulțumesc pentru interes. Vă trimit detaliile proprietății și rămân disponibil pentru stabilirea unei vizionări.' }
];