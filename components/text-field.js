import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function TextField({
  value,
  type,
  onChange,
  mix,
  pattern,
  placeholder,
  id,
}) {
  const B = 'text-field';

  function onChangeHandler({ currentTarget }) {
    onChange(currentTarget.value);
  }

  return (
    <>
      <input
        id={id}
        className={[B, mix].join(' ')}
        type={type}
        pattern={pattern}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />

      <style jsx>
        {`
        .${B} {
          width: 100%;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          font-size: 20px;
          padding: 4px ${styleVars.padding}px;
        }

        .${B}:focus {
          outline: none;
        }
        `}
      </style>
    </>
  );
}

TextField.defaultProps = {
  type: 'text',
  mix: '',
  pattern: null,
  placeholder: '',
  id: '',
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  mix: PropTypes.string,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
};
