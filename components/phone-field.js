import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';
import TextField from './text-field';

export default function PhoneField({ value, onChange }) {
  const B = 'phone-field';

  return (
    <div className={B}>
      <TextField
        mix={`${B}__input`}
        pattern="^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$"
        value={value}
        onChange={onChange}
        mask="+7(999)999-99-99"
        placeholder="Номер телефона"
      />

      <style jsx global>
        {`
        .${B} {
          width: 320px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: ${styleVars.padding}px;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
        }

        .${B}::before {
          content: '';
          display: block;
          background: url(/images/phone.svg) 50% no-repeat;
          background-size: contain;
          width: 30px;
          height: 40px;
        }

        .${B} .${B}__input {
          font-size: 24px;
          font-weight: 300;
          text-align: center;
          letter-spacing: 0.08rem;
          font-family: monospace;
          border: none;
        }
        `}
      </style>
    </div>
  );
}

PhoneField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
