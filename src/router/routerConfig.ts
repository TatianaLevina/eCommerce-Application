import HomePage from '@pages/HomePage/HomePage.tsx';
import AboutPage from '@pages/AboutPage/AboutPage.tsx';
import RegisterPage from '@pages/RegisterPage/RegisterPage.tsx';
import ProfilePage from '@pages/ProfilePage/ProfilePage.tsx';
import CartPage from '@pages/CartPage/CartPage.tsx';
import LoginPage from '@pages/LoginPage/LoginPage.tsx';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import CatalogPage from '@/pages/CatalogPage/CatalogPage';
import CatalogMainPage from '@/pages/CatalogPage/CatalogMainPage';
import CategoryPage from '@/pages/CategoryPage/CategoryPage';
import ProductPage from '@/pages/ProductPage/ProductPage'; // Ensure this page exists

const routes = [
  {
    path: '/',
    element: HomePage,
    protected: undefined,
  },
  {
    path: '/about',
    element: AboutPage,
    protected: undefined,
  },
  {
    path: '/catalog',
    element: CatalogPage,
    protected: undefined,
    children: [
      { path: '', element: CatalogMainPage },
      { path: ':slug', element: CategoryPage },
      { path: ':slug/product/:productId', element: ProductPage },
    ],
  },
  {
    path: '/login',
    element: LoginPage,
    protected: 'guest',
  },
  {
    path: '/register',
    element: RegisterPage,
    protected: 'guest',
  },
  {
    path: '/cart',
    element: CartPage,
    protected: undefined,
  },
  {
    path: '/profile',
    element: ProfilePage,
    protected: 'auth',
  },
  {
    path: '*',
    element: ErrorPage,
    protected: undefined,
  },
];

export default routes;
