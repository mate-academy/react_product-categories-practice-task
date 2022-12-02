import React from 'react';
import { Product } from './types/Product';
import { ProductInfo } from './ProductInfo';

interface Props {
  products: Product[],
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <tbody>
      {products.map(product => (
        <ProductInfo key={product.id} product={product} />
      ))}
    </tbody>
  );
};
