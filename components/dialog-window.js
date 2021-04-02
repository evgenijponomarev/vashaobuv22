import styleVars from '../styles/vars';

export default function DialogWindow({ title, children, mix = '' }) {
  const B = 'dialog-window';

  return (
    <div className={[B, mix].join(' ')}>
      <h2 className={`${B}__title`}>
        {title}
      </h2>

      <div className={`${B}__content`}>
        {children}
      </div>

      <style jsx global>{`
        .${B} {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          padding: 20px;
          border-radius: ${styleVars.borderRadius};
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .2);
        }

        .${B}__title {
          margin: 0;
          padding: 0;
          font-size: 20px;
          font-weight: 300;
          white-space: nowrap;
        }

        .${B}__content {
          padding-top: 20px;
        }
      `}</style>
    </div>
  );
}
