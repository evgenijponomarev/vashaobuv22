import { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import styleVars from '../styles/vars';

const menuItems = [
  {
    pathname: '/new/[storeCode]',
    text: 'Новинки',
  },
  {
    pathname: '/profit/[storeCode]',
    text: 'Выгодные предложения',
  },
  {
    pathname: '/bonuses/[storeCode]',
    text: 'Бонусная программа',
  },
  {
    pathname: '/contacts/[storeCode]',
    text: 'Контакты',
  },
];

export default function Menu() {
  const B = 'menu';

  const router = useRouter();

  const [isOpened, setMenuOpened] = useState(false);

  return (
    <div className={`${B} ${isOpened ? `${B}_opened` : ''}`}>
      <button
        type="button"
        className={`${B}__toggler`}
        onClick={() => setMenuOpened(!isOpened)}
      >
        Меню
      </button>

      <ul className={`${B}__items`}>
        {menuItems.map(({ pathname, text }) => {
          const classNameList = [
            `${B}__item`,
            (router.pathname === pathname ? `${B}__item_current` : ''),
          ];

          return (
            <li className={classNameList.join(' ')} key={pathname}>
              <Link href={{
                pathname,
                query: {
                  storeCode: router.query.storeCode,
                },
              }}
              >
                <a className={`${B}__link`}>{text}</a>
              </Link>
            </li>
          );
        })}
      </ul>

      <style jsx global>
        {`
        .${B} {
          height: 100%;
        }

        .${B}__toggler {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          width: 40px;
          height: 40px;
          background: url(/images/menu.svg);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20px 20px;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 0;
        }

        .${B}__items {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          height: 100%;
        }

        .${B}__item {
          list-style: none;
          margin: 0;
          padding: 0 10px;
          height: 100%;
        }

        .${B}__item_current .${B}__link {
          pointer-events: none;
          position: relative;
        }

        .${B}__item_current .${B}__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #fff;
        }

        .${B}__link {
          display: block;
          height: 100%;
          text-decoration: none;
          color: #fff;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .${B}__link:hover {
          opacity: .8;
        }

        @media (max-width: 700px) {
          .${B} {
            width: 40px;
            height: auto;
            border-radius: ${styleVars.borderRadius};
            position: relative;
          }

          .${B}__toggler {
            display: block;
          }

          .${B}__items {
            display: none;
            position: absolute;
            top: ${styleVars.headerHeigh};
            left: 0;
            background-color: ${styleVars.colors.green};
            height: auto;
            border-radius: ${styleVars.borderRadius};
            margin-top: 10px;
            margin-left: 10px;
            padding: 10px 20px;
            box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5);
          }

          .${B}__item {
            height: auto;
          }

          .${B}__link {
            color: ${styleVars.colors.green};
            display: inline;
            height: auto;
          }

          .${B}__item_current .${B}__link {
            font-weight: 500;
          }

          .${B}__item_current .${B}__link::after {
            display: none;
          }

          .${B}_opened {
            width: 210px;
            align-items: flex-start;
          }

          .${B}_opened .${B}__items {
            display: block;
          }

          .${B}_opened .${B}__item {
            padding: 5px 0;
          }

          .${B}_opened .${B}__link {
            color: #fff;
          }

          .${B}_opened .${B}__toggler {
            background-image: url(/images/close.svg);
          }
        }
      `}
      </style>
    </div>
  );
}
