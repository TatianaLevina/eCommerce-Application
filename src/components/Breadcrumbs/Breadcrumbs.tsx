import type React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumbs } from '@contexts/BreadcrumbsContext.tsx';
import { useCategory } from '@contexts/CategoriesContext.tsx';

const Breadcrumbs: React.FC = () => {
  const { items } = useBreadcrumbs();
  const { categories } = useCategory();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/catalog/${key}`);
  };

  const categoriesMenuItems = categories?.map((category) => ({
    key: category.slug['en-US'],
    label: category.name['en-US'],
  }));

  const categoriesMenu: MenuProps = {
    items: categoriesMenuItems,
    onClick: handleMenuClick,
  };

  const breadcrumbItems = items.map((item) => {
    if (item.menu) {
      return {
        title: (
          <a onClick={(e) => e.preventDefault()}>
            <Dropdown menu={categoriesMenu} trigger={['click']}>
              <span>
                {item.title} <DownOutlined />
              </span>
            </Dropdown>
          </a>
        ),
      };
    }
    return {
      href: item.href,
      title: item.title,
    };
  });

  return <Breadcrumb items={breadcrumbItems} />;
};

export default Breadcrumbs;