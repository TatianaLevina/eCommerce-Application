import { Button, Carousel, Flex, Modal, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import '@components/Product/Product.scss';
import type { Product } from '../Category/Category';
import { useState } from 'react';

const ProductComponent: React.FC = () => {
  const { Title, Text } = Typography;
  const { state } = useLocation();
  const { payload } = state;
  const product = payload as Product;
  const { name, description, masterVariant } = product;
  const { images, prices } = masterVariant;
  const discounted = prices.find((x) => x.discounted?.value.currencyCode === 'EUR')?.discounted;

  const [open, setOpen] = useState(false);

  const backClickHandler = () => {
    window.history.back();
  };

  const addClickHandler = () => {
    // TODO: Add to card
    console.log(`Add product ${product.id} to cart`);
  };

  const carouselClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el: HTMLElement = e.target as HTMLElement;
    const target: HTMLElement | null = el.closest('.product-carousel');

    if (target) {
      toggleModal(true);
    }
  };

  const toggleModal = (target: boolean) => {
    setOpen(target);
  };

  return (
    <>
      <Modal
        title={name['en-us']}
        open={open}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        footer=""
        width={'90vw'}
      >
        <Carousel draggable arrows infinite={false}>
          {images.map((img, idx) => {
            return (
              <div key={idx}>
                <img style={{ display: 'block', width: '90%', cursor: 'pointer' }} src={img.url} alt={name['en-us']} />
              </div>
            );
          })}
        </Carousel>
      </Modal>
      <Flex vertical onClick={(e) => carouselClickHandler(e)} justify="center" align="center" gap={'large'}>
        <Title>{name['en-us']}</Title>
        <div style={{ width: 320 }}>
          <Carousel autoplay className="product-carousel">
            {images.map((img, idx) => {
              return (
                <div key={idx}>
                  <img
                    style={{ display: 'block', width: '100%', cursor: 'pointer' }}
                    src={img.url}
                    alt={name['en-us']}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        <Text>{description['en-us']}</Text>
        <Text>Price: {prices.find((x) => x.value.currencyCode === 'EUR')?.value.centAmount}</Text>
        <Text>{discounted ? `Discount price: ${discounted.value.centAmount}` : ''}</Text>
        <Flex gap={20}>
          <Button className="custom-color" onClick={backClickHandler}>
            Back
          </Button>
          <Button className="primary-custom-color" onClick={addClickHandler} type="primary">
            Add to cart
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ProductComponent;
