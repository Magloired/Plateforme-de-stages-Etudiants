import { Briefcase, DollarSign, Target, TrendingUp } from 'lucide-react';

export default function Stats({ statsData }: { statsData: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard icon={<Briefcase />} value={statsData.total} label="Stages Disponibles" />
      <StatCard icon={<Target />} value={statsData.urgent} label="Opportunités Urgentes" />
      <StatCard icon={<DollarSign />} value={statsData.remuneres} label="Stages Rémunérés" />
      <StatCard icon={<TrendingUp />} value={statsData.secteurs} label="Secteurs d'Activité" />
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
        {icon}
      </div>
      <div className="text-4xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}