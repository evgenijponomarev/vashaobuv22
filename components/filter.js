import proptypes from '../lib/proptypes';

export default function Filter({ filters }) {
  const B = 'filter';

  const AUDITORY_LABELS = {
    m: 'Для мужчин',
    f: 'Для женщин',
    p: 'Для подростков',
    c: 'Для детей',
  };

  const filtersWithLabels = [
    {
      name: 'Для кого?',
      items: filters.auditory.map((auditory) => ({
        value: auditory,
        label: AUDITORY_LABELS[auditory],
      })),
    },
    {
      name: 'Тип обуви',
      items: filters.type.map((type) => ({
        value: type,
        label: type,
      })),
    },
  ];

  return (
    <div className={B}>
      {filtersWithLabels.map(({ name }) => (
        <div className={`${B}__control`} key={name}>
          todo
        </div>
      ))}

      <style jsx>
        {`
        .${B} {
          width: 100%;
          padding: 10px;
        }
        `}
      </style>
    </div>
  );
}

Filter.propTypes = {
  filters: proptypes.filters.isRequired,
};
