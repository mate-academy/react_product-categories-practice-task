import { FC } from 'react';
import { Product } from '../../Types/Product';

import { ProductInfo } from '../ProductInfo/ProductInfo';

type Props = {
  products: Product[];
};

export const ProductsList: FC<Props> = ({ products }) => {
  return (
    <tbody>
      {products.map((product) => (
        <ProductInfo key={product.id} product={product} />
      ))}
    </tbody>
  );
};
