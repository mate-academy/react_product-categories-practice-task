import React from 'react';
import classNames from 'classnames';

import { User } from '../../types/User';

type Props = {
  usersFromServer: User[];
  filterUser: string;
  setFilterUser: React.Dispatch<React.SetStateAction<string>>;
};

export const Users: React.FC<Props> = (props) => {
  const { usersFromServer, filterUser, setFilterUser } = props;

  return (
    <>
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={classNames({
          'is-active': filterUser === '',
        })}
        onClick={(event) => {
          event.preventDefault();
          setFilterUser('');
        }}
      >
        All
      </a>

      {usersFromServer.map(user => (
        <a
          data-cy="FilterUser"
          href="#/"
          key={user.id}
          className={classNames({
            'is-active': filterUser === user.name,
          })}
          onClick={(event) => {
            event.preventDefault();
            setFilterUser(user.name);
          }}
        >
          {user.name}
        </a>
      ))}
    </>
  );
};
