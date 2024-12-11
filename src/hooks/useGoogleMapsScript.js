import { useState, useEffect } from 'react';

export default function useGoogleMapsScript(apiKey, libraries = ['places']) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Function to load the script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsLoaded(true);
      };

      script.onerror = (error) => {
        setLoadError(error);
        console.error('Error loading Google Maps script:', error);
      };

      document.head.appendChild(script);

      // Cleanup function
      return () => {
        document.head.removeChild(script);
      };
    };

    loadGoogleMapsScript();
  }, [apiKey, libraries]);

  return { isLoaded, loadError };
}