export default function Container({ children, mix = '' }) {
  const B = 'container';

  return (
    <div className={[B, mix].join(' ')}>
      {children}

      <style jsx global>{`
        .${B} {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
