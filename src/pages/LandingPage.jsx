import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, Users, Building2, Calendar,
  Bell, DollarSign, Sparkles, MessageSquare, CheckCircle2,
  Star, ChevronRight, Shield, Zap, BarChart3, Phone
} from 'lucide-react';

const FEATURES = [
  { icon: Users, title: 'CRM Leaduri', desc: 'Urmărește fiecare lead de la primul contact până la semnarea contractului. Nimic nu se pierde.' },
  { icon: Building2, title: 'Proprietăți', desc: 'Organizează portofoliul tău: tip, preț, zonă, status, comision estimat. Tot într-un singur loc.' },
  { icon: Calendar, title: 'Vizionări', desc: 'Programează vizionări, primește remindere vizuale și păstrează istoricul complet.' },
  { icon: Bell, title: 'Follow-up', desc: 'Nu mai uita de niciun client. Template-uri WhatsApp și email gata de trimis în 10 secunde.' },
  { icon: DollarSign, title: 'Comisioane', desc: 'Calculator transparent: preț, procent, TVA, câștig net. Știi exact ce câștigi din fiecare tranzacție.' },
  { icon: Sparkles, title: 'Anunțuri AI', desc: 'Generează descrieri profesionale pentru orice proprietate în 4 tonuri diferite. Editezi și publici.' },
];

const TESTIMONIALS = [
  {
    name: 'Alexandru Preda',
    role: 'Agent imobiliar, București',
    rating: 5,
    text: 'Am renunțat complet la Excel și notițele din telefon. Acum știu exact unde e fiecare client și ce urmează.',
  },
  {
    name: 'Cristina Moga',
    role: 'Broker senior, Cluj-Napoca',
    rating: 5,
    text: 'Follow-up-urile automate și template-urile WhatsApp mi-au salvat zeci de ore pe lună. Recomand.',
  },
  {
    name: 'Mihai Florescu',
    role: 'Director agenție, Timișoara',
    rating: 5,
    text: 'Dashboard-ul mi-a arătat clar care sunt sursele de leaduri profitabile. Am ajustat bugetul și am crescut conversia.',
  },
];

const PLANS = [
  {
    name: 'Agent Solo',
    price: '99',
    desc: 'Perfect pentru agenți independenți',
    features: ['CRM 50 leaduri', '20 proprietăți', 'Vizionări + Follow-up', 'Calculator comisioane', 'Template-uri WhatsApp', 'Support email'],
    highlight: false,
  },
  {
    name: 'Agent Pro',
    price: '199',
    desc: 'Pentru agenți activi cu portofoliu mare',
    features: ['CRM nelimitat', 'Proprietăți nelimitate', 'Anunțuri AI', 'Rapoarte lunare', 'Dashboard performanță', 'Support prioritar'],
    highlight: true,
  },
  {
    name: 'Agenție',
    price: '499',
    desc: 'Pentru echipe și agenții imobiliare',
    features: ['Totul din Pro', 'Până la 10 agenți', 'Branding personalizat', 'Export date', 'Integrări viitoare', 'Manager de cont dedicat'],
    highlight: false,
  },
];

function NavBar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center shadow-gold">
            <TrendingUp size={15} className="text-navy-900" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm">AgentFlow</span>
            <span className="text-gold-400 text-sm font-bold"> România</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Funcționalități', 'Prețuri', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white/70 hover:text-white text-sm font-medium transition-colors font-body">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="hidden sm:flex items-center gap-1 text-white/70 hover:text-white text-sm font-medium transition-colors font-body">
            Intră în cont <ChevronRight size={14} />
          </Link>
          <Link to="/dashboard" className="btn-primary text-xs py-2.5 px-4">
            Începe gratuit <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <NavBar />

      {/* HERO */}
      <section className="relative bg-hero-gradient pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden noise-overlay">
        {/* Decorative circles */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-navy-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up">
              <Zap size={13} className="text-gold-400" />
              <span className="text-xs text-white/80 font-body">MVP Demo — 2024</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-up delay-100">
              Mai multe leaduri.<br />
              Mai multe vizionări.<br />
              <span className="text-gradient-gold">Mai multe comisioane.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 font-body leading-relaxed mb-4 max-w-3xl mx-auto animate-fade-up delay-200">
              Transformă haosul din WhatsApp, Excel și notițe într-un sistem clar pentru leaduri, vizionări și comisioane.
            </p>

            <p className="text-white/50 text-sm font-body mb-10 animate-fade-up delay-300">
              AgentFlow România ajută agenții imobiliari să urmărească leaduri, să organizeze proprietăți, să programeze vizionări și să nu mai piardă follow-up-uri importante.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-400">
              <Link to="/dashboard" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
                Începe gratuit <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto justify-center">
                Vezi demo-ul <ChevronRight size={18} />
              </Link>
            </div>

            <p className="text-white/30 text-xs font-body mt-6 animate-fade-up delay-500">
              Fără card de credit · Fără instalare · Date demo locale
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up delay-500">
            {[
              { label: 'Agenți activi', value: '500+' },
              { label: 'Leaduri gestionate', value: '12.000+' },
              { label: 'Comisioane estimate', value: '€2.4M' },
              { label: 'Ore economisite/lună', value: '40+' },
            ].map(({ label, value }) => (
              <div key={label} className="glass rounded-2xl p-4 text-center">
                <p className="font-display font-bold text-2xl text-gold-400">{value}</p>
                <p className="text-xs text-white/60 font-body mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="py-20 lg:py-28 bg-gray-50" id="funcționalități">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge bg-red-100 text-red-700 mb-4">Problema</span>
              <h2 className="section-title mb-6">
                Pierzi leaduri în haosul zilnic?
              </h2>
              <div className="space-y-4">
                {[
                  'WhatsApp plin de mesaje de la clienți fără nicio organizare',
                  'Excel-uri complicate și notițe pe hârtie care se pierd',
                  'Nu știi care lead are follow-up azi',
                  'Comisioanele calculate manual cu calculator',
                  'Anunțuri scrise de fiecare dată de la zero',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-xs font-bold">✕</span>
                    </div>
                    <p className="text-gray-600 font-body text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="badge bg-emerald-100 text-emerald-700 mb-4">Soluția AgentFlow</span>
              <h2 className="section-title mb-6">
                Tot ce-ți trebuie, <span className="text-gradient-gold">într-un singur loc</span>
              </h2>
              <div className="space-y-4">
                {[
                  'CRM clar: fiecare lead cu status, sursa și buget',
                  'Follow-up-uri cu remindere vizuale și template-uri gata',
                  'Proprietăți organizate cu comision estimat automat',
                  'Vizionări programate cu calendar simplu',
                  'Anunțuri generate în 30 de secunde cu 4 tonuri',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 font-body text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title mb-4">Funcționalități pentru agenți serioși</h2>
            <p className="section-subtitle">Un instrument construit specific pentru piața imobiliară din România.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="card-hover group">
                <div className="w-12 h-12 bg-navy-gradient rounded-2xl flex items-center justify-center mb-4 shadow-navy group-hover:scale-105 transition-transform">
                  <Icon size={22} className="text-gold-400" />
                </div>
                <h3 className="font-display font-bold text-navy-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-navy-gradient" id="testimoniale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Ce spun agenții noștri</h2>
            <p className="text-white/60 font-body">Feedback real de la profesioniști imobiliari din România.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, rating, text }) => (
              <div key={name} className="glass rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-white/80 font-body text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 bg-gold-gradient rounded-full flex items-center justify-center text-navy-900 text-xs font-bold font-display">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold font-body">{name}</p>
                    <p className="text-white/50 text-xs font-body">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 lg:py-28 bg-white" id="prețuri">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title mb-4">Prețuri clare, fără surprize</h2>
            <p className="section-subtitle">Alege planul potrivit pentru activitatea ta. Anulezi oricând.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map(({ name, price, desc, features, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  highlight
                    ? 'border-gold-400 bg-navy-gradient shadow-gold scale-105'
                    : 'border-gray-100 bg-white shadow-card'
                }`}
              >
                {highlight && (
                  <span className="badge bg-gold-400 text-navy-900 font-bold mb-3">Cel mai popular</span>
                )}
                <h3 className={`font-display font-bold text-xl mb-1 ${highlight ? 'text-white' : 'text-navy-900'}`}>
                  {name}
                </h3>
                <p className={`text-xs mb-4 font-body ${highlight ? 'text-white/60' : 'text-gray-400'}`}>{desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`font-display font-extrabold text-4xl ${highlight ? 'text-gold-400' : 'text-navy-900'}`}>
                    {price}
                  </span>
                  <span className={`text-sm font-body ${highlight ? 'text-white/60' : 'text-gray-400'}`}>lei/lună</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className={highlight ? 'text-gold-400' : 'text-emerald-500'} />
                      <span className={`text-sm font-body ${highlight ? 'text-white/80' : 'text-gray-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/dashboard"
                  className={`w-full justify-center ${highlight ? 'btn-primary' : 'btn-outline'}`}
                  style={{ display: 'flex' }}
                >
                  Solicită acces
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 font-body mt-8">
            * Prețuri demo. MVP demonstrativ — nicio plată nu este procesată.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 lg:py-24 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Gata să organizezi activitatea imobiliară?
          </h2>
          <p className="text-white/60 font-body text-lg mb-10">
            Alătură-te celor 500+ agenți care și-au simplificat munca cu AgentFlow România.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
              Intră în dashboard <ArrowRight size={18} />
            </Link>
            <a href="mailto:contact@agentflow.ro" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto justify-center">
              <Phone size={16} /> Contact pentru demo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gold-gradient rounded-lg flex items-center justify-center">
                <TrendingUp size={13} className="text-navy-900" />
              </div>
              <span className="font-display font-bold text-white text-sm">AgentFlow România</span>
            </div>

            <div className="flex items-center gap-6">
              {[
                { label: 'Confidențialitate', path: '/legal/confidentialitate' },
                { label: 'Termeni', path: '/legal/termeni' },
                { label: 'Disclaimer', path: '/legal/disclaimer' },
              ].map(({ label, path }) => (
                <Link key={label} to={path} className="text-white/40 hover:text-white/70 text-xs font-body transition-colors">
                  {label}
                </Link>
              ))}
            </div>

            <p className="text-white/30 text-xs font-body">
              © 2024 AgentFlow România · MVP Demo
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
