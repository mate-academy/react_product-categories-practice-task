import React from 'react';
import classNames from 'classnames';

import { Category } from '../types/Category';

interface Props {
  categories: Category[],
  selectedCategory: string,
  onSelect: (category: string) => void,
}

export const CategoriesFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={classNames('button is-success mr-6',
          {
            'is-outlined': selectedCategory !== 'All',
            'is-info': selectedCategory === 'All',
          })}
        onClick={() => onSelect('All')}
      >
        All
      </a>

      {categories.map(category => (
        <a
          data-cy="Category"
          key={category.id}
          className={classNames('button mr-2 my-1',
            {
              'is-info': selectedCategory === category.title,
            })}
          href="#/"
          onClick={() => onSelect(category.title)}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
