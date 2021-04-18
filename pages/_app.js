/* eslint-disable react/jsx-props-no-spreading, react/forbid-prop-types, max-len */
import Router from 'next/router';
import withYM from 'next-ym';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps}/>

      <style jsx global>
        {`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        body,
        button,
        a {
          font-family: ${styleVars.fontFamily};
          font-size: 16px;
          font-weight: 300;
          color: #353535;
        }

        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </>
  );
}

App.defaultProps = {
  pageProps: {},
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default withYM('76072615', Router)(App);
