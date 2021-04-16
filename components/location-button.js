import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function LocationButton({ onClick, storeName }) {
  const B = 'location-button';

  return (
    <button type="button" className={B} onClick={onClick}>
      <div className={`${B}__text`}>{storeName}</div>

      <style jsx global>
        {`
        .${B} {
          display: flex;
          background: none;
          border: none;
          outline: none;
          margin-left: auto;
          padding: 0 ${styleVars.padding}px;
          cursor: pointer;
          align-items: center;
        }

        .${B}__text {
          color: #fff;
          white-space: nowrap;
        }

        .${B}:hover {
          opacity: .8;
        }

        .${B}::before {
          content: '';
          display: block;
          width: 16px;
          height: 16px;
          margin-right: 0px;
          background-image: url(/images/location.svg);
          background-size: contain;
          background-repeat: no-repeat;
        }

        @media (max-width: 700px) {
          .${B} {
            font-size: 14px;
          }
        }
      `}
      </style>
    </button>
  );
}

LocationButton.propTypes = {
  storeName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
