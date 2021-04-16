import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

export default function BannerList({ banners }) {
  const B = 'banner-list';

  return (
    <div className={B}>
      {banners.map((bannerPath) => (
        <div className={`${B}__item`} key={bannerPath}>
          <img
            className={`${B}__image`}
            src={bannerPath}
            alt="Рекламный баннер"
          />
        </div>
      ))}

      <style jsx global>
        {`
        .${B}__item {
          width: 100%;
          padding: ${styleVars.padding}px;
        }

        .${B}__image {
          width: 100%;
        }
      `}
      </style>
    </div>
  );
}

BannerList.propTypes = {
  banners: PropTypes.photos.isRequired,
};
