import React from 'react';

// import categoriesFromServer from './api/categories';

interface Category {
  id: number,
  title: string,
  icon: string,
  ownerId: number,
}

type Props = {
  category: Category,
};

export const categoriy

export const Category: React.FC<Props> = ({ category }) => {
  const { title, icon } = category;

  return (
    <td data-cy="ProductCategory">
      {`${icon} - ${title}`}
    </td>
  );
};
