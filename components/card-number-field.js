import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';
import TextField from './text-field';

const WIDTH = 430;

export default function CardNumberField({ value, onChange, maxLength }) {
  const B = 'card-number-field';

  function onChangeHandler(newValue) {
    if (newValue.length <= maxLength && newValue.match(/^\d*$/)) onChange(newValue);
  }

  return (
    <div className={B}>
      <label
        htmlFor={`${B}__barcode-input`}
        className={`${B}__barcode-area`}
      >
        <img className={`${B}__barcode-image`} src="/images/barcode.png" alt="Штрих-код"/>

        <TextField
          id={`${B}__barcode-input`}
          mix={`${B}__barcode-input`}
          pattern="\d*"
          value={value}
          onChange={onChangeHandler}
          placeholder="НОМЕР КАРТЫ"
        />
      </label>

      <div className={`${B}__description`}>
        Количество бонусов на карте и условия участия<br/>
        в бонусной программе вы всегда можете уточнить<br/>
        у продавцов-консультантов в магазине или<br/>
        на сайте:
      </div>

      <div className={`${B}__site`}>
        vashaobuv22.ru
      </div>

      <style jsx global>
        {`
        .${B} {
          width: 100%;
          max-width: ${WIDTH}px;
          background: ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          padding: 30px 0 20px;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5);
          display: flex;
          flex-grow: 2;
          flex-direction: column;
          align-items: center;
        }

        .${B}__barcode-area {
          display: block;
          background: #fff;
          width: 100%;
          text-align: center;
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .${B}__barcode-image {
          width: 130px;
        }

        .${B} .${B}__barcode-input {
          text-align: center;
          border: none;
          padding: 4px;
          border-radius: 0;
          font-size: 16px;
          letter-spacing: .25rem;
        }

        .${B}__description {
          color: #fff;
          text-align: center;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 600;
          line-height: 18px;
          line-height: 1.5;
          padding: 22px 0 10px;
          text-shadow: 0 0 2px rgba(0, 0, 0, .6);
          font-family: Arial, sans-serif;
          letter-spacing: .04rem;
        }

        .${B}__site {
          color: #fff;
          text-transform: uppercase;
          text-align: center;
          text-shadow: 2px 1px 0 #444;
          font-weight: 500;
          letter-spacing: .04rem;
          font-size: 20px;
        }

        .${B}__site::after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: #fff;
          margin-top: 4px;
        }

        @media (max-width: ${WIDTH}px) {
          .${B} {
            padding: 22px 0 16px;
          }

          .${B}__description {
            font-size: 10px;
            padding: 16px 0 8px;
          }

          .${B}__site {
            font-size: 16px;
          }

          .${B}__site::after {
            margin-top: 2px;
          }
        }

        @media (max-width: 380px) {
          .${B}__description {
            font-size: 8px;
            padding: 12px 0 6px;
          }

          .${B}__site {
            font-size: 12px;
          }
        }
        `}
      </style>
    </div>
  );
}

CardNumberField.propTypes = {
  value: proptypes.string.isRequired,
  onChange: proptypes.func.isRequired,
  maxLength: proptypes.number.isRequired,
};
