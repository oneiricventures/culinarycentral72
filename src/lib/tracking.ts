declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackConversion = (label: string, callback?: () => void) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `AW-17111166541/${label}`,
      value: 100,
      currency: 'INR',
      event_callback: callback,
    });
    // Safety net: if gtag is slow, still navigate after 800ms.
    if (callback) setTimeout(callback, 800);
  } else if (callback) {
    callback();
  }
};

export {};
