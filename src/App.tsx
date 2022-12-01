import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

enum SortType {
  ALL,
  GROCERY,
  DRINKS,
  FRUITS,
  ELECTRONICS,
  CLOTHES,
}

type ReorderOptions = {
  sortType: SortType,
};

export function getReorderedGoods(
  goods: string[],
  { sortType }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.filter((good) => {
    switch (sortType) {
      case (SortType.GROCERY): {
        return good;
      }

      case (SortType.DRINKS): {
        return good;
      }

      case (SortType.FRUITS): {
        return good;
      }

      case (SortType.ELECTRONICS): {
        return good;
      }

      case (SortType.CLOTHES): {
        return good;
      }

      default:
        return 0;
    }
  });

  return visibleGoods;
}

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  // const [sortType, setSortType] = useState(SortType.ALL);

  // const includesInProducts = (product: string): boolean => {
  //   return product.toLowerCase().includes(query.toLowerCase());
  // };

  // const visibleProducts = productsFromServer.filter(
  //   product => includesInProducts(product.name),
  // );

  // const reset = () => {
  //   setSortType(SortType.ALL);
  // };

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
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
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
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
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

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}

            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                // onClick={reset}

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
              <tr data-cy="Product">

                <td className="has-text-weight-bold" data-cy="ProductId">
                  {productsFromServer.map(product => product.id)}
                </td>

                <td data-cy="ProductName">
                  {productsFromServer.map(product => product.name)}
                </td>

                <td data-cy="ProductCategory">
                  {categoriesFromServer.map(category => `${category.icon} - ${category.title}`)}
                </td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
                >
                  {usersFromServer.map(user => user.name)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
