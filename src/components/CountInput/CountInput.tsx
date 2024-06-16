import React, { useState } from 'react';
import { Button } from 'antd';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import '@components/CountInput/CountInput.scss';
import type CountInputProps from '@components/CountInput/CountInput.interface';

const CountInput: React.FC<CountInputProps> = (props: CountInputProps) => {
  const { className, style, onChange, maxValue, minValue } = props;
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('1');
  const [disabledDecrement, setDisabledDecrement] = useState(+value <= minValue);
  const [disabledIncrement, setdIsabledIncrement] = useState(+value >= maxValue);

  const switchOnOffButtons = (value: number): void => {
    setDisabledDecrement(+value <= minValue);
    setdIsabledIncrement(+value >= maxValue);
  };

  const changeValue = (value: number): void => {
    setDisabled(true);
    if (onChange) {
      onChange(value).then(() => {
        switchOnOffButtons(value);
        setValue(value.toString());
        setDisabled(false);
      });
    }
  };

  const incrementValue = (): void => {
    changeValue(+value + 1);
  };

  const decrementValue = (): void => {
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
