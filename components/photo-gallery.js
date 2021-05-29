import { useState } from 'react';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';
import DialogCloser from './dialog-closer';
import DialogOverlay from './dialog-overlay';

export default function PhotoGallery({ photos }) {
  const B = 'photo-gallery';

  const [photoDialog, setPhotoDialog] = useState({ opened: false });

  const openPhoto = (photoIndex) => setPhotoDialog({ opened: true, photoIndex });
  const closeDialog = () => setPhotoDialog({ opened: false });
  function openPrevPhoto() {
    const photosCount = photos.length;
    const newIndex = photoDialog.photoIndex - 1;

    setPhotoDialog({
      opened: true,
      photoIndex: newIndex < 0 ? photosCount - 1 : newIndex,
    });
  }

  function openNextPhoto() {
    const photosCount = photos.length;
    const newIndex = photoDialog.photoIndex + 1;

    setPhotoDialog({
      opened: true,
      photoIndex: newIndex > photosCount - 1 ? 0 : newIndex,
    });
  }

  return (
    <div className={B}>
      {photos.map((photoUrl, photoIndex) => (
        <div className={`${B}__item`} key={photoUrl}>
          <div
            className={`${B}__photo`}
            style={{ backgroundImage: `url(${photoUrl})` }}
            onClick={() => openPhoto(photoIndex)}
          />
        </div>
      ))}

      {photoDialog.opened && (
        <>
          <DialogOverlay onClick={closeDialog}/>

          <div className={`${B}__photo-view`}>
            <DialogCloser mix={`${B}__photo-closer`} onClick={closeDialog}/>

            <button
              type="button"
              className={[
                `${B}__button-arrow`,
                `${B}__button-prev`,
                (photos.length < 2 ? `${B}__button-arrow_disabled` : ''),
              ].join(' ')}
              onClick={openPrevPhoto}
            >
              Предыдущее фото
            </button>

            <img
              className={`${B}__opened-photo`}
              src={photos[photoDialog.photoIndex]}
              alt="vashaobuv22"
            />

            <button
              type="button"
              className={[
                `${B}__button-arrow`,
                `${B}__button-next`,
                (photos.length < 2 ? `${B}__button-arrow_disabled` : ''),
              ].join(' ')}
              onClick={openNextPhoto}
            >
              Следующее фото
            </button>
          </div>
        </>
      )}

      <style jsx global>
        {`
        .${B} {
          display: flex;
          flex-wrap: wrap;
        }

        .${B}__item {
          padding: ${styleVars.padding}px;
          width: 450px;
          height: 675px;
        }

        .${B}__photo {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: 50%;
          cursor: pointer;
          border-radius: ${styleVars.borderRadius}px;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5);
          transition: transform ${styleVars.transitionTime};
        }

        .${B}__photo:hover {
          transform: scale(1.02);
        }

        .${B}__photo-closer {
          position: absolute;
          right: 0;
          top: -40px;
        }

        .${B}__photo-view {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 40;
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: stretch;
        }

        .${B}__opened-photo {
          vertical-align: middle;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5 );
          border-radius ${styleVars.borderRadius}px;
          max-width: 70vw;
          max-height: 80vh;
          align-self: center;
        }

        .${B}__button-arrow {
          background: url(/images/arrow-right.svg) 50% no-repeat;
          background-size: 30px;
          width: 40px;
          font-size: 0;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform ${styleVars.transitionTime};
          margin: 0 ${styleVars.padding}px;
        }

        .${B}__button-arrow_disabled {
          background: none;
          visibility: hidden;
          pointer-events: none;
          cursor: default;
        }

        .${B}__button-prev {
          transform: scale(-1);
        }

        .${B}__button-prev:hover {
          transform: scale(-1) translateX(4px);
        }

        .${B}__button-next:hover {
          transform: translateX(4px);
        }

        @media (max-width: 900px) {
          .${B}__item {
            width: 50vw;
            height: 75vw;
          }
        }

        @media (max-width: 450px) {
          .${B}__item {
            width: 100vw;
            height: 150vw;
          }

          .${B}__button-arrow {
            width: 20px;
            background-size: 20px;
          }
        }
        `}
      </style>
    </div>
  );
}

PhotoGallery.propTypes = {
  photos: PropTypes.photos.isRequired,
};
