import React from 'react';

type AlertBoxProps = {
  type: 'success' | 'error';
  message: string;
  closable?: boolean;
};

export const AlertBox: React.FC<AlertBoxProps> = ({ type, message, closable = false }) => {
  return (
    <div
      role="alert"
      style={{
        border: '1px solid',
        padding: '1rem',
        color: type === 'success' ? 'green' : 'red',
      }}
    >
      <strong>{type === 'success' ? 'Success:' : 'Error:'}</strong> {message}
      {closable && <button aria-label="close-button">x</button>}
    </div>
  );
};
