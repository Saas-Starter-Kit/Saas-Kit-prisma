import * as React from 'react';

// @see https://usehooks.com/useLockBodyScroll.
export function useLockBody() {
  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
}

export const useMutationObserver = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: MutationCallback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [ref, callback, options]);
};
