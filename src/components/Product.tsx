import React from 'react';
// import { Category } from './Category';
// import { User } from './User';

interface Product {
  id: number,
  name: string,
  categoryId: number,
}

type Props = {
  product: Product,
};

export const Product: React.FC<Props> = ({ product }) => {
  const { id, name, categoryId } = product;

  return (
    <>
      <tr data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          {id}
        </td>

        <td data-cy="ProductName">{name}</td>
        {/* <Category /> */}
        <td data-cy="ProductCategory">
          {`🍺 - ${categoryId}`}
        </td>

        {/* < User /> */}

        {/* <td
          data-cy="ProductUser"
          className="has-text-link"
        >
          Max
        </td> */}
      </tr>
    </>
  );
};
