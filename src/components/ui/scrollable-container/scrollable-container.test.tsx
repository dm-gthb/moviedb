import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollableContainer } from './scrollable-container';

const setupOverflow = (
  container: HTMLElement,
  {
    clientWidth,
    scrollWidth,
    scrollLeft = 0,
  }: { clientWidth: number; scrollWidth: number; scrollLeft?: number },
) => {
  Object.defineProperty(container, 'clientWidth', {
    configurable: true,
    value: clientWidth,
  });
  Object.defineProperty(container, 'scrollWidth', {
    configurable: true,
    value: scrollWidth,
  });
  Object.defineProperty(container, 'scrollLeft', {
    configurable: true,
    writable: true,
    value: scrollLeft,
  });
};

describe('ScrollableContainer', () => {
  it('shows/hides scroll buttons based on overflow and scroll position', () => {
    render(
      <ScrollableContainer ariaLabel="Gallery">
        <div style={{ width: 1000 }}>Wide content</div>
      </ScrollableContainer>,
    );

    const region = screen.getByRole('region', { name: 'Gallery' });

    setupOverflow(region, { clientWidth: 100, scrollWidth: 300, scrollLeft: 0 });
    fireEvent.resize(window);

    expect(screen.queryByRole('button', { name: 'Scroll left' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scroll right' })).toBeInTheDocument();

    // Scroll somewhere in the middle
    (region as HTMLElement).scrollLeft = 100;
    fireEvent.scroll(region);

    expect(screen.getByRole('button', { name: 'Scroll left' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scroll right' })).toBeInTheDocument();

    // Scroll almost to the end so right button hides (tolerance 5px)
    (region as HTMLElement).scrollLeft = 195; // remaining = 300 - 100 - 195 = 5 -> hidden when not strictly > 5
    fireEvent.scroll(region);

    expect(screen.getByRole('button', { name: 'Scroll left' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Scroll right' }),
    ).not.toBeInTheDocument();
  });

  it('clicking arrows scrolls by clientWidth * scrollStep', () => {
    render(
      <ScrollableContainer ariaLabel="Row" scrollStep={0.5}>
        <div style={{ width: 1000 }}>Wide content</div>
      </ScrollableContainer>,
    );

    const region = screen.getByRole('region', { name: 'Row' });
    setupOverflow(region, { clientWidth: 200, scrollWidth: 800 });

    fireEvent.resize(window);

    type ElementWithScrollBy = HTMLElement & {
      scrollBy: (options: ScrollToOptions) => void;
    };
    const scrollBySpy = vi.fn<(options: ScrollToOptions) => void>();
    (region as ElementWithScrollBy).scrollBy = scrollBySpy;

    fireEvent.click(screen.getByRole('button', { name: 'Scroll right' }));
    expect(scrollBySpy).toHaveBeenCalledWith({ left: 100, behavior: 'smooth' });

    (region as HTMLElement).scrollLeft = 50;
    fireEvent.scroll(region);

    fireEvent.click(screen.getByRole('button', { name: 'Scroll left' }));
    expect(scrollBySpy).toHaveBeenCalledWith({ left: -100, behavior: 'smooth' });
  });
});
