'use client';

interface Milestone {
  id: string;
  title: string;
  date: string;
  achieved: boolean;
}

interface HorizontalTimelineProps {
  milestones?: Milestone[];
}

export default function HorizontalTimeline({ 
  milestones = defaultMilestones 
}: HorizontalTimelineProps) {
  const achievedCount = milestones.filter(m => m.achieved).length;
  const progress = (achievedCount / milestones.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">محطات الإنجاز</h2>
        <p className="text-gray-600">إنجازاتنا على مر الزمن</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">محطات مكتملة</span>
          <span className="text-sm font-medium text-blue-600">
            {achievedCount} من {milestones.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        
        {/* Horizontal Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300" />
        
        {/* Milestones */}
        <div className="flex justify-between relative">
          {milestones.map((milestone, index) => (
            <MilestoneComponent 
              key={milestone.id}
              milestone={milestone}
              isFirst={index === 0}
              isLast={index === milestones.length - 1}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

function MilestoneComponent({ 
  milestone, 
  isFirst, 
  isLast 
}: { 
  milestone: Milestone; 
  isFirst: boolean; 
  isLast: boolean; 
}) {
  return (
    <div className="flex flex-col items-center text-center">
      
      {/* Dot */}
      <div className={`
        w-4 h-4 rounded-full border-4 z-10 mb-3
        ${milestone.achieved 
          ? 'bg-green-500 border-green-500' 
          : 'bg-white border-gray-300'
        }
      `} />
      
      {/* Content */}
      <div className="text-center">
        <div className={`
          text-sm font-medium mb-1
          ${milestone.achieved ? 'text-gray-900' : 'text-gray-500'}
        `}>
          {milestone.title}
        </div>
        <div className="text-xs text-gray-500">
          {milestone.date}
        </div>
      </div>

    </div>
  );
}

const defaultMilestones: Milestone[] = [
  {
    id: '1',
    title: 'التأسيس',
    date: '٢٠٢٠',
    achieved: true
  },
  {
    id: '2',
    title: 'الإطلاق',
    date: '٢٠٢١',
    achieved: true
  },
  {
    id: '3',
    title: '١٠٠ عميل',
    date: '٢٠٢٢',
    achieved: true
  },
  {
    id: '4',
    title: 'التوسع',
    date: '٢٠٢٣',
    achieved: true
  },
  {
    id: '5',
    title: 'الريادة',
    date: '٢٠٢٤',
    achieved: false
  }
];