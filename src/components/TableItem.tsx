import classNames from 'classnames';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const TableItem: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    category,
  } = product;

  const isBoy = category?.owner?.sex === 'm';

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
          {
            'has-text-link': isBoy,
          },
          {
            'has-text-danger': !isBoy,
          },
        )}
      >
        {category?.owner?.name}
      </td>
    </tr>
  );
};
