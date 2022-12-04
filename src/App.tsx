import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

const getCategory = (category_id: number) => {
  const foundCategory = categoriesFromServer
    .find(category => category.id === category_id);

  return foundCategory || null;
};

const getOwner = (owner_id: number | null) => {
  const foundOwner = usersFromServer.find(user => user.id === owner_id);

  return foundOwner || null;
};

const productList = productsFromServer.map(product => {
  const category = getCategory(product.categoryId);
  const owner = category ? getOwner(category.ownerId) : null;

  const fullProduct = {
    ...product,
    category,
    owner,
  };

  return fullProduct;
});

export const App: React.FC = () => {
  const [productFilter, setProductFilter] = useState('');
  const [usersFilter, setUsersFilter] = useState(0);

  const filterProduct = () => {
    const filter = productFilter.toLowerCase();

    return productList.filter(product => (
      product.name.toLowerCase().includes(filter))
      && (usersFilter === 0 ? true : product.owner?.id === usersFilter));
  };

  const filteredProducts = filterProduct();

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={
                  () => setUsersFilter(0)
                }
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  onClick={
                    () => {
                      setUsersFilter(user.id);
                    }
                  }
                >
                  {user.name}
                </a>
              ))}

            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={productFilter}
                  onChange={event => setProductFilter(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  { (productFilter) && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => {
                        setProductFilter('');
                      }}
                    >
                      x
                    </button>
                  )}

                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(product => {
                const {
                  id,
                  name,
                  category,
                  owner,
                } = product;

                return (
                  <tr data-cy="Product" key={product.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {id}
                    </td>

                    <td data-cy="ProductName">{name}</td>
                    <td data-cy="ProductCategory">{`${category?.icon} - ${category?.title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={
                        classNames('has-text-link',
                          {
                            'has-text-link': owner?.sex === 'm',
                            'has-text-danger': owner?.sex === 'f',
                          })
                      }
                    >
                      {owner?.name}
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
