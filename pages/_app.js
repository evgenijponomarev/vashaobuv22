/* eslint-disable react/jsx-props-no-spreading, react/forbid-prop-types, max-len */
import Head from 'next/head';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <!-- Yandex.Metrika counter -->
        <script type="text/javascript" >
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(76072615, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
          });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/76072615" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter --> */}
      </Head>
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
