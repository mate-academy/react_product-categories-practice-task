import classNames from 'classnames';

import { Product } from '../../Types/Product';

type Props = {
  product: Product;
};

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    category,
    owner,
  } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">{`${category?.icon} - ${category?.title}`}</td>

      <td
        data-cy="ProductUser"
        className={classNames(
          { 'has-text-link': owner?.sex === 'm' },
          { 'has-text-danger': owner?.sex === 'f' },
        )}
      >
        {owner?.name}
      </td>
    </tr>
  );
};
