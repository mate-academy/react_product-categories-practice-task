import React from 'react';
import className from 'classnames';

import usersFromServer from '../../api/users';
import categoriesFromServer from '../../api/categories';

import { User } from '../../types/user';
import { Category } from '../../types/category';

type Props = {
  query: string;
  selectedUser: number;
  setQuery: (input: string) => void;
  setSelectedUser: (user: number) => void;
  reset: () => void;
};

export const Filter: React.FC<Props> = (props) => {
  const {
    query,
    selectedUser,
    setQuery,
    setSelectedUser,
    reset,
  } = props;

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            href="#/"
            className={className({
              'is-active': !selectedUser,
            })}
            onClick={() => setSelectedUser(0)}
          >
            All
          </a>

          {usersFromServer.map((user: User) => {
            const { id, name } = user;

            return (
              <a
                data-cy="FilterUser"
                href="#/"
                className={className({
                  'is-active': selectedUser === id,
                })}
              >
                {name}
              </a>
            );
          })}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              {query && (
                <button
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                  aria-hidden
                  onClick={() => setQuery('')}
                />
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

          {categoriesFromServer.map((category: Category) => {
            const { id, title } = category;

            return (
              <a
                key={id}
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                {title}
              </a>
            );
          })}
        </div>

        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
            onClick={reset}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
