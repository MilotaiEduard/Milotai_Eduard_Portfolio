import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    if (!window.gtag) {
      const script1 = document.createElement("script");
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
      `;
      document.head.appendChild(script2);
    }

    window.gtag("config", GA_TRACKING_ID, { page_path: location.pathname });
  }, [location]);

  return null;
};

export default usePageTracking;
