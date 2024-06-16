import type React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Breadcrumb, Dropdown } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { useBreadcrumbs } from '@contexts/BreadcrumbsContext.tsx';
import { useCategory } from '@contexts/CategoriesContext.tsx';

const Breadcrumbs: React.FC = () => {
  const { items } = useBreadcrumbs();
  const { categories } = useCategory();
  const navigate = useNavigate();
  const categoriesMenuItems:
    | {
        key: string;
        label: string;
      }[]
    | undefined = categories?.map((category) => ({
    key: category.slug['en-US'],
    label: category.name['en-US'],
  }));

  const handleMenuClick = ({ key }: { key: string }): void => {
    navigate(`/catalog/${key}`);
  };

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
