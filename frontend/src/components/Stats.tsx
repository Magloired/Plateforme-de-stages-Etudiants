import { Briefcase, DollarSign, Target, TrendingUp } from 'lucide-react';

export default function Stats({ statsData }: { statsData: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <StatCard 
        icon={<Briefcase />} 
        value={statsData.total} 
        label="Stages Disponibles" 
        gradient="from-blue-500 to-blue-600"
        delay="0"
      />
      <StatCard 
        icon={<Target />} 
        value={statsData.urgent} 
        label="Opportunités Urgentes" 
        gradient="from-red-500 to-orange-500"
        delay="100"
      />
      <StatCard 
        icon={<DollarSign />} 
        value={statsData.remuneres} 
        label="Stages Rémunérés" 
        gradient="from-green-500 to-emerald-500"
        delay="200"
      />
      <StatCard 
        icon={<TrendingUp />} 
        value={statsData.secteurs} 
        label="Secteurs d'Activité" 
        gradient="from-purple-500 to-indigo-500"
        delay="300"
      />
    </div>
  );
}

function StatCard({ 
  icon, 
  value, 
  label, 
  gradient, 
  delay 
}: { 
  icon: React.ReactNode; 
  value: number; 
  label: string; 
  gradient: string;
  delay: string;
}) {
  return (
    <div 
      className="stat-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-white/50 hover:shadow-2xl group relative overflow-hidden animate-fade-in-scale"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Fond décoratif animé */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} animate-gradient`}></div>
      </div>
      
      {/* Icône avec gradient et animation */}
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse-glow`}>
        <div className="text-xl">
          {icon}
        </div>
      </div>
      
      {/* Valeur avec animation de compteur */}
      <div className={`text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300`}>
        {value}
      </div>
      
      {/* Label stylisé */}
      <div className="text-gray-700 font-semibold text-sm uppercase tracking-wide leading-tight">
        {label}
      </div>
      
      {/* Effet de brillance au survol */}
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}