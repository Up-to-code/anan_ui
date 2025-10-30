// components/Card.tsx
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}