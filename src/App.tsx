import React, { useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Product } from './types/Product';
import { Category } from './types/Category';
import { Table } from './categories/Table';
import { CategoriesFilter } from './categories/CategoriesFilter';
import { Query } from './categories/Query';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { UserFilter } from './categories/UserFilter';
import { Reset } from './categories/Reset';

function getUser(userId: number): User | null {
  const foundUserById = usersFromServer
    .find(user => user.id === userId);

  return foundUserById || null;
}

function getCategory(categoryId: number): Category | null {
  const foundCategoryById = categoriesFromServer
    .find(category => category.id === categoryId);

  return foundCategoryById || null;
}

const products: Product[] = productsFromServer
  .map(product => {
    const category = getCategory(product.categoryId);
    let user = null;

    if (category) {
      user = getUser(category?.ownerId);
    }

    return ({
      ...product,
      category,
      user,
    });
  });

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  let visibleProducts = [...products];

  const selectUser = (userName: string) => {
    return setSelectedUser(userName);
  };

  const resetQuery = () => {
    return setQuery('');
  };

  const resetAllFilters = () => {
    setSelectedUser('All');
    setQuery('');
    setSelectedCategory('All');
  };

  if (selectedUser !== 'All') {
    visibleProducts = products
      .filter(product => product.user?.name === selectedUser);
  }

  if (selectedCategory !== 'All') {
    visibleProducts = visibleProducts
      .filter(product => product.category?.title === selectedCategory);
  }

  if (query !== '') {
    visibleProducts = visibleProducts
      .filter(product => {
        const normalizedQuery = query.toLocaleLowerCase();
        const normalizedName = product.name.toLocaleLowerCase();

        return normalizedName.includes(normalizedQuery);
      });
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserFilter
              users={usersFromServer}
              selectedUser={selectedUser}
              onSelect={(userName) => selectUser(userName)}
            />

            <Query
              query={query}
              onReset={() => resetQuery()}
              onType={(typedQuery: string) => setQuery(typedQuery)}
            />

            <CategoriesFilter
              categories={categoriesFromServer}
              selectedCategory={selectedCategory}
              onSelect={(category: string) => setSelectedCategory(category)}
            />

            <Reset onReset={() => resetAllFilters()} />
          </nav>
        </div>

        <Table products={visibleProducts} />
      </div>
    </div>
  );
};
