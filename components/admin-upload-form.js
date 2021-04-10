import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';

export default function AdminUploadForm({ action, fieldName, hiddenFields }) {
  const B = 'admin-upload-form';

  return (
    <form
      className={B}
      method="post"
      action={action}
      encType="multipart/form-data"
    >
      <input type="file" name={fieldName}/>

      {hiddenFields.map(({ key, value }) => <input key={key} type="hidden" name={key} value={value}/>)}

      <button type="submit">Отправить</button>

      <style jsx>
        {`
        .${B} {
          padding: 10px;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .5);
          border-radius: ${styleVars.borderRadius};
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
