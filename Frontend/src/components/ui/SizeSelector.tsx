import React from 'react';
interface SizeSelectorProps {
  sizes: string[];
  selectedSize?: string;
  onChange: (size: string) => void;
  error?: boolean;
}
export function SizeSelector({
  sizes,
  selectedSize,
  onChange,
  error
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium uppercase tracking-wide">
          Size
        </span>
        <button className="text-xs text-gray-500 underline hover:text-black">
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) =>
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`
              py-3 text-sm font-medium transition-all duration-200
              ${selectedSize === size ? 'bg-black text-white border border-black' : 'bg-white text-black border border-gray-200 hover:border-black'}
              ${error ? 'border-red-500' : ''}
            `}>

            {size}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">Please select a size</p>}
    </div>);

}