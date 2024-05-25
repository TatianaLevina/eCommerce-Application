import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Typography, Button, Modal, Carousel } from 'antd';
import type { Product } from '@commercetools/platform-sdk';
import { getSingleProductService } from '@services/ProductsService.ts';
import '@pages/ProductPage/ProductPage.scss';

const { Title, Paragraph } = Typography;

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const response = await getSingleProductService(productId);
        if (response) {
          setProduct(response);
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <Spin spinning={loading} />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const formatPrice = (centAmount: number) => (centAmount / 100).toFixed(2);

  const currentData = product.masterData.current;
  const { name, description, masterVariant } = currentData;
  const { images, prices } = masterVariant;
  const discounted = prices?.find((x) => x.discounted?.value.currencyCode === 'USD')?.discounted;

  const backClickHandler = () => {
    navigate(-1);
  };

  const addClickHandler = () => {
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
        title={name['en-US']}
        open={open}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        footer=""
        width={'90vw'}
      >
        <Carousel draggable arrows infinite={false}>
          {images?.map((img, idx) => (
            <div key={idx}>
              <img style={{ display: 'block', width: '90%', cursor: 'pointer' }} src={img.url} alt={name['en-US']} />
            </div>
          ))}
        </Carousel>
      </Modal>
      <div className="product-page" onClick={(e) => carouselClickHandler(e)}>
        <Title className="custom-title">{name['en-US']}</Title>
        <div style={{ width: 320 }}>
          <Carousel autoplay className="product-carousel">
            {images?.map((img, idx) => (
              <div key={idx}>
                <img style={{ display: 'block', width: '100%', cursor: 'pointer' }} src={img.url} alt={name['en-US']} />
              </div>
            ))}
          </Carousel>
        </div>
        <Paragraph className="base-text">{description ? description['en-US'] : 'No description available'}</Paragraph>
        <Paragraph className="base-text">
          Price: {formatPrice(prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0)} USD
        </Paragraph>
        <Paragraph className="base-text">
          {discounted ? `Discount price: ${formatPrice(discounted.value.centAmount)} USD` : ''}
        </Paragraph>
        <div style={{ display: 'flex', gap: 20 }}>
          <Button className="custom-color" onClick={backClickHandler}>
            Back
          </Button>
          <Button className="primary-custom-color" onClick={addClickHandler} type="primary">
            Add to cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
