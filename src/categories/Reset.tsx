import React from 'react';

interface Props {
  onReset: () => void,
}

export const Reset: React.FC<Props> = ({
  onReset,
}) => {
  return (
    <div className="panel-block">
      <a
        data-cy="ResetAllButton"
        href="#/"
        className="button is-link is-outlined is-fullwidth"
        onClick={() => onReset()}
      >
        Reset all filters
      </a>
    </div>
  );
};
