import Link from 'next/link';
import proptypes from '../lib/proptypes';
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
        <a className={`${B}__link`}>Выгодные предложения</a>
      </Link>

      <style jsx>
        {`
        .${B} {
          padding: 10px;
          display: flex;
          justify-content: center;
        }

        .${B}__link {
          display: block;
          padding: 10px 20px;
          border: 2px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius};
          text-align: center;
          color: ${styleVars.colors.green};
          text-decoration: none;
          font-size: 18px;
          font-weight: 400;
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

ProfitLink.propTypes = {
  storeCode: proptypes.string.isRequired,
};
