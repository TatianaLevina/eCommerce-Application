import type React from 'react';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';

import NOTFOUND from '@images/not-found-page.svg';

const ErrorPage: React.FC = () => {
  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];

  const alignOptions = ['flex-start', 'center', 'flex-end'];
  return (
    <Flex gap="large" justify={justifyOptions[1]} vertical align={alignOptions[1]} style={{ paddingTop: 20 }}>
      <Link to="/" style={{ lineHeight: '0px' }}>
        <img src={NOTFOUND} className="custom-img" alt="404 You lost Sweet Home" />
      </Link>
      <Link to="/">
        <Button size="large" className={'custom-color_invert'} ghost>
          Sweet Home
        </Button>
      </Link>
    </Flex>
  );
};
export default ErrorPage;
