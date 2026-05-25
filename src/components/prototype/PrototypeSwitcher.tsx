import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrototypeSwitcherProps {
  variants: string[];
  current: string;
}

export default function PrototypeSwitcher({ variants, current }: PrototypeSwitcherProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Hide in production
  if (import.meta.env.PROD) {
    return null;
  }

  const currentIndex = variants.indexOf(current) !== -1 ? variants.indexOf(current) : 0;
  
  const handleSwitch = (direction: 'prev' | 'next') => {
    let nextIndex = currentIndex;
    if (direction === 'prev') {
      nextIndex = currentIndex === 0 ? variants.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex === variants.length - 1 ? 0 : currentIndex + 1;
    }
    
    const newVariant = variants[nextIndex];
    const newParams = new URLSearchParams(searchParams);
    newParams.set('variant', newVariant);
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  const getVariantName = (v: string) => {
    switch(v) {
      case 'A': return 'A - Strict Builder.io';
      case 'B': return 'B - Institutional Theme';
      case 'C': return 'C - Free-For-All Design';
      default: return v;
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-zinc-900/90 text-zinc-100 px-4 py-2 rounded-full shadow-lg border border-zinc-700 backdrop-blur-sm">
      <button 
        onClick={() => handleSwitch('prev')}
        className="p-1.5 hover:bg-zinc-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <ArrowLeft size={16} />
      </button>
      
      <div className="font-mono text-xs font-semibold px-2 uppercase tracking-wide">
        {getVariantName(current)}
      </div>

      <button 
        onClick={() => handleSwitch('next')}
        className="p-1.5 hover:bg-zinc-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
