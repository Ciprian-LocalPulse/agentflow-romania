import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, Calendar, Bell,
  DollarSign, Sparkles, Tag, ChevronRight, X, TrendingUp
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leaduri', label: 'Leaduri CRM', icon: Users },
  { path: '/proprietati', label: 'Proprietăți', icon: Building2 },
  { path: '/vizionari', label: 'Vizionări', icon: Calendar },
  { path: '/followup', label: 'Follow-up', icon: Bell },
  { path: '/comisioane', label: 'Comisioane', icon: DollarSign },
  { path: '/anunturi-ai', label: 'Anunțuri AI', icon: Sparkles },
  { path: '/preturi', label: 'Prețuri', icon: Tag },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-40
        flex flex-col transition-transform duration-300 ease-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-navy-gradient rounded-lg flex items-center justify-center shadow-navy">
              <TrendingUp size={16} className="text-gold-400" />
            </div>
            <div>
              <span className="font-display font-bold text-navy-900 text-sm">AgentFlow</span>
              <span className="block text-xs text-gray-400 -mt-0.5 font-body">România</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 sidebar-scroll overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3 font-body">
            Meniu principal
          </p>
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={active ? 'sidebar-link-active' : 'sidebar-link-inactive'}
              >
                <Icon size={17} className={active ? 'text-gold-400' : ''} />
                <span className="flex-1 font-body">{label}</span>
                {active && <ChevronRight size={14} className="text-gold-400/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom card */}
        <div className="p-4">
          <div className="bg-navy-gradient rounded-xl p-4 text-white">
            <p className="text-xs font-semibold text-gold-400 font-display mb-1">Demo MVP</p>
            <p className="text-xs text-white/70 font-body leading-relaxed">
              Date demo locale. Nicio conexiune la server real.
            </p>
            <Link
              to="/preturi"
              className="mt-3 inline-flex items-center gap-1 text-xs text-gold-400 font-semibold hover:text-gold-300 transition-colors"
            >
              Upgrade plan <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
