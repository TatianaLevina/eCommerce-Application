import type React from 'react';
import { Flex, Switch, Typography } from 'antd';

import type { SwitchItemProps } from './SwitchItemProps.interface';

const SwitchItem: React.FC<SwitchItemProps> = ({ text, ...props }: SwitchItemProps) => {
  const { Text } = Typography;

  return (
    <Flex gap="small">
      <Text>{text}</Text>
      <Switch {...props}></Switch>
    </Flex>
  );
};

export default SwitchItem;
