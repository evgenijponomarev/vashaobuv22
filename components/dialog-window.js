import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';
import DialogCloser from './dialog-closer';

export default function DialogWindow({
  title,
  children,
  mix,
  onClose,
}) {
  const B = 'dialog-window';

  return (
    <div className={[B, mix].join(' ')}>
      {onClose && <DialogCloser mix={`${B}__closer`} onClick={onClose}/>}

      {title && (
        <h2 className={`${B}__title`}>
          {title}
        </h2>
      )}

      <div className={`${B}__content`}>
        {children}
      </div>

      <style jsx global>
        {`
        .${B} {
          position: fixed;
          left: 50%;
          top: 50%;
          z-index: 40;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: ${styleVars.borderRadius}px;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .2);
        }

        .${B}__title {
          margin: 0;
          padding: 0 0 20px;
          font-size: 24px;
          font-weight: 300;
          white-space: nowrap;
        }

        .${B}__closer {
          position: absolute;
          left: 100%;
          bottom: 100%;
        }

        .${B}__closer:hover {
          transform: rotate(90deg);
        }
      `}
      </style>
    </div>
  );
}

DialogWindow.defaultProps = {
  title: '',
  mix: '',
  onClose: null,
};

DialogWindow.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  mix: PropTypes.string,
  onClose: PropTypes.func,
};
