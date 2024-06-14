interface CountInputProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (value: number) => Promise<number | undefined>;
  maxValue: number;
  minValue: number;
}

export default CountInputProps;
