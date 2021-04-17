import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
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
  mask,
}) {
  const B = 'text-field';

  const onChangeHandler = ({ currentTarget }) => onChange(currentTarget.value);

  const [InputTag, setInputTag] = useState('input');

  // InputMask вызывает useLayoutEffect, который на сервере вываливает ошибку.
  // Поэтому сервер отдает обычный инпут, а на клиете он уже заменяется на InputMask
  useEffect(() => {
    if (mask && InputTag === 'input') setInputTag(InputMask);
  });

  return (
    <div>
      <InputTag
        id={id}
        className={[B, mix].join(' ')}
        type={type}
        pattern={pattern}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        mask={mask}
        noValidate
      />

      <style jsx>
        {`
        .${B} {
          width: 100%;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          font-size: 16px;
          padding: 4px ${styleVars.padding}px;
        }

        .${B}:focus {
          outline: none;
        }
        `}
      </style>
    </div>
  );
}

TextField.defaultProps = {
  type: 'text',
  mix: '',
  pattern: null,
  placeholder: '',
  id: '',
  mask: null,
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  mix: PropTypes.string,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  mask: PropTypes.string,
};
