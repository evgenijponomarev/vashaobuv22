import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function DialogCloser({ onClick, mix }) {
  const B = 'dialog-closer';

  return (
    <>
      <button
        type="button"
        className={[B, mix].join(' ')}
        onClick={onClick}
      >
        Закрыть
      </button>

      <style jsx>
        {`
        .${B} {
          width: 40px;
          height: 40px;
          background: url(/images/close.svg);
          cursor: pointer;
          transition: transform ${styleVars.transitionTime};
          font-size: 0;
          border: none;
        }

        .${B}:hover,
        .${B}:focus {
          transform: rotate(90deg);
          outline: none;
        }
        `}
      </style>
    </>
  );
}

DialogCloser.defaultProps = {
  mix: '',
};

DialogCloser.propTypes = {
  onClick: PropTypes.func.isRequired,
  mix: PropTypes.string,
};
