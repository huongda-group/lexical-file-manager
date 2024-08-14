import React, { useMemo } from 'react';

export type Props = {
  byte: number;
};

const Byte = ({ byte }: Props) => {
  const result = useMemo(() => {
    if (1024 < byte && byte <= Math.pow(1024, 2)) {
      return (byte / 1024).toFixed(2) + ' KB';
    }
    if (Math.pow(1024, 2) < byte && byte <= Math.pow(1024, 3)) {
      return (byte / Math.pow(1024, 2)).toFixed(2) + ' MB';
    }
    if (Math.pow(1024, 3) < byte && byte <= Math.pow(1024, 4)) {
      return (byte / Math.pow(1024, 3)).toFixed(2) + ' GB';
    }
    if (Math.pow(1024, 4) < byte && byte <= Math.pow(1024, 5)) {
      return (byte / Math.pow(1024, 4)).toFixed(2) + ' TB';
    }
    return byte.toString() + ' byte';
  }, [byte]);
  return (
    <span className="text-center" style={{ color: '#0000009e' }}>
      {' '}
      {result}
    </span>
  );
};

export default Byte;
