import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';

export default function DialogWindow({
  title,
  children,
  mix,
  onClose,
}) {
  const B = 'dialog-window';

  return (
    <div className={[B, mix].join(' ')}>
      {onClose && <div className={`${B}__closer`} onClick={onClose}/>}

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
          width: 40px;
          height: 40px;
          background-image: url(/images/close.svg);
          cursor: pointer;
          transition: transform ${styleVars.transitionTime};
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
  title: proptypes.string,
  children: proptypes.node.isRequired,
  mix: proptypes.string,
  onClose: proptypes.func,
};
