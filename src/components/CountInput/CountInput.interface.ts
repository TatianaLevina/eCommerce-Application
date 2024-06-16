import type React from 'react';

interface CountInputProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (value: number) => Promise<void>;
  minValue: number;
  maxValue: number;
  initialValue: number;
}

export default CountInputProps;
