import { STATUS_COLORS } from '../data/demoData';

export default function Badge({ status, className = '' }) {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`badge ${colorClass} ${className}`}>
      {status}
    </span>
  );
}
