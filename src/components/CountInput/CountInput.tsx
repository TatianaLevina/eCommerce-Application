import React, { useState } from 'react';
import '@components/CountInput/CountInput.scss';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface CountInputProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (value: number) => Promise<number | undefined>;
  maxValue: number;
  minValue: number;
}

const CountInput: React.FC<CountInputProps> = (props: CountInputProps) => {
  const { className, style, onChange, maxValue, minValue } = props;
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('1');
  const [disabledDecrement, setDisabledDecrement] = useState(+value <= minValue);
  const [disabledIncrement, setdIsabledIncrement] = useState(+value >= maxValue);

  const switchOnOffButtons = (value: number) => {
    setDisabledDecrement(+value <= minValue);
    setdIsabledIncrement(+value >= maxValue);
  };

  const changeValue = (value: number) => {
    setDisabled(true);
    if (onChange) {
      onChange(value).then(() => {
        switchOnOffButtons(value);
        setValue(value.toString());
        setDisabled(false);
      });
    }
  };

  const incrementValue = () => {
    changeValue(+value + 1);
  };

  const decrementValue = () => {
    changeValue(+value - 1);
  };

  return (
    <div className={`count-input ${className ?? ''}`} style={style}>
      <Button
        disabled={disabled || disabledDecrement}
        onClick={decrementValue}
        className="custom-color count-input__button count-input__button_dectement"
      >
        <MinusOutlined />
      </Button>
      <div className="count-input__display">{value}</div>
      <Button
        disabled={disabled || disabledIncrement}
        onClick={incrementValue}
        className="custom-color count-input__button count-input__button_increment"
      >
        <PlusOutlined />
      </Button>
    </div>
  );
};

export default React.memo(CountInput);
