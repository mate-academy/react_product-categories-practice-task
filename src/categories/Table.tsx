import React from 'react';
import { Product } from '../types/Product';
import { EachProduct } from './EachProduct';
import { TableName } from './TableName';

interface Props {
  products: Product[],
}

export const Table: React.FC<Props> = ({ products }) => {
  const isProducts = products.length !== 0;

  return (
    <div className="box table-container">
      {!isProducts && (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      )}

      {isProducts && (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <TableName name="ID" />
              <TableName name="Product" />
              <TableName name="Category" />
              <TableName name="User" />
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <EachProduct product={product} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
