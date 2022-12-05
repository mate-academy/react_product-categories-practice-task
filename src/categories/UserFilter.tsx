import React from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

interface Props {
  users: User[],
  selectedUser: string,
  onSelect: (query: string) => void,
}

export const UserFilter: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
}) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={classNames({
          'is-active': selectedUser === 'All',
        })}
        onClick={() => onSelect('All')}
      >
        All
      </a>

      {users.map(user => (
        <a
          data-cy="FilterUser"
          key={user.id}
          href="#/"
          className={classNames({
            'is-active': selectedUser === user.name,
          })}
          onClick={() => onSelect(user.name)}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
