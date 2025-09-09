import { MousePointerIcon } from 'lucide-react';

export function Pointer({
  name,
  pointerStyle = '',
  labelStyle = '',
}: {
  name: string;
  pointerStyle: string;
  labelStyle: string;
}) {
  return (
    <div className='relative'>
      <MousePointerIcon className={`${pointerStyle}`} />
      <div className='absolute top-full left-full'>
        <div
          className={`linline-flex font-bold text-sm px-2 rounded-full rounded-tl-none ${labelStyle}`}
        >
          {name}
        </div>
      </div>
    </div>
  );
}
