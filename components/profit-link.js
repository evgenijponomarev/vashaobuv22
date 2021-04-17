import Link from 'next/link';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function ProfitLink({ storeCode }) {
  const B = 'profit-link';

  return (
    <div className={B}>
      <Link href={{
        pathname: '/profit/[storeCode]',
        query: { storeCode },
      }}
      >
        <a className={`${B}__link`}>
          <span className={`${B}__link-text`}>
            Перейти к самым выгодным предложениям
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
          width: 60px;
          height: 60px;
          background-image: url(/images/cashback.svg);
          background-repeat: no-repeat;
        }

        .${B}__link::before {
          transform: rotate(-80deg) translate(-40px, 36px);
          margin-right: -10px;
        }

        .${B}__link::after {
          transform: scale(-1, 1) rotate(-80deg) translate(-40px, 36px);
          margin-left: -10px;
        }

        .${B}__link-text {
          display: block;
          color: ${styleVars.colors.green};
          font-size: 22px;
          font-weight: 300;
          border: 2px solid ${styleVars.colors.green};
          padding: ${styleVars.padding}px ${styleVars.padding * 2}px;
          border-radius: ${styleVars.borderRadius}px;
        }

        .${B}__link:hover .${B}__link-text,
        .${B}__link:focus .${B}__link-text {
          background: ${styleVars.colors.green};
          color: #fff;
        }
        `}
      </style>
    </div>
  );
}

ProfitLink.propTypes = {
  storeCode: PropTypes.string.isRequired,
};
