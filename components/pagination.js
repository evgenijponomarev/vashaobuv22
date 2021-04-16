import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function Pagination({ pagination }) {
  const B = 'pagination';

  const router = useRouter();

  const { pageNum, pagesCount } = pagination;
  const pageNumList = new Array(pagesCount).fill().map((v, k) => k + 1);

  if (pagesCount === 1) return null;

  return (
    <div className={B}>
      {pageNumList.map((num) => {
        const classNameList = [
          `${B}__link`,
          (num === pageNum ? `${B}__link_current` : ''),
        ];

        return (
          <div className={`${B}__item`} key={num}>
            <Link href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                page: num,
              },
            }}
            >
              <a className={classNameList.join(' ')}>
                {num}
              </a>
            </Link>
          </div>
        );
      })}

      <style jsx>
        {`
        .${B} {
          width: 100%;
          display: flex;
          align-items: center;
          padding-bottom: 40px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .${B}__item {
          padding: 8px;
        }

        .${B}__link {
          display: block;
          width: 40px;
          height: 40px;
          border: 2px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          text-align: center;
          line-height: 36px;
          text-decoration: none;
          color: ${styleVars.colors.green};
        }

        .${B}__link:hover,
        .${B}__link_current {
          background: ${styleVars.colors.green};
          color: #fff;
        }

        .${B}__link_current {
          pointer-events: none;
        }
      `}
      </style>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.pagination.isRequired,
};
