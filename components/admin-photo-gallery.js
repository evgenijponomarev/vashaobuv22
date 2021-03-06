import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function AdminPhotoGallery({ photos, onDelete }) {
  const B = 'admin-photo-gallery';

  return (
    <div className={B}>
      {photos.map((link) => (
        <div className={`${B}__item`} key={link}>
          <img className={`${B}__image`} src={link} alt="Рекламный баннер"/>

          <button
            type="button"
            className={`${B}__delete-button`}
            onClick={() => onDelete(link)}
          >
            Удалить
          </button>
        </div>
      ))}

      <style jsx>
        {`
        .${B} {
          display: flex;
          padding: ${styleVars.padding}px 0;
          flex-wrap: wrap;
        }

        .${B}__item {
          width: 198px;
          padding: ${styleVars.padding}px;
          text-align: center;
        }

        .${B}__image {
          width: 100%;
        }

        .${B}__delete-button {
          margin-top: ${styleVars.padding}px;
          font-size: 0;
          width: 30px;
          height: 30px;
          background: none;
          background-image: url(/images/delete.svg);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 60%;
          border: 1px solid ${styleVars.colors.green};
          border-radius: 50%;
          cursor: pointer;
        }

        .${B}__delete-button:hover {
          background-color: ${styleVars.colors.green};
        }
        `}
      </style>
    </div>
  );
}

AdminPhotoGallery.propTypes = {
  photos: PropTypes.photos.isRequired,
  onDelete: PropTypes.func.isRequired,
};
