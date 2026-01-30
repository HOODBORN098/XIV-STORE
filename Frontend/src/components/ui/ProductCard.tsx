import React, { useState } from 'react';
import { Product } from '../../types';
import { Plus } from 'lucide-react';
interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onQuickAdd?: () => void;
}
export function ProductCard({
  product,
  onClick,
  onQuickAdd
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="group cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}>

      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`
            w-full h-full object-cover transition-transform duration-700 ease-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `} />


        {/* Secondary image on hover if available */}
        {product.images[1] &&
          <img
            src={product.images[1]}
            alt={product.name}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-500
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `} />

        }

        {/* Quick Add Button */}
        {onQuickAdd &&
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd();
            }}
            className={`
              absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg
              transform transition-all duration-300 hover:bg-black hover:text-white
              ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            aria-label="Quick add to cart">

            <Plus size={20} />
          </button>
        }

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.newArrival &&
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
              New
            </span>
          }
          {product.featured &&
            <span className="bg-black/90 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
              Featured
            </span>
          }
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-gray-900 ml-4">
            Ksh {product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-gray-500">{product.category}</p>
      </div>
    </div>);

}