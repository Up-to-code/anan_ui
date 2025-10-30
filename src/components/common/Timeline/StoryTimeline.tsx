'use client';

interface StoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
  milestone?: string;
}

interface StoryTimelineProps {
  stories?: StoryItem[];
}

export default function StoryTimeline({ 
  stories = defaultStories 
}: StoryTimelineProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">رحلة النجاح</h2>
        <p className="text-gray-600">قصة تطورنا وإنجازاتنا عبر السنوات</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        
        {/* Vertical Line */}
        <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500" />
        
        {/* Stories */}
        <div className="space-y-8">
          {stories.map((story, index) => (
            <StoryItemComponent 
              key={story.id}
              story={story}
              isLast={index === stories.length - 1}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function StoryItemComponent({ story, isLast }: { story: StoryItem, isLast: boolean }) {
  return (
    <div className="flex gap-6 group">
      
      {/* Year & Dot */}
      <div className="flex flex-col items-center">
        
        {/* Year */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold min-w-20 text-center">
          {story.year}
        </div>
        
        {/* Connector Dot */}
        <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white mt-2 relative z-10" />
        
        {/* Vertical Line (except last item) */}
        {!isLast && (
          <div className="w-0.5 h-8 bg-blue-300 mt-2 flex-1" />
        )}
        
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 group-last:pb-0">
        
        {/* Milestone Badge */}
        {story.milestone && (
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {story.milestone}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {story.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {story.description}
        </p>

      </div>

    </div>
  );
}

const defaultStories: StoryItem[] = [
  {
    id: '1',
    year: '٢٠٢٠',
    title: 'بداية الرحلة',
    description: 'تأسيس الشركة مع رؤية واضحة لتقديم حلول ذكية تعتمد على الذكاء الاصطناعي.',
    milestone: 'التأسيس'
  },
  {
    id: '2',
    year: '٢٠٢١',
    title: 'أول منتج رئيسي',
    description: 'إطلاق النسخة الأولى من المنصة مع مجموعة أساسية من الميزات التحليلية.',
    milestone: 'الإطلاق الأول'
  },
  {
    id: '3', 
    year: '٢٠٢٢',
    title: 'التوسع والشراكات',
    description: 'توسيع قاعدة العملاء وإبرام شراكات استراتيجية مع كبرى الشركات.',
    milestone: 'النمو'
  },
  {
    id: '4',
    year: '٢٠٢٣',
    title: 'التميز والجوائز',
    description: 'فوز بعدة جوائز محلية وعالمية في مجال الابتكار والتقنية.',
    milestone: 'التميز'
  },
  {
    id: '5',
    year: '٢٠٢٤',
    title: 'القيادة والابتكار',
    description: 'مواصلة الابتكار وتطوير حلول متقدمة تلبي احتياجات السوق المتغيرة.',
    milestone: 'الريادة'
  }
];