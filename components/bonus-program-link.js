import Link from 'next/link';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function BonusProgramLink({ storeCode }) {
  const B = 'bonus-program-description';

  return (
    <div className={B}>
      <Link href={{
        pathname: '/bonuses/check/[storeCode]',
        query: { storeCode },
      }}
      >
        <a className={`${B}__link`}>
          <span className={`${B}__link-text`}>
            Сколько у меня бонусов?
          </span>
        </a>
      </Link>

      <style jsx>
        {`
        .${B} {
          padding: ${styleVars.padding}px 0 ${styleVars.padding * 5}px;
          display: flex;
          justify-content: center;
        }

        .${B}__link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .${B}__link:hover .${B}__link-text {
          text-decoration: none;
        }

        .${B}__link::before,
        .${B}__link::after {
          content: '';
          display: block;
          width: 30px;
          height: 30px;
          background: url(/images/question.svg) 50% no-repeat;
          background-size: contain;
          margin: 0 10px;
        }

        .${B}__link-text {
          display: block;
          color: ${styleVars.colors.green};
          font-size: 22px;
          font-weight: 300;
          border: 2px solid ${styleVars.colors.green};
          padding: ${styleVars.padding}px ${styleVars.padding * 2}px;
          border-radius: ${styleVars.borderRadius}px;
          text-align: center;
        }

        .${B}__link:hover .${B}__link-text,
        .${B}__link:focus .${B}__link-text {
          background: ${styleVars.colors.green};
          color: #fff;
        }

        @media (max-width: 360px) {
          .${B}__link-text {
            font-size: 18px;
          }
        }
        `}
      </style>
    </div>
  );
}

BonusProgramLink.propTypes = {
  storeCode: PropTypes.string.isRequired,
};
