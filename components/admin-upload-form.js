import axios from 'axios';
import { useRef } from 'react';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function AdminUploadForm({
  action,
  fieldName,
  hiddenFields,
  onSubmit,
}) {
  const B = 'admin-upload-form';
  const formEl = useRef(null);

  async function onSubmitHandler(event) {
    event.preventDefault();

    const formData = new FormData(formEl.current);

    try {
      await axios.post(action, formData, { 'Content-Type': 'multipart/form-data' });
      alert('Готово');
      formEl.current.reset();
      onSubmit();
    } catch (err) {
      alert('Не удалось сохранить файл');
      console.log(err);
    }
  }

  return (
    <form
      ref={formEl}
      className={B}
      method="post"
      action={action}
      encType="multipart/form-data"
      onSubmit={onSubmitHandler}
    >
      <input type="file" name={fieldName}/>

      {hiddenFields.map(({ key, value }) => <input key={key} type="hidden" name={key} value={value}/>)}

      <button className={`${B}__send-button`} type="submit">Отправить</button>

      <style jsx>
        {`
        .${B} {
          padding: ${styleVars.padding}px;
          border-bottom: 1px solid ${styleVars.colors.green};
        }

        .${B}__send-button {
          background: none;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          color: ${styleVars.colors.green};
          padding: ${styleVars.padding}px;
          cursor: pointer;
        }

        .${B}__send-button:hover,
        .${B}__send-button:focus {
          outline: none;
          background: ${styleVars.colors.green};
          color: #fff;
        }
        `}
      </style>
    </form>
  );
}

AdminUploadForm.defaultProps = {
  hiddenFields: [],
  onSubmit: () => {},
};

AdminUploadForm.propTypes = {
  action: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  hiddenFields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  onSubmit: PropTypes.func,
};
