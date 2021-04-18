import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function Message404({ children }) {
  const B = 'message404';

  return (
    <div className={B}>
      {children}

      <style jsx>
        {`
        .${B} {
          padding: ${styleVars.padding}px;
        }
        `}
      </style>
    </div>
  );
}

Message404.defaultProps = {
  children: 'К сожалению, по этому адресу у нас ничего нет.',
};

Message404.propTypes = {
  children: PropTypes.node,
};
