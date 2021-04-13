import proptypes from '../lib/proptypes';
import DialogOverlay from './dialog-overlay';
import DialogWindow from './dialog-window';
import styleVars from '../styles/vars';

export default function PhotoDialog({ photoUrl, title, onClose }) {
  const B = 'photo-dialog';

  return (
    <div className={B}>
      <DialogOverlay onClick={onClose}/>

      <DialogWindow mix={`${B}__window`} onClose={onClose}>
        <img className={`${B}__photo`} src={photoUrl} alt={title}/>
      </DialogWindow>

      <style jsx global>
        {`
        .${B} {
          width: 100%;
          max-width: 600px;
        }

        .${B}__photo {
          width: 100%;
          border-radius: ${styleVars.borderRadius}px;
          vertical-align: middle;
        }
        `}
      </style>
    </div>
  );
}

PhotoDialog.propTypes = {
  photoUrl: proptypes.string.isRequired,
  title: proptypes.string.isRequired,
  onClose: proptypes.func.isRequired,
};
