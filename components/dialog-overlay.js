import proptypes from '../lib/proptypes';

export default function DialogOverlay({ onClick }) {
  const B = 'dialog-overlay';

  return (
    <div className={B} onClick={onClick}>
      <style jsx global>
        {`
        .${B} {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 10;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, .8);
        }
      `}
      </style>
    </div>
  );
}

DialogOverlay.propTypes = {
  onClick: proptypes.func.isRequired,
};
