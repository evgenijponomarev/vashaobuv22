import styleVars from '../styles/vars';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps}/>

      <style jsx global>{`
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
      `}</style>
    </>
  );
}