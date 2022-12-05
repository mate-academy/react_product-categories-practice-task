import React from 'react';

interface Props {
  name: string;
}

export const TableName: React.FC<Props> = ({ name }) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {name}
      <a href="#/">
        <span className="icon">
          <i data-cy="SortIcon" className="fas fa-sort" />
        </span>
      </a>
    </span>
  </th>
);
