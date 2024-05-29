import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Typography, Button, Modal, Carousel, Dropdown } from 'antd';
import { getSingleProductService } from '@services/ProductsService.ts';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import { useBreadcrumbs } from '@contexts/BreadcrumbsContext.tsx';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.tsx';
import '@pages/ProductPage/ProductPage.scss';
import type { Product } from '@commercetools/platform-sdk';
import { DownOutlined, HomeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProductPage: React.FC = () => {
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
      <Breadcrumbs />
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
        <div className="product-page__image-wrapper">
          <div className="product-page__carusel-box">
            <Carousel autoplay className="product-page__product-carousel">
              {images?.map((img, idx) => (
                <div key={idx}>
                  <img
                    style={{ display: 'block', width: '100%', cursor: 'pointer' }}
                    src={img.url}
                    alt={name['en-US']}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div>
            {/* <img
              src="https://e7.pngegg.com/pngimages/524/289/png-clipart-red-and-white-special-discount-icon-special-discount-sign-miscellaneous-discount-signs-thumbnail.png"
              alt="Discount"
            /> */}
            {discounted ? (
              <div className="glow product-page__discount-text">
                DISCOUNT{' '}
                <span>
                  {Math.ceil(
                    (((prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0) -
                      discounted!.value.centAmount) /
                      (prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0)) *
                      100,
                  )}
                </span>{' '}
                % OFF
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        {description && <Paragraph className="base-text">{description['en-US']}</Paragraph>}
        <Paragraph className={`base-text ${discounted ? 'base-text_through' : ''}`}>
          Price: {formatPrice(prices?.find((x) => x.value.currencyCode === 'USD')?.value.centAmount || 0)} USD
        </Paragraph>
        <Paragraph className="base-text_colored">
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
