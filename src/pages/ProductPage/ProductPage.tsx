import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Typography, Button, Modal, Carousel, Dropdown, Flex, Tag } from 'antd';
import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import type { Product } from '@commercetools/platform-sdk';

import { getSingleProductService } from '@services/ProductsService';
import { useCategory } from '@contexts/CategoriesContext';
import { useBreadcrumbs } from '@contexts/BreadcrumbsContext';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import { useCart } from '@/contexts/CartContext';
import '@pages/ProductPage/ProductPage.scss';
import { formatPrice } from '@utils/formatPrice.ts';

const ProductPage: React.FC = () => {
  const { Title, Paragraph } = Typography;
  const {
    state: { cart },
    addToCart,
    removeFromCart,
  } = useCart();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { categories } = useCategory();
  const { setItems } = useBreadcrumbs();

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const response = await getSingleProductService(productId);
        if (response) {
          setProduct(response);
          setItems([
            { href: '/', title: <HomeOutlined /> },
            { href: '/catalog', title: 'Catalog' },
            {
              title: (
                <Dropdown
                  menu={{
                    items: categories?.map((cat) => ({
                      key: cat.slug['en-US'],
                      label: cat.name['en-US'],
                    })),
                    onClick: ({ key }) => navigate(`/catalog/${key}`),
                  }}
                  trigger={['click']}
                >
                  <span>
                    Category <DownOutlined />
                  </span>
                </Dropdown>
              ),
            },
            { title: response.masterData.current.name['en-US'] },
          ]);
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId, categories, setItems, navigate]);

  if (loading) {
    return <Spin spinning={loading} />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const currentData = product.masterData.current;
  const { name, description, metaDescription, masterVariant } = currentData;
  const { images, prices, attributes } = masterVariant;
  const discounted = prices?.find((x) => x.discounted?.value.currencyCode === 'USD')?.discounted;

  const designer = attributes?.find((x) => x.name === 'designer')?.value;
  const material = attributes?.find((x) => x.name === 'material')?.value.label['en-US'];

  const backClickHandler = (): void => {
    navigate(-1);
  };

  const carouselClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const el: HTMLElement = e.target as HTMLElement;
    const target: HTMLElement | null = el.closest('.product-page__product-carousel');

    if (target && el.tagName !== 'BUTTON') {
      toggleModal(true);
    }
  };

  const toggleModal = (target: boolean): void => {
    setOpen(target);
  };

  const clickAddToCartHandler = async (): Promise<void> => {
    if (masterVariant.sku) {
      await addToCart(masterVariant.sku, 1);
    }
  };

  const clickRemoveFromCartHandler = async (): Promise<void> => {
    const lineItemId = cart?.lineItems.find((item) => item.productId === product.id)?.id;
    if (lineItemId) {
      await removeFromCart(lineItemId);
    }
  };

  const isInCart: boolean | undefined = cart?.lineItems.some((item) => item.productId === product.id);

  return (
    <>
      <Breadcrumbs />
      <Modal
        title={name['en-US']}
        open={open}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        footer=""
        style={{ maxWidth: '90vw', maxHeight: '90vh' }}
      >
        <Carousel draggable arrows infinite={false}>
          {images?.map((img, idx) => (
            <div key={idx}>
              <img
                style={{ display: 'block', width: '100%', cursor: 'pointer' }}
                src={img.url}
                alt={name['en-US']}
              ></img>
            </div>
          ))}
        </Carousel>
      </Modal>
      <div className="product-page" onClick={carouselClickHandler}>
        <Flex wrap gap="middle" justify="center" align="center" style={{ margin: '20px 0' }}>
          <div className="product-page__carousel-box">
            <Carousel autoplay className="product-page__product-carousel">
              {images?.map((img, idx) => (
                <div key={idx}>
                  <img
                    style={{ display: 'block', width: '100%', cursor: 'pointer' }}
                    src={img.url}
                    alt={name['en-US']}
                  ></img>
                </div>
              ))}
            </Carousel>
          </div>
          <Flex vertical className="product-page__description-box">
            <Title style={{ margin: '0 0 10px 0', textAlign: 'left', color: '#376a4f' }}>{name['en-US']}</Title>
            {description ? (
              <Paragraph className="base-text">{description['en-US']}</Paragraph>
            ) : (
              metaDescription && <Paragraph className="base-text">{metaDescription['en-US']}</Paragraph>
            )}
            {designer && (
              <Paragraph className="base-text">
                <span style={{ fontWeight: '600', color: '#376a4f' }}>Manufacturer:</span> {designer}
              </Paragraph>
            )}
            {material && (
              <Paragraph className="base-text">
                <span style={{ fontWeight: '600', color: '#376a4f' }}>Material:</span> {material}
              </Paragraph>
            )}
            <Flex gap="middle" align="center">
              {discounted ? (
                <>
                  <Paragraph className="base-text_colored" style={{ marginBottom: '16px' }}>
                    {formatPrice(discounted.value.centAmount)} USD
                  </Paragraph>
                  <Paragraph className="base-text base-text_through" style={{ fontSize: '16px', color: 'grey' }}>
                    {formatPrice(prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0)} USD
                  </Paragraph>
                  <Tag color="grey" style={{ marginBottom: '16px' }}>
                    -
                    <span>
                      {Math.ceil(
                        (((prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0) -
                          discounted!.value.centAmount) /
                          (prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0)) *
                          100,
                      )}
                    </span>
                    %
                  </Tag>
                </>
              ) : (
                // <></>
                <Paragraph className="base-text" style={{ fontSize: '20px', fontWeight: 'bold', color: '#376a4f' }}>
                  {formatPrice(prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0)} USD
                </Paragraph>
              )}
            </Flex>

            <Flex gap="middle" justify="right">
              {!isInCart ? (
                <Button className="primary-custom-color" onClick={clickAddToCartHandler}>
                  Add to Cart
                </Button>
              ) : (
                <Button className="primary-custom-color" onClick={clickRemoveFromCartHandler}>
                  Remove from Cart
                </Button>
              )}
              <Button className="custom-color" onClick={backClickHandler}>
                Back
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default ProductPage;
