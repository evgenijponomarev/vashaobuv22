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
      <svg className={`${B}__icon`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"/>

        <path
          d={`M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z${
            isChecked ? 'm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z' : ''
          }`}
          fill={styleVars.colors.green}
        />
      </svg>

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
          padding: 4px 0;
          font-size: 14px;
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
