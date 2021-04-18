import Link from 'next/link';
import PropTypes from '../lib/prop-types';
import DialogOverlay from './dialog-overlay';
import DialogWindow from './dialog-window';
import styleVars from '../styles/vars';

export default function LocationDialog({
  pathname,
  stores,
  onClose,
}) {
  const B = 'location-dialog';

  const onClickStore = (storeCode) => {
    localStorage.setItem('store', storeCode);
    onClose();
  };

  return (
    <div className={B}>
      <DialogOverlay onClick={onClose}/>

      <DialogWindow
        mix={`${B}__window`}
        title="Выберите ваш магазин"
        onClose={onClose}
      >
        <ul className={`${B}__store-list`}>
          {stores.map((store) => (
            <li key={store.code} className={`${B}__store`}>
              <Link
                href={{
                  pathname,
                  query: {
                    storeCode: store.code,
                  },
                }}
              >
                <a
                  className={`${B}__link`}
                  onClick={() => onClickStore(store.code)}
                >
                  {store.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </DialogWindow>

      <style jsx global>
        {`
        .${B}__window {
          padding: ${styleVars.padding * 2}px;
        }

        .${B}__store-list {
          list-style: none;
          margin: 0;
          padding: 0;
          text-align: center;
        }

        .${B}__store {
          list-style: none;
        }

        .${B}__link {
          display: block;
          padding: ${styleVars.padding}px 0;
          text-decoration: none;
          color: ${styleVars.colors.green};
          font-size: 18px;
          border-radius: ${styleVars.borderRadius}px;
        }

        .${B}__link:hover {
          background: ${styleVars.colors.green};
          color: #fff;
        }
      `}
      </style>
    </div>
  );
}

LocationDialog.defaultProps = {
  onClose: null,
};

LocationDialog.propTypes = {
  pathname: PropTypes.string.isRequired,
  stores: PropTypes.stores.isRequired,
  onClose: PropTypes.func,
};
