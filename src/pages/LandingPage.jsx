import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, Users, Building2, Calendar,
  Bell, DollarSign, Sparkles, CheckCircle2,
  Star, ChevronRight, Zap, Phone, Mail, MessageCircle
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
    cta: 'Abonează-te acum',
    link: 'https://buy.stripe.com/6oU7sL1jXd0E5rAe9y4AU04'
  },
  {
    name: 'Agent Pro',
    price: '199',
    desc: 'Pentru agenți activi cu portofoliu mare',
    features: ['CRM nelimitat', 'Proprietăți nelimitate', 'Anunțuri AI', 'Rapoarte lunare', 'Dashboard performanță', 'Support prioritar'],
    highlight: true,
    cta: 'Solicită acces Pro',
    link: 'https://buy.stripe.com/bJefZh6Eh9Os4nw6H64AU05'
  },
  {
    name: 'Agenție',
    price: '499',
    desc: 'Pentru echipe și agenții imobiliare',
    features: ['Totul din Pro', 'Până la 10 agenți', 'Branding personalizat', 'Export date', 'Integrări viitoare', 'Manager de cont dedicat'],
    highlight: false,
    cta: 'Solicita acces Agenție',
    link: 'https://buy.stripe.com/7sY7sLd2F8Ko07g4yY4AU06'
  },
];

function NavBar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex i-center justify-between">
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
          <a href="#funcționalități" className="text-white/70 hover:text-white text-sm font-medium transition-colors font-body">Funcționalități</a>
          <a href="#prețuri" className="text-white/70 hover:text-white text-sm font-medium transition-colors font-body">Prețuri</a>
          <a href="https://wa.me/40759687560" className="text-white/70 hover:text-white text-sm font-medium transition-colors font-body">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="hidden sm:flex items-center gap-1 text-white/70 hover:text-white text-sm font-medium transition-colors font-body">
            Demo Dashboard <ChevronRight size={14} />
          </Link>
          <a href="#prețuri" className="btn-primary text-xs py-2.5 px-4">
            Începe acum <ArrowRight size={14} />
          </a>
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
      <section className="relative bg-hero-gradient pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-navy-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up">
              <Zap size={13} className="text-gold-400" />
              <span className="text-xs text-white/80 font-body">Soluție Premium Imobiliară</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-up delay-100">
              Mai multe leaduri.<br />
              Mai multe vizionări.<br />
              <span className="text-gradient-gold">Mai multe comisioane.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 font-body leading-relaxed mb-10 max-w-3xl mx-auto animate-fade-up delay-200">
              Transformă haosul din WhatsApp și Excel într-un sistem clar. AgentFlow ajută agenții din România să vândă mai mult și mai rapid.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
              <a href="https://buy.stripe.com/6oU7sL1jXd0E5rAe9y4AU04" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
                Cumpără Plan Solo <ArrowRight size={18} />
              </a>
              <Link to="/dashboard" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto justify-center border border-white/20">
                Vezi Demo Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50" id="funcționalități">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title">Tot ce ai nevoie pentru succes</h2>
            <p className="section-subtitle">O platformă construită specific pentru piața din România.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-hover">
                <div className="w-12 h-12 bg-navy-gradient rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={22} className="text-gold-400" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-2 font-display">{f.title}</h3>
                <p className="text-gray-500 text-sm font-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-white" id="prețuri">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title">Alege planul tău</h2>
            <p className="section-subtitle">Investește în eficiența ta. Fără contracte pe termen lung.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-8 border-2 transition-all ${plan.highlight ? 'border-gold-400 bg-navy-900 text-white shadow-gold scale-105' : 'border-gray-100 bg-white shadow-sm'}`}>
                <h3 className="font-bold text-xl mb-2 font-display">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-gold-400' : 'text-navy-900'}`}>{plan.price}</span>
                  <span className="text-sm opacity-60">RON / lună</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm opacity-80 font-body">
                      <CheckCircle2 size={16} className={plan.highlight ? 'text-gold-400' : 'text-emerald-500'} /> {f}
                    </li>
                  ))}
                </ul>
                <a href={plan.link} target="_blank" rel="noreferrer" className={`w-full py-3 rounded-xl font-bold text-center block transition-all ${plan.highlight ? 'bg-gold-gradient text-navy-900 hover:scale-105' : 'bg-navy-900 text-white hover:bg-navy-800'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-hero-gradient relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-display">Gata să organizezi activitatea imobiliară?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://cal.com/ciprian-stefan-plesca" target="_blank" rel="noreferrer" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
              <Calendar size={18} /> Programează un Demo
            </a>
            <a href="https://wa.me/40759687560" target="_blank" rel="noreferrer" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto justify-center border border-white/20">
              <Phone size={16} /> +40 759 687 560
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-950 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center">
                  <TrendingUp size={14} className="text-navy-900" />
                </div>
                <span className="font-display font-bold text-white text-lg">AgentFlow România</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed font-body">
                Sistemul premium de management pentru agenții imobiliari moderni din România. Dezvoltat de Ciprian Stefan Plesca.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider font-display">Contact & Demo</h4>
              <ul className="space-y-4 text-sm text-white/50 font-body">
                <li className="flex items-center gap-2"><Mail size={14} /> <a href="mailto:contact@localpulse.pro" className="hover:text-gold-400">contact@localpulse.pro</a></li>
                <li className="flex items-center gap-2"><MessageCircle size={14} /> <a href="https://wa.me/40759687560" className="hover:text-gold-400">WhatsApp Suport</a></li>
                <li className="flex items-center gap-2"><Calendar size={14} /> <a href="https://cal.com/ciprian-stefan-plesca" className="hover:text-gold-400">Rezervă apel consultanță</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider font-display">Date Fiscale (Xolo)</h4>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <ul className="space-y-2 text-xs text-white/60 font-body">
                  <li className="font-bold text-white/90">Xolo Go OÜ - Ciprian-Stefan Plesca</li>
                  <li>Reg. No: 14717109</li>
                  <li>VAT ID: EE102156920</li>
                  <li>Estonia, Partnership structure</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs font-body italic">
              © {new Date().getFullYear()} Xolo Go OÜ. Toate drepturile rezervate. Creat cu mândrie pentru agenții din România.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <Link to="/legal/termeni" className="hover:text-white/60">Termeni și Condiții</Link>
              <Link to="/legal/confidentialitate" className="hover:text-white/60">Confidențialitate</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}