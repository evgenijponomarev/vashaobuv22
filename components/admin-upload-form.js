import axios from 'axios';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import proptypes from '../lib/proptypes';

export default function AdminUploadForm({ action, fieldName, hiddenFields }) {
  const B = 'admin-upload-form';
  const formEl = useRef(null);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(formEl.current);

    try {
      await axios.post(action, formData, { 'Content-Type': 'multipart/form-data' });
      alert('Готово');
    } catch (err) {
      alert('Не удалось сохранить файл');
      console.log(err);
    }

    formEl.current.reset();
    router.reload();
  }

  return (
    <form
      ref={formEl}
      className={B}
      method="post"
      action={action}
      encType="multipart/form-data"
      onSubmit={onSubmit}
    >
      <input type="file" name={fieldName}/>

      {hiddenFields.map(({ key, value }) => <input key={key} type="hidden" name={key} value={value}/>)}

      <button type="submit">Отправить</button>

      <style jsx>
        {`
        .${B} {
          padding: 10px;
        }
        `}
      </style>
    </form>
  );
}

AdminUploadForm.defaultProps = {
  hiddenFields: [],
};

AdminUploadForm.propTypes = {
  action: proptypes.string.isRequired,
  fieldName: proptypes.string.isRequired,
  hiddenFields: proptypes.arrayOf(proptypes.shape({
    key: proptypes.string.isRequired,
    value: proptypes.string.isRequired,
  })),
};
