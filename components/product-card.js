import { useState } from 'react';
import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';
import PhotoDialog from './photo-dialog';

export default function ProductCard({ data, photos }) {
  const B = 'product-card';

  const [openedPhoto, setOpenedPhoto] = useState('');

  const options = [
    { name: 'Артикул', value: data.articul },
    { name: 'Размеры', value: data.size_line },
  ];

  return (
    <div className={B}>
      <div className={`${B}__photos`}>
        <div
          className={`${B}__photo ${B}__main-photo`}
          onClick={() => setOpenedPhoto(photos[0])}
        >
          <img className={`${B}__img`} src={photos[0]} alt={data.name}/>
        </div>

        {photos.length > 1 && (
          <div className={`${B}__added-photos`}>
            {photos.slice(1).map((photoUrl) => (
              <div
                className={`${B}__photo ${B}__added-photo`}
                key={photoUrl}
                onClick={() => setOpenedPhoto(photoUrl)}
              >
                <img className={`${B}__img`} src={photoUrl} alt={data.name}/>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`${B}__details`}>
        <div className={`${B}__price`}>
          {data.price} рублей
        </div>

        <div className={`${B}__options`}>
          {options.map(({ name, value }) => (
            <div className={`${B}__option`} key={name}>
              <div className={`${B}__option-name`}>{name}</div>

              <div className={`${B}__option-value`}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {openedPhoto && (
        <PhotoDialog
          photoUrl={openedPhoto}
          title={data.name}
          onClose={() => setOpenedPhoto('')}
        />
      )}

      <style jsx global>
        {`
        .${B} {
          display: flex;
        }

        .${B}__photos {
          display: flex;
          padding: ${styleVars.padding}px;
        }

        .${B}__photo {
          border-radius: ${styleVars.borderRadius}px;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5);
          cursor: pointer;
          transition: transform ${styleVars.transitionTime};
        }

        .${B}__photo:hover {
          transform: scale(1.03);
        }

        .${B}__main-photo {
          width: 250px;
        }

        .${B}__added-photos {
          width: 80px;
          flex-shrink: 0;
          padding-left: ${styleVars.padding}px;
        }

        .${B}__added-photo {
          margin-bottom: ${styleVars.padding}px;
        }

        .${B}__img {
          width: 100%;
          border-radius: inherit;
          vertical-align: middle;
        }

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
          .${B} {
            flex-direction: column;
          }

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
  data: proptypes.productData.isRequired,
  photos: proptypes.productPhotos.isRequired,
};
