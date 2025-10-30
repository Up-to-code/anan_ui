'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface Alert {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const removeAlertRef = useRef<(id: string) => void>(() => {});

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  // Always keep the latest removeAlert in ref via effect to avoid set ref during render
  useEffect(() => {
    removeAlertRef.current = removeAlert;
  }, [removeAlert]);

  const addAlert = useCallback((
    message: string,
    variant: Alert['variant'] = 'info',
    duration = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert: Alert = { id, message, variant, duration };

    setAlerts(prev => [...prev, newAlert]);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeAlertRef.current(id);
      }, duration);
    }

    return id;
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    alerts,
    addAlert,
    removeAlert,
    clearAlerts
  };
}