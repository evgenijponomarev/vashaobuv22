import { useState } from 'react';
import { useRouter } from 'next/router'

import Link from 'next/link';
import styleVars from '../styles/vars';

export default function Menu() {
  const B = 'menu';
  const [isOpened, setMenuOpened] = useState(false);
  const router = useRouter();
  const currentRoute = router.asPath;
  const currentStoreCode = router.query.storeCode || '';

  const routes = [
    { url: `/new/${currentStoreCode}`, text: 'Новинки' },
    { url: `/profit/${currentStoreCode}`, text: 'Выгодные предложения' },
    { url: '/bonuses', text: 'Бонусная программа' },
    { url: '/contacts', text: 'Контакты' },
  ];

  return (
    <div className={`${B} ${isOpened ? `${B}_opened` : ''}`}>
      <button className={`${B}__toggler`} onClick={() => setMenuOpened(!isOpened)}/>

      
      <ul className={`${B}__items`}>
        {routes.map(({ url, text }) => (
          <li
            className={`${B}__item${url === currentRoute ? ` ${B}__item_current` : ''}`}
            key={url}
          >
            <Link href={url}>
              <a className={`${B}__link`}>{text}</a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx global>{`
        .${B} {
          height: 100%;
        }

        .${B}__toggler {
          display: none;
          position: absolute;
          right: 0;
          bottom: 0;
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
            overflow: hidden;
            position: fixed;
            right: 10px;
            bottom: 10px;
            width: 40px;
            height: 40px;
            background-color: ${styleVars.colors.green};
            transition-property: width, height;
            transition-duration: ${styleVars.transitionTime};
            box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .4);
            border-radius: ${styleVars.borderRadius};
          }

          .${B}__toggler {
            display: block;
          }

          .${B}__items {
            opacity: 0;
            transition-property: opacity;
            transition-duration: ${styleVars.transitionTime};
            transition-delay: 0;
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
            height: 130px;
            align-items: flex-start;
            transition-property: width, height;
            transition-duration: ${styleVars.transitionTime};
          }

          .${B}_opened .${B}__items {
            display: block;
            opacity: 1;
            padding: 10px;
            transition-property: opacity;
            transition-duration: ${styleVars.transitionTime};
            transition-delay: ${styleVars.transitionTime};
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
      `}</style>
    </div>
  );
}
