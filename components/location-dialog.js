import Link from 'next/link';
import { useRouter } from 'next/router';
import proptypes from '../lib/proptypes';
import DialogOverlay from './dialog-overlay';
import DialogWindow from './dialog-window';
import styleVars from '../styles/vars';

export default function LocationDialog({ stores, onClose, onClickStore }) {
  const B = 'location-dialog';

  const router = useRouter();

  return (
    <div className={B}>
      <DialogOverlay onClick={onClose}/>

      <DialogWindow mix={`${B}__window`} title="Выберите ваш магазин">
        <ul className={`${B}__store-list`}>
          {stores.map((store) => (
            <li key={store.code} className={`${B}__store`}>
              <Link href={{
                pathname: router.pathname,
                query: {
                  storeCode: store.code,
                },
              }}
              >
                <a className={`${B}__link`} onClick={onClickStore}>{store.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </DialogWindow>

      <style jsx global>
        {`
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
          padding: 10px 0;
          text-decoration: none;
          color: ${styleVars.colors.green};
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
  onClose: () => {},
  onClickStore: () => {},
};

LocationDialog.propTypes = {
  stores: proptypes.stores.isRequired,
  onClose: proptypes.func,
  onClickStore: proptypes.func,
};
