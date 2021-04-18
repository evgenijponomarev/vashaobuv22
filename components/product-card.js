import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';
import PhotoGallery from './photo-gallery';

export default function ProductCard({ data, photos }) {
  const B = 'product-card';

  const options = [
    { name: 'Артикул', value: data.articul },
    { name: 'Размеры', value: data.size_line },
  ];

  return (
    <div className={B}>
      <div className={`${B}__details`}>
        <div className={`${B}__price`}>{data.price}</div>

        {data.extra_bonus && (
          <div className={`${B}__bonus`}>
            {data.extra_bonus}% вернем на бонусную карту
          </div>
        )}

        <div className={`${B}__options`}>
          {options.map(({ name, value }) => (
            <div className={`${B}__option`} key={name}>
              <div className={`${B}__option-name`}>{name}</div>

              <div className={`${B}__option-value`}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <PhotoGallery photos={photos}/>

      <style jsx global>
        {`
        .${B}__details {
          width: 100%;
          max-width: 350px;
          padding: ${styleVars.padding}px;
        }

        .${B}__price {
          padding-bottom: ${styleVars.padding * 2}px;
          color: ${styleVars.colors.green};
          font-size: 30px;
          font-weight: 500;
          display: flex;
          align-items: center;
        }

        .${B}__price::after {
          content: '';
          width: 33px;
          height: 33px;
          display: block;
          background: url(/images/rub.svg) 50% no-repeat;
          background-size: contain;
        }

        .${B}__bonus {
          font-size: 20px;
          padding-bottom: ${styleVars.padding * 2}px;
          font-style: italic;
          color: #f00;
          font-weight: 500;
        }

        .${B}__option {
          display: flex;
          padding: 4px 0;
          font-size: 16px;
          justify-content: space-between; 
        }

        .${B}__option {
          border-bottom: 1px solid ${styleVars.colors.green};
        }

        .${B}__option:first-child {
          border-top: 1px solid ${styleVars.colors.green};
        }

        .${B}__option-value {
          font-weight: 500;
        }

        @media (max-width: 620px) {
          .${B}__details {
            max-width: 100%;
          }
        }
      `}
      </style>
    </div>
  );
}

ProductCard.propTypes = {
  data: PropTypes.productData.isRequired,
  photos: PropTypes.productPhotos.isRequired,
};
