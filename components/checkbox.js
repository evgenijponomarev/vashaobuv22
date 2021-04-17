import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function Checkbox({
  id,
  label,
  isChecked,
  onChange,
}) {
  const B = 'checkbox';

  return (
    <label className={B} htmlFor={id}>
      <div className={`${B}__control`}>
        {isChecked && (
          <svg className={`${B}__flag`} xmlns="http://www.w3.org/2000/svg" viewBox="6.7 7.5 11.4 8.5">
            <path
              d="m6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
              fill={styleVars.colors.green}
            />
          </svg>
        )}
      </div>

      <input
        className={`${B}__input`}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />

      <div className={`${B}__label`}>
        {label}
      </div>

      <style jsx>
        {`
        .${B} {
          display: flex;
          align-items: center;
          padding: 6px 0;
          font-size: 14px;
        }

        .${B}__control {
          border: 2px solid ${styleVars.colors.green};
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

        .${B}__flag {
          width: 12px;
          height: 12px;
        }

        .${B}__icon {
          margin-right: 4px;
        }

        .${B}__input {
          display: none;
        }
        `}
      </style>
    </label>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
