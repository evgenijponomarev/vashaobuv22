import getMapUrl from '../lib/get-map-url';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';
import PhotoGallery from './photo-gallery';

export default function Contacts({ address, map, photos }) {
  const B = 'contacts';

  const mapUrl = getMapUrl(map.coordinates, map.zoom);

  return (
    <div className={B}>
      <div className={`${B}__address`}>Наш адрес: {address}.</div>

      <PhotoGallery photos={[mapUrl, ...photos]}/>

      <style jsx>
        {`
        .${B}__address {
          padding: ${styleVars.padding}px;
          font-size: 18px;
        }

        .${B}__map-image {
          width: 100%;
          vertical-align: middle;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5);
        }
        `}
      </style>
    </div>
  );
}

Contacts.propTypes = {
  address: PropTypes.string.isRequired,
  map: PropTypes.map.isRequired,
  photos: PropTypes.photos.isRequired,
};
