declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackConversion = (label: string, callback?: () => void) => {
  if (typeof window === 'undefined' || !window.gtag) {
    if (callback) callback();
    return;
  }

  let fired = false;
  const fireOnce = callback
    ? () => {
        if (fired) return;
        fired = true;
        callback();
      }
    : undefined;

  window.gtag('event', 'conversion', {
    send_to: `AW-17111166541/${label}`,
    value: 100,
    currency: 'INR',
    event_callback: fireOnce,
  });

  // Safety net: if gtag's event_callback is slow or never fires, navigate after 800ms.
  if (fireOnce) setTimeout(fireOnce, 800);
};

export {};
