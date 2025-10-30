'use client';

import { useAlerts } from '../../../hooks/useAlerts';
import ToastAlert from './ToastAlert';

export function AlertContainer() {
  const { alerts, removeAlert } = useAlerts();

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map((alert) => (
        <ToastAlert
          key={alert.id}
          message={alert.message}
          variant={alert.variant}
          onClose={() => removeAlert(alert.id)}
          duration={alert.duration}
          position="top-right"
        />
      ))}
    </div>
  );
}