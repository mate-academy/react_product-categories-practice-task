import React from 'react';
import classNames from 'classnames';

import { Category } from '../../types/Category';

type Props = {
  categoriesFromServer: Category[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const Categories: React.FC<Props> = (props) => {
  const { categoriesFromServer, selectedCategory, setSelectedCategory } = props;

  return (
    <>
      <a
        href="#/"
        data-cy="AllCategories"
        className={classNames(
          'button is-success mr-6',
          {
            'is-outlined': selectedCategory === '',
          },
        )}
        onClick={(event) => {
          event.preventDefault();
          setSelectedCategory('');
        }}
      >
        All
      </a>

      {categoriesFromServer.map(category => (
        <a
          data-cy="Category"
          href="#/"
          key={category.id}
          className={classNames(
            'button mr-2 my-1',
            {
              'is-info': category.title === selectedCategory,
            },
          )}
          onClick={(event) => {
            event.preventDefault();
            setSelectedCategory(category.title);
          }}
        >
          {category.title}
        </a>
      ))}
    </>
  );
};
