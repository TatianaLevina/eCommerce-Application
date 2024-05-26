import type React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

const AddressBook: React.FC = () => {
  return (
    <>
      <h1 className="custom-title">My Profile</h1>
      <Title
        level={4}
        color="#376a4f"
        style={{
          color: '#376a4f',
          textAlign: 'left',
          marginTop: 10,
        }}
      >
        Address Book
      </Title>
    </>
  );
};
export default AddressBook;
