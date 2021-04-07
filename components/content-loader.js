import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';

export default function ContentLoader({ onClick }) {
  const B = 'content-loader';

  return (
    <div className={B}>
      <button
        className={`${B}__button`}
        type="button"
        onClick={onClick}
      >
        Показать еще
      </button>

      <style jsx>
        {`
        .${B} {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .${B}__button {
          background: #fff;
          color: #fff;
          height: 40px;
          padding: 0 20px;
          border: 2px solid ${styleVars.colors.green};
          color: ${styleVars.colors.green};
          border-radius: 20px;
          margin-bottom: 20px;
          cursor: pointer;
        }

        .${B}__button:hover {
          background: ${styleVars.colors.green};
          color: #fff;
        }
        `}
      </style>
    </div>
  );
}

ContentLoader.propTypes = {
  onClick: proptypes.func.isRequired,
};
