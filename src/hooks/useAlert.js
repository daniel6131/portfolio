import { useState, useCallback, useRef, useEffect } from 'react';

const ALERT_TIMEOUT_MS = 5000;

export const useAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    text: '',
    type: 'success',
  });
  const timeoutRef = useRef(null);

  const showAlert = useCallback(({ text, type = 'success' }) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAlert({ show: true, text, type });

    timeoutRef.current = setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, ALERT_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { alert, showAlert };
};
