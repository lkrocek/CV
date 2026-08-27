import React from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  y?: number;
  as?: 'div' | 'section' | 'li';
  showScrollHint?: boolean;
  revealOnMount?: boolean;
};

export const getRevealState = (visibleViewportRatio: number) => ({
  isVisible: visibleViewportRatio >= 0.1,
  showScrollHint: visibleViewportRatio < 0.1,
});

const getVisibleViewportRatio = (element: Element): number => {
  const rootRect = document.getElementById('app-scroll')?.getBoundingClientRect();
  const targetRect = element.getBoundingClientRect();
  const viewportTop = rootRect?.top ?? 0;
  const viewportBottom = rootRect?.bottom ?? globalThis.innerHeight;
  const viewportHeight = viewportBottom - viewportTop;
  if (targetRect.bottom <= viewportTop) return 0;
  return viewportHeight > 0
    ? Math.max(0, (viewportBottom - targetRect.top) / viewportHeight)
    : 0;
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  y = 28,
  as = 'div',
  showScrollHint = false,
  revealOnMount = false,
}) => {
  const ref = React.useRef<Element | null>(null);
  const [isVisible, setIsVisible] = React.useState(revealOnMount);
  const [isPartiallyVisible, setIsPartiallyVisible] = React.useState(false);
  const splashReadyRef = React.useRef(
    typeof document !== 'undefined' &&
    (document.body.classList.contains('splash-done') || !document.getElementById('splash')),
  );
  const pendingRef = React.useRef(false);

  const setRef = React.useCallback((node: Element | null) => {
    ref.current = node;
  }, []);

  React.useEffect(() => {
    if (splashReadyRef.current) return;

    const handler = () => {
      splashReadyRef.current = true;
      const revealState = ref.current
        ? getRevealState(getVisibleViewportRatio(ref.current))
        : null;
      if (revealState?.showScrollHint) setIsPartiallyVisible(true);
      if (revealState?.isVisible || pendingRef.current) {
        setIsVisible(true);
      }
    };
    globalThis.addEventListener('splashDismissed', handler, { once: true });
    return () => globalThis.removeEventListener('splashDismissed', handler);
  }, []);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const evaluateVisibility = () => {
        const visibleViewportRatio = getVisibleViewportRatio(element);
        const revealState = getRevealState(visibleViewportRatio);
        setIsPartiallyVisible(revealState.showScrollHint);
        if (revealState.isVisible) {
          if (splashReadyRef.current) {
            setIsVisible(true);
          } else {
            pendingRef.current = true;
          }
        }
    };
    const observer = new IntersectionObserver(
      () => evaluateVisibility(),
      { threshold: [0, 0.1], root: document.getElementById('app-scroll') },
    );
    const resizeObserver = new ResizeObserver(evaluateVisibility);
    const scrollContainer = document.getElementById('app-scroll');

    observer.observe(element);
    resizeObserver.observe(element);
    scrollContainer?.addEventListener('scroll', evaluateVisibility, { passive: true });
    globalThis.addEventListener('resize', evaluateVisibility);
    const frame = requestAnimationFrame(() => {
      evaluateVisibility();
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      scrollContainer?.removeEventListener('scroll', evaluateVisibility);
      globalThis.removeEventListener('resize', evaluateVisibility);
    };
  }, []);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : `translate3d(0, ${y}px, 0) scale(0.985)`,
    filter: isVisible ? 'blur(0px)' : 'blur(8px)',
    transitionDelay: `${delayMs}ms`,
    transitionDuration: '700ms',
    transitionProperty: 'opacity, transform, filter',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    willChange: 'opacity, transform, filter',
  };

  const content = as === 'li'
    ? <li ref={setRef} className={className} style={style}>{children}</li>
    : as === 'section'
      ? <section ref={setRef} className={className} style={style}>{children}</section>
      : <div ref={setRef} className={className} style={style}>{children}</div>;

  if (!showScrollHint || !isPartiallyVisible || isVisible) return content;

  return (
    <>
      {content}
      <button
        type="button"
        className="reveal-scroll-hint"
        aria-label="Scroll to reveal content"
        onClick={() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      >
        ↓
      </button>
    </>
  );
};
