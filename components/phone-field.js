import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';
import TextField from './text-field';

export default function PhoneField({ value, onChange }) {
  const B = 'phone-field';

  return (
    <div className={B}>
      <TextField
        mix={`${B}__input`}
        pattern="^\+7\(\d{3}\)\d{3}\d{4}$"
        value={value}
        onChange={onChange}
        mask="+7(999)9999999"
      />

      <style jsx global>
        {`
        .${B} {
          width: 250px;
          display: flex;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          padding: ${styleVars.padding}px;
          justify-content: center;
        }

        .${B} .${B}__input {
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 0.08rem;
          color: #000;
          padding: 0;
          border-radius: 0;
          border: none;
          text-align: center;
          font-family: monospace;
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
