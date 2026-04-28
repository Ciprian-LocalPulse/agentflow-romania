import { Menu, Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopBar({ onMenuOpen, title }) {
  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center gap-4 sticky top-0 z-20">
      <button
        onClick={onMenuOpen}
        className="lg:hidden text-gray-400 hover:text-navy-900 transition-colors p-2 rounded-xl hover:bg-gray-100"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1">
        <h1 className="font-display font-bold text-navy-900 text-lg leading-none">{title}</h1>
        <p className="text-xs text-gray-400 font-body mt-0.5">AgentFlow România</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 w-48">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Caută..."
            className="bg-transparent text-sm text-navy-800 placeholder-gray-400 outline-none w-full font-body"
          />
        </div>

        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-navy-900">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 bg-navy-gradient rounded-full flex items-center justify-center text-white text-xs font-bold font-display">
            AG
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-navy-900 font-body leading-none">Agent Demo</p>
            <p className="text-xs text-gray-400 font-body">Plan Solo</p>
          </div>
        </div>
      </div>
    </header>
  );
}
