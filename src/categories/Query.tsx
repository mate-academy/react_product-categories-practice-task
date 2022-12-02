import React from 'react';

interface Props {
  query: string,
  onReset: () => void,
  onType: (query: string) => void,
}

export const Query: React.FC<Props> = ({
  query,
  onReset,
  onType,
}) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={query}
          onChange={(event) => onType(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        {query !== '' && (
          <span className="icon is-right">
            { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */ }
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={() => onReset()}
            />
          </span>
        )}
      </p>
    </div>
  );
};
