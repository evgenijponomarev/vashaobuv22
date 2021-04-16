import PropTypes from '../lib/prop-types';
import Container from './container';
import styleVars from '../styles/vars';

export default function Header({ children, mix }) {
  const B = 'header';

  return (
    <div className={[B, mix].join(' ')}>
      <Container mix={`${B}__container`}>
        {children}
      </Container>

      <style jsx global>
        {`
        .${B} {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 20;
          width: 100%;
          height: ${styleVars.headerHeigh}px;
          background: ${styleVars.colors.green};
          display: flex;
          align-items: center;
          box-shadow: ${styleVars.boxShadow} rgba(0, 0, 0, .4);
        }

        .${B}__container {
          display: flex;
          height: 100%;
        }
      `}
      </style>
    </div>
  );
}

Header.defaultProps = {
  mix: '',
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  mix: PropTypes.string,
};
