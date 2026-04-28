import { Link } from 'react-router-dom';
import {
  Users, Building2, Calendar, Bell, DollarSign,
  BarChart3, ArrowRight, CheckCircle2, Clock, AlertCircle
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEMO_LEADS, DEMO_PROPERTIES, DEMO_VIEWINGS, DEMO_FOLLOWUPS } from '../data/demoData';
import { formatDate, formatCurrency } from '../utils/helpers';

export default function Dashboard() {
  const [leads] = useLocalStorage('af_leads', DEMO_LEADS);
  const [properties] = useLocalStorage('af_properties', DEMO_PROPERTIES);
  const [viewings] = useLocalStorage('af_viewings', DEMO_VIEWINGS);
  const [followups] = useLocalStorage('af_followups', DEMO_FOLLOWUPS);

  const newLeads = leads.filter(l => l.status === 'Nou').length;
  const activeProps = properties.filter(p => p.status === 'Activă').length;
  const scheduledViewings = viewings.filter(v => v.status === 'Programată').length;
  const pendingFollowups = followups.filter(f => f.status === 'nefinalizat').length;

  const closedLeads = leads.filter(l => l.status === 'Închis');
  const totalCommission = properties
    .filter(p => p.status === 'Vândută' || p.status === 'Închiriată')
    .reduce((sum, p) => {
      const comm = (parseFloat(p.price) * parseFloat(p.commission)) / 100;
      return sum + (isNaN(comm) ? 0 : comm);
    }, 0);

  const conversionRate = leads.length > 0 ? Math.round((closedLeads.length / leads.length) * 100) : 0;

  const recentLeads = [...leads].slice(0, 4);
  const upcomingViewings = viewings.filter(v => v.status === 'Programată').slice(0, 3);

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-8 max-w-7xl">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900">Bun venit, Agent Demo!</h2>
            <p className="text-gray-500 font-body text-sm mt-1">Iată o privire de ansamblu asupra activității tale.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/leaduri" className="btn-outline">
              <Users size={15} /> Leaduri noi
            </Link>
            <Link to="/vizionari" className="btn-primary">
              <Calendar size={15} /> Programează vizionare
            </Link>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Leaduri noi" value={newLeads} subtitle="de gestionat" icon={Users} color="navy" trend={12} trendLabel="față de luna trecută" delay={0} />
          <StatCard title="Proprietăți active" value={activeProps} subtitle="în portofoliu" icon={Building2} color="emerald" trend={8} trendLabel="față de luna trecută" delay={50} />
          <StatCard title="Vizionări" value={scheduledViewings} subtitle="programate" icon={Calendar} color="purple" delay={100} />
          <StatCard title="Follow-up restante" value={pendingFollowups} subtitle="de rezolvat" icon={Bell} color="orange" delay={150} />
          <StatCard
            title="Comisioane est."
            value={`€${Math.round(totalCommission).toLocaleString('ro-RO')}`}
            subtitle="tranzacții încheiate"
            icon={DollarSign}
            color="gold"
            trend={24}
            trendLabel="față de trimestrul trecut"
            delay={200}
          />
          <StatCard title="Rată conversie" value={`${conversionRate}%`} subtitle="leaduri → contracte" icon={BarChart3} color="navy" trend={5} trendLabel="față de media anterioară" delay={250} />
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent leads */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-navy-900">Leaduri recente</h3>
              <Link to="/leaduri" className="text-xs text-navy-600 font-semibold hover:text-navy-900 flex items-center gap-1 font-body transition-colors">
                Vezi toate <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentLeads.map(lead => (
                <div key={lead.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-9 h-9 bg-navy-gradient rounded-full flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0">
                    {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-900 text-sm font-body truncate">{lead.name}</p>
                    <p className="text-xs text-gray-400 font-body">{lead.interest} · {lead.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge status={lead.status} />
                    <p className="text-xs text-gray-400 font-body mt-1">{formatDate(lead.updatedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming viewings */}
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-navy-900">Vizionări programate</h3>
              <Link to="/vizionari" className="text-xs text-navy-600 font-semibold hover:text-navy-900 flex items-center gap-1 font-body transition-colors">
                Vezi toate <ArrowRight size={12} />
              </Link>
            </div>
            {upcomingViewings.length > 0 ? (
              <div className="space-y-3">
                {upcomingViewings.map(v => (
                  <div key={v.id} className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-900 text-sm font-body truncate">{v.leadName}</p>
                      <p className="text-xs text-gray-500 font-body truncate">{v.propertyTitle}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-navy-900 font-body">{v.time}</p>
                      <p className="text-xs text-gray-400 font-body">{formatDate(v.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Calendar size={32} className="mb-2 opacity-40" />
                <p className="text-sm font-body">Nicio vizionare programată</p>
              </div>
            )}

            {/* Follow-up alert */}
            {pendingFollowups > 0 && (
              <Link to="/followup" className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors">
                <AlertCircle size={16} className="text-orange-500 flex-shrink-0" />
                <p className="text-sm text-orange-700 font-body flex-1">
                  Ai <strong>{pendingFollowups} follow-up-uri</strong> restante astăzi
                </p>
                <ArrowRight size={14} className="text-orange-500" />
              </Link>
            )}
          </div>
        </div>

        {/* Pipeline funnel */}
        <div className="card">
          <h3 className="font-display font-bold text-navy-900 mb-5">Pipeline leaduri</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {['Nou', 'Contactat', 'Vizionare', 'Negociere', 'Închis', 'Pierdut'].map((status) => {
              const count = leads.filter(l => l.status === status).length;
              const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
              const colors = {
                'Nou': 'bg-blue-500',
                'Contactat': 'bg-amber-500',
                'Vizionare': 'bg-purple-500',
                'Negociere': 'bg-orange-500',
                'Închis': 'bg-emerald-500',
                'Pierdut': 'bg-gray-400',
              };
              return (
                <div key={status} className="text-center">
                  <div className="text-2xl font-bold font-display text-navy-900">{count}</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 my-2">
                    <div className={`h-1.5 rounded-full ${colors[status]}`} style={{ width: `${pct}%` }} />
                  </div>
                  <Badge status={status} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
