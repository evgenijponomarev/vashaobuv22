import { useRouter } from 'next/router';
import { useState } from 'react';
import Checkbox from './checkbox';
import PropTypes from '../lib/prop-types';
import styleVars from '../styles/vars';

const OPTION_LABELS = {
  auditory: {
    f: 'Для женщин',
    m: 'Для мужчин',
    p: 'Для подростков',
    c: 'Для детей',
  },
};

const AUDITORY_ORDER = ['f', 'm', 'p', 'c'];

export default function Filter({ filters, onChange }) {
  const B = 'filter';

  const router = useRouter();

  if (filters.auditory) {
    filters.auditory.sort((a, b) => {
      if (AUDITORY_ORDER.indexOf(a) > AUDITORY_ORDER.indexOf(b)) return 1;
      return -1;
    });

    filters.type.sort();
  }

  const filtersList = Object.entries(filters)
    .map(([code, values]) => ({
      code,
      options: values.map((value) => ({
        value,
        label: OPTION_LABELS[code] ? OPTION_LABELS[code][value] : value,
        isChecked: router.query[code]?.split(',').includes(value) ?? false,
      })),
    }))
    .filter((select) => select.options.length > 1);

  const [filtersData, setFiltersData] = useState(filtersList);
  const [isOpened, toggleOpened] = useState(false);

  function checkOption(filter, value) {
    return {
      ...filter,
      options: filter.options.map((option) => ({
        ...option,
        isChecked: option.value === value ? !option.isChecked : option.isChecked,
      })),
    };
  }

  function onChangeFilter(filterCode, filterValue) {
    const newFilterData = filtersData.map((filter) => {
      if (filter.code !== filterCode) return filter;

      return checkOption(filter, filterValue);
    });

    setFiltersData(newFilterData);

    const filterValues = newFilterData
      .find(({ code }) => code === filterCode)
      .options
      .filter(({ isChecked }) => isChecked)
      .map(({ value }) => value);

    onChange(filterCode, filterValues);
  }

  if (filtersData.length === 0) return null;

  return (
    <div className={`${B}${isOpened ? ` ${B}_opened` : ''}`}>
      <button
        className={`${B}__opener`}
        type="button"
        onClick={() => toggleOpened(!isOpened)}
      >
        {!isOpened && 'Показать фильтр'}
        {isOpened && 'Скрыть фильтр'}
      </button>

      <div className={`${B}__fields`}>
        {filtersData.map(({ code, options }) => (
          <div className={`${B}__field`} key={code}>
            {options.map(({ label, value, isChecked }) => (
              <div className={`${B}__checkbox`} key={value}>
                <Checkbox
                  id={`${code}_${value}`}
                  label={label}
                  isChecked={isChecked}
                  onChange={() => onChangeFilter(code, value)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>
        {`
        .${B} {
          padding: ${styleVars.padding}px;
        }

        .${B}__opener {
          display: none;
          width: 100%;
          background: #fff;
          font-size: 18px;
          color: ${styleVars.colors.green};
          cursor: pointer;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          text-align: center;
          padding: 4px 0;
        }

        .${B}__opener:hover,
        .${B}__opener:focus {
          background: ${styleVars.colors.green};
          color: #fff;
          outline: none;
        }

        .${B}__field {
          padding: ${styleVars.padding}px;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
        }

        .${B}__field + .${B}__field {
          margin-top: 20px;
        }

        @media (max-width: 550px) {
          .${B}__opener {
            display: block;
          }

          .${B}__fields {
            display: none;
            margin-top: ${styleVars.padding}px;
          }

          .${B}_opened .${B}__fields {
            display: block;
          }
        }
        `}
      </style>
    </div>
  );
}

Filter.propTypes = {
  filters: PropTypes.filters.isRequired,
  onChange: PropTypes.func.isRequired,
};
