import Link from 'next/link';
import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';

export default function Product({ productData }) {
  const B = 'product';

  const title = `${productData.name}. Артикул: ${productData.articul}`;

  return (
    <div className={B}>
      <Link href={{
        pathname: '/shoes/[storeCode]/[productCode]',
        query: {
          storeCode: productData.storeCode,
          productCode: productData.code,
        },
      }}
      >
        <a
          className={`${B}__link`}
          title={title}
        >
          <img
            className={`${B}__image`}
            src={`/shoes_photos/${productData.code}_1.jpg`}
            alt={title}
          />

          {!!productData.extra_bonus && (
            <div className={`${B}__badge`}>Кэшбек {productData.extra_bonus}%</div>
          )}

          <div className={`${B}__details`}>
            <div className={`${B}__name`}>
              {productData.name}
            </div>

            <div className={`${B}__price`}>
              {productData.price}
            </div>

            <div className={`${B}__props`}>
              <div className={`${B}__prop`}>
                <div className={`${B}__prop-name`}>
                  Артикул:
                </div>

                <div className={`${B}__prop-value`}>
                  {productData.articul}
                </div>
              </div>

              <div className={`${B}__prop`}>
                <div className={`${B}__prop-name`}>
                  Размеры:
                </div>

                <div className={`${B}__prop-value`}>
                  {productData.size_line}
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>

      <style jsx>
        {`
        .${B} {
          padding-bottom: 10px;
          position: relative;
          border-radius: ${styleVars.borderRadius};
          transition: transform .2s;
        }

        .${B}__link {
          display: block;
          text-decoration: none;
          border-radius: inherit;
        }

        .${B}__image {
          width: 100%;
          border-radius: inherit;
          transition: box-shadow .2s;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .2);
        }

        .${B}__badge {
          position: absolute;
          top: 10px;
          left: -8px;
          padding: 4px 10px; 
          background: ${styleVars.colors.green};
          color: #fff;
          border-radius: 4px;
          text-align: center;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .2);
        }

        .${B}__details {
          padding: 0 4px;
        }

        .${B}__name {
          font-size: 18px;
          padding: 10px 4px;
          color: ${styleVars.colors.green};
        }

        .${B}__price {
          font-size: 22px;
          font-weight: 500;
          padding: 0 4px;
        }

        .${B}__props {
          padding: 0 4px;
        }

        .${B}__prop {
          padding: 8px 0;
          color: #5d5d5d;
        }

        .${B}__prop-name {
          font-size: 14px;
          padding-bottom: 2px;
        }

        .${B}__prop-value {
          font-size: 16px;
          font-weight: 500;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }

        .${B}__prop-value::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
        }

        .${B}__price::after {
          content: ' руб.';
          font-size: 18px;
        }

        .${B}:hover {
          transform: scale(1.01);
        }

        .${B}:hover .${B}__image {
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5);
        }

        @media (max-width: 700px) {
          .${B}__name {
            padding: 10px 4px;
          }
        }
      `}
      </style>
    </div>
  );
}

Product.propTypes = {
  productData: proptypes.product.isRequired,
};
