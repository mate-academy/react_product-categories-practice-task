import { FC } from 'react';

import { User } from '../../Types/User';

type Props = {
  users: User[];
};

export const UserList: FC<Props> = ({ users }) => {
  return (
    <tbody>
      {users.map((user) => (
        <a
          data-cy="FilterAllUsers"
          href="#/"
          key={user.id}
        >
          {user.name}
        </a>
      ))}
    </tbody>
  );
};
