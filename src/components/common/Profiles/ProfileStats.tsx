'use client';

interface ProfileStatsProps {
  stats: {
    completedTasks: number;
    inProgress: number;
    projects: number;
    hoursWorked: number;
    efficiency: number;
    rating: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      label: 'المهام المكتملة',
      value: stats.completedTasks,
      icon: '✅',
      color: 'text-green-600'
    },
    {
      label: 'قيد التنفيذ',
      value: stats.inProgress,
      icon: '🔄',
      color: 'text-blue-600'
    },
    {
      label: 'المشاريع',
      value: stats.projects,
      icon: '📁',
      color: 'text-purple-600'
    },
    {
      label: 'ساعات العمل',
      value: stats.hoursWorked,
      icon: '⏰',
      color: 'text-orange-600'
    },
    {
      label: 'الكفاءة',
      value: `${stats.efficiency}%`,
      icon: '📊',
      color: 'text-teal-600'
    },
    {
      label: 'التقييم',
      value: stats.rating.toFixed(1),
      icon: '⭐',
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">إحصائيات الأداء</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {statItems.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="mt-8 space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>إكمال المهام</span>
            <span>{Math.round((stats.completedTasks / (stats.completedTasks + stats.inProgress)) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(stats.completedTasks / (stats.completedTasks + stats.inProgress)) * 100}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>معدل الكفاءة</span>
            <span>{stats.efficiency}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.efficiency}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}