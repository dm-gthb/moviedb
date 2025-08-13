import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useId, useRef, useState } from 'react';

export function ScrollableContainer({
  children,
  className = '',
  scrollStep = 0.8,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  scrollStep?: number;
  ariaLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const regionId = useId();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const containerElement = containerRef.current;
    const remainingScrollTolerancePx = 5;

    if (!containerElement) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = containerElement;
    const remainingDistance = scrollWidth - clientWidth - scrollLeft;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(remainingDistance > remainingScrollTolerancePx);
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const scrollAmount = containerElement.clientWidth * scrollStep;
    containerElement.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const handleScroll = () => updateScrollButtons();
    const handleResize = () => updateScrollButtons();

    containerElement.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    updateScrollButtons();

    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative">
      {canScrollLeft && (
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-white via-white/80 to-transparent dark:bg-none" />
      )}
      {canScrollRight && (
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-white via-white/80 to-transparent dark:bg-none" />
      )}

      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount('left')}
          className="absolute left-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-gray-50 bg-white p-2 shadow-md transition-transform duration-200 ease-out hover:-translate-x-1 dark:border-none dark:bg-gray-600"
          aria-controls={regionId}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon width={24} height={24} />
          <span className="sr-only">show previous items</span>
        </button>
      )}

      <div
        ref={containerRef}
        className={`hide-scrollbar overflow-x-auto ${className}`}
        style={{
          scrollbarWidth: 'none',
        }}
        id={regionId}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scrollByAmount('right')}
          className="absolute right-0 top-1/2 z-30 -translate-y-1/2 rounded-full border border-gray-50 bg-white p-2 shadow-md transition-transform duration-200 ease-out hover:translate-x-1 dark:border-none dark:bg-gray-600"
          aria-controls={regionId}
          aria-label="Scroll right"
        >
          <ChevronRightIcon width={24} height={24} />
          <span className="sr-only">show next items</span>
        </button>
      )}
    </div>
  );
}
