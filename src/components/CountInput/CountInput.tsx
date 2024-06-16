import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import '@components/CountInput/CountInput.scss';
import type CountInputProps from '@components/CountInput/CountInput.interface';

const CountInput: React.FC<CountInputProps> = (props: CountInputProps) => {
  const { className, style, onChange, maxValue, minValue, initialValue } = props;
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<string>(initialValue.toString());
  const [disabledDecrement, setDisabledDecrement] = useState(initialValue <= minValue);
  const [disabledIncrement, setDisabledIncrement] = useState(initialValue >= maxValue);

  useEffect(() => {
    setValue(initialValue.toString());
    setDisabledDecrement(initialValue <= minValue);
    setDisabledIncrement(initialValue >= maxValue);
  }, [initialValue, minValue, maxValue]);

  const switchOnOffButtons = (value: number) => {
    setDisabledDecrement(value <= minValue);
    setDisabledIncrement(value >= maxValue);
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
        className="custom-color count-input__button count-input__button_decrement"
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
