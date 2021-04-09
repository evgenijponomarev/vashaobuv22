import proptypes from '../lib/proptypes';

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
          padding: 10px;
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
  banners: proptypes.banners.isRequired,
};
