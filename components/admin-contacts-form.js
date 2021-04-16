import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';
import TextField from './text-field';
import PhotoGallery from './photo-gallery';
import getMapUrl from '../lib/get-map-url';

const clipboardy = require('clipboardy');

export default function AdminContactsForm({ contacts, action, storeName }) {
  const B = 'admin-contacts-form';

  const router = useRouter();

  const storeCode = contacts.store_code;

  const getCoordinatesString = (coords) => coords.slice().reverse().join(', ');
  const getCoordinatesArray = (coordsString) => coordsString
    .split(', ')
    .slice()
    .reverse()
    .map((coord) => +coord);

  const [address, setAddress] = useState(contacts.address);
  const [coordinates, setCoordinates] = useState(contacts.map.coordinates);
  const [zoom, setZoom] = useState(contacts.map.zoom);

  const onChangeCoordinates = (value) => {
    const coordinatesArray = getCoordinatesArray(value);

    if (coordinatesArray.some((coord) => Number.isNaN(coord))) return;

    setCoordinates(coordinatesArray);
  };

  const onChangeZoom = (value) => {
    if (value.match(/^\d{0,2}$/)) setZoom(+value);
  };

  const resetForm = () => {
    setAddress(contacts.address);
    setCoordinates(contacts.map.coordinates);
    setZoom(contacts.map.zoom);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const data = {
      storeCode,
      address,
      coordinates,
      zoom,
    };

    try {
      await axios.put(action, data);
      window.alert('Готово');
      router.reload();
    } catch (err) {
      window.alert('Не удалось сохранить. Проверьте корректность введенных данных. Если с ними точно все в порядке — свяжитесь с вашим криворуким разработчиком.');
    }
  };

  return (
    <div className={B}>
      <form action={action} onSubmit={onSubmitHandler}>
        <div className={`${B}__field`}>
          <label
            className={`${B}__label`}
            htmlFor={`${contacts.store_code}_address`}
          >
            Адрес:
          </label>

          <div className={`${B}__input`}>
            <TextField
              id={`${contacts.store_code}_address`}
              placeholder="Адрес"
              value={address}
              onChange={setAddress}
            />

            <a
              className={`${B}__map-link`}
              href="https://yandex.ru/maps"
              target="_blank"
              rel="noreferrer"
              onClick={() => clipboardy.write(`${storeName} ${address}`)}
            >
              Скопировать и перейти в Яндекс.Карты
            </a>
          </div>
        </div>

        <div className={`${B}__field`}>
          <label
            className={`${B}__label`}
            htmlFor={`${contacts.store_code}_coordinates`}
          >
            Координаты:
          </label>

          <div className={`${B}__input`}>
            <TextField
              id={`${contacts.store_code}_coordinates`}
              placeholder="Координаты"
              value={getCoordinatesString(coordinates)}
              onChange={onChangeCoordinates}
            />
          </div>
        </div>

        <div className={`${B}__field`}>
          <label
            className={`${B}__label`}
            htmlFor={`${contacts.store_code}_zoom`}
          >
            Масштаб:
          </label>

          <div className={`${B}__input`}>
            <TextField
              id={`${contacts.store_code}_zoom`}
              placeholder="Масштаб"
              value={zoom.toString()}
              onChange={onChangeZoom}
            />
          </div>
        </div>

        <div className={`${B}__buttons`}>
          <button
            className={`${B}__reset-button`}
            type="button"
            onClick={resetForm}
          >
            Сбросить
          </button>

          <button className={`${B}__send-button`} type="submit">
            Сохранить
          </button>
        </div>
      </form>

      <PhotoGallery photos={[getMapUrl(coordinates, zoom)]}/>

      <style jsx global>
        {`
        .${B} {
          border-bottom: 1px solid ${styleVars.colors.green};
          display: flex;
          justify-content: space-between;
        }

        .${B}__field {
          display: flex;
          align-items: center;
          padding: ${styleVars.padding}px;
        }

        .${B}__label {
          display: block;
          font-size: 16px;
          width: 150px;
        }

        .${B}__input {
          width: 250px;
        }

        .${B}__map-link {
          display: block;
          font-size: 12px;
        }

        .${B}__buttons {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: ${styleVars.padding}px;
          width: 420px;
        }

        .${B}__send-button {
          background: none;
          border: 1px solid ${styleVars.colors.green};
          padding: ${styleVars.padding}px;
          border-radius: ${styleVars.borderRadius}px;
          color: ${styleVars.colors.green};
          cursor: pointer;
        }

        .${B}__send-button:hover,
        .${B}__send-button:focus {
          outline: none;
          background: ${styleVars.colors.green};
          color: #fff;
        }

        .${B}__reset-button {
          background: none;
          border: none;
          color: ${styleVars.colors.green};
          border-bottom: 1px dashed ${styleVars.colors.green};
          cursor: pointer;
          padding: 0;
          margin-right: ${styleVars.padding}px;
        }

        .${B}__reset-button:hover,
        .${B}__reset-button:focus {
          border-color: transparent;
        }

        @media (max-width: 850px) {
          .${B} {
            flex-direction: column;
          }
        }
        `}
      </style>
    </div>
  );
}

AdminContactsForm.propTypes = {
  contacts: PropTypes.contacts.isRequired,
  action: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
};
