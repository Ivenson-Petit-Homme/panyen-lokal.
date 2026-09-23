import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  imgClassName?: string;
  aspectRatioClass?: string;
  fallbackText?: string;
  fallbackSrc?: string;
  showShimmerBadge?: boolean;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  containerClassName = '',
  imgClassName = '',
  aspectRatioClass = '',
  fallbackText,
  fallbackSrc,
  showShimmerBadge = false,
  onClick,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);

  React.useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
    setTriedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
      if (fallbackSrc && fallbackSrc !== currentSrc) {
        setCurrentSrc(fallbackSrc);
        return;
      }
      if (typeof currentSrc === 'string' && currentSrc.includes('chocolat')) {
        setCurrentSrc('/uploads/chocolat_chaud_panyen.jpg');
        return;
      }
      if (typeof currentSrc === 'string' && (currentSrc.includes('tamar') || currentSrc.includes('cognac'))) {
        if (currentSrc.includes('back')) {
          setCurrentSrc('/uploads/grand_tamar_back.jpg');
        } else {
          setCurrentSrc('/uploads/grand_tamar_front.jpg');
        }
        return;
      }
    }
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      className={`relative overflow-hidden ${containerClassName} ${aspectRatioClass}`}
      onClick={onClick}
    >
      {/* Elegant Skeleton Shimmer Layer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200">
          {/* Shimmer sweep wave */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-60 text-[#1B4332]">
            <div className="w-8 h-8 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 flex items-center justify-center animate-spin">
              <div className="w-3 h-3 rounded-full border-2 border-[#2D6A4F] border-t-transparent" />
            </div>
            {showShimmerBadge && (
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1B4332]">
                Panyen Lokal
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
          <ImageOff className="w-8 h-8 mb-1 opacity-50" />
          <span className="text-xs font-semibold">{fallbackText || alt || 'Image non disponible'}</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`transition-all duration-700 ease-out ${
            isLoaded 
              ? 'opacity-100 scale-100 filter-none' 
              : 'opacity-0 scale-95 blur-xs'
          } ${imgClassName}`}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};
