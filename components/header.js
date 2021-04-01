import Container from '../components/container'
import styleVars from '../styles/vars';

export default function Header({ children }) {
  const B = 'header';

  return (
    <div className={B}>
      <Container mix={`${B}__container`}>
        {children}
      </Container>

      <style jsx global>{`
        .${B} {
          width: 100%;
          height: 40px;
          background: ${styleVars.colors.green};
          display: flex;
          align-items: center;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .4);
        }

        .${B}__container {
          display: flex;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
