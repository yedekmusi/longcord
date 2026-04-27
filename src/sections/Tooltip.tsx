import { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'right' | 'top' | 'bottom';
}

export default function Tooltip({ text, children, position = 'right' }: TooltipProps) {
  const [show, setShow] = useState(false);

  const posClasses = {
    right: 'left-[calc(100%+12px)] top-1/2 -translate-y-1/2',
    top: 'bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2',
    bottom: 'top-[calc(100%+12px)] left-1/2 -translate-x-1/2',
  };

  const arrowClasses = {
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-[6px] border-r-[#111214] border-y-transparent border-y-[4px]',
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-[6px] border-t-[#111214] border-x-transparent border-x-[4px]',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-[6px] border-b-[#111214] border-x-transparent border-x-[4px]',
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={`absolute ${posClasses[position]} pointer-events-none z-[100] whitespace-nowrap`}
        >
          <div className="bg-[#111214] text-white text-xs font-medium px-3 py-2 rounded shadow-[0_4px_12px_rgba(0,0,0,0.24)]">
            {text}
          </div>
          <div className={`absolute w-0 h-0 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}
