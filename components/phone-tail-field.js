import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';
import TextField from './text-field';

export default function PhoneTailField({ value, onChange }) {
  const B = 'phone-tail-field';

  function onChangeHandler(newValue) {
    if (newValue.match(/^\d{0,4}$/)) onChange(newValue);
  }

  return (
    <div className={B}>
      <label
        htmlFor={`${B}__phone-mask`}
        className={`${B}__phone-mask`}
      >
        +7 (9**) ***
      </label>

      <TextField
        id={`${B}__phone-mask`}
        mix={`${B}__input`}
        pattern="\d*"
        value={value}
        onChange={onChangeHandler}
      />

      <style jsx global>
        {`
        .${B} {
          width: 240px;
          display: flex;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          padding: ${styleVars.padding}px;
          justify-content: center;
        }

        .${B}__phone-mask,
        .${B} .${B}__input {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: 0.05rem;
          color: #000;
          padding: 0;
        }

        .${B}__phone-mask {
          display: block;
          white-space: nowrap;
          padding-right: ${styleVars.padding}px;
        }

        .${B} .${B}__input {
          width: 64px;
          border: none;
        }
        `}
      </style>
    </div>
  );
}

PhoneTailField.propTypes = {
  value: proptypes.string.isRequired,
  onChange: proptypes.func.isRequired,
};
