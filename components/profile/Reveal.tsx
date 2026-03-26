import React from 'react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  y?: number;
  as?: 'div' | 'section' | 'li';
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  y = 28,
  as = 'div',
}) => {
  const ref = React.useRef<Element | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const setRef = React.useCallback((node: Element | null) => {
    ref.current = node;
  }, []);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
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

  if (as === 'li') {
    return <li ref={setRef} className={className} style={style}>{children}</li>;
  }

  if (as === 'section') {
    return <section ref={setRef} className={className} style={style}>{children}</section>;
  }

  return <div ref={setRef} className={className} style={style}>{children}</div>;
};
