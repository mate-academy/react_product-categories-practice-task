import React from 'react';

interface User {
  id: number,
  name: string,
  sex: string,
}

type Props = {
  user: User,
};

export const User: React.FC<Props> = ({ user }) => {
  const { name } = user;

  return (
    <td
      data-cy="ProductUser"
      className="has-text-link"
    >
      {name}
    </td>
  );
};
