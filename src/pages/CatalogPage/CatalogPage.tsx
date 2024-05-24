import { Spin } from 'antd';
import { useCategory } from '@contexts/CategoriesContext.tsx';
import { getProductsByParamsService, getSingleProductService } from '@services/ProductsService.ts';

export default function CatalogPage() {
  const { categories, loading } = useCategory();

  // f2b931a3-3ff1-4505-8fec-e67a719125b5 is a test id of a product

  getSingleProductService('f2b931a3-3ff1-4505-8fec-e67a719125b5').then((response) =>
    console.log('getSingleProductService test response', response),
  );

  // getAllProductsService().then((response) => console.log('getAllProductsService test response', response));

  // Test getProductsByParamsService with queryArgs
  const queryArgs = {
    // staged: false,
    fuzzy: true,
    'text.en-US': 'Pillow', // Search
    filter: [
      'variants.price.centAmount:range (1 to 20000)', // Price range in cents
      // 'categories.id:"969382e3-fe66-4a64-a571-584d291cc196"', // Category id
      // 'variants.attributes.color:"red","blue"',
      // 'variants.attributes.material:"wood","metal"',
    ],
    sort: ['name.en-us desc'], // Sort by name in ascending(A->W)/descending(W->A) order (asc/desc)
    offset: 0,
    limit: 8, // Adjust the limit as needed
  };

  getProductsByParamsService(queryArgs)
    .then((response) => {
      console.log('getProductsByParamsService test response:', response);
    })
    .catch((error) => {
      console.error('getProductsByParamsService test error', error);
    });

  return (
    <div>
      <h1 className="custom-title">Catalog Page</h1>
      <Spin spinning={loading}>
        <ul>{categories?.map((category) => <li key={category.id}>{category.name['en-US']}</li>)}</ul>
      </Spin>
    </div>
  );
}
