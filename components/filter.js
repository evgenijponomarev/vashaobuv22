import { useRouter } from 'next/router';
import Select from 'react-select';
import proptypes from '../lib/proptypes';
import styleVars from '../styles/vars';

const AUDITORY_LABELS = {
  m: 'Для мужчин',
  f: 'Для женщин',
  p: 'Для подростков',
  c: 'Для детей',
};

export default function Filter({ filters, onChange, onClear }) {
  const B = 'filter';

  const router = useRouter();

  const filterSelects = [
    {
      code: 'auditory',
      name: 'Для кого?',
      options: filters.auditory.map((auditory) => ({
        value: auditory,
        label: AUDITORY_LABELS[auditory],
        isSelected: auditory === router.query.auditory,
      })),
    },
    {
      code: 'type',
      name: 'Тип обуви',
      options: filters.type.map((type) => ({
        value: type,
        label: type,
        isSelected: type === router.query.type,
      })),
    },
  ].filter((select) => select.options.length > 0);

  function onChangeSelect(filterCode, value, action) {
    if (action === 'clear') onClear(filterCode);
    else onChange(filterCode, value);
  }

  return (
    <div className={B}>
      {filterSelects.map((filter) => (
        <div className={`${B}__field`} key={filter.code}>
          <Select
            isClearable
            options={filter.options}
            instanceId={`${B}-select-${filter.code}`}
            className={`${B}__select`}
            classNamePrefix={`${B}`}
            placeholder={filter.name}
            onChange={(option, { action }) => onChangeSelect(filter.code, option?.value, action)}
            isSearchable={false}
            defaultValue={filter.options.find((option) => option.isSelected)}
          />
        </div>
      ))}

      <style jsx global>
        {`
        .${B} {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }

        .${B}__field {
          width: ${100 / filterSelects.length}%;
          padding: 10px;
        }

        .${B} .${B}__select,
        .${B} .${B}__menu {
          border: 2px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius};
        }

        .${B} .${B}__single-value,
        .${B} .${B}__placeholder {
          color: ${styleVars.colors.green};
        }

        .${B} .${B}__indicator-separator {
          display: none;
        }

        .${B} .${B}__indicator svg {
          color: ${styleVars.colors.green};
        }

        .${B} .${B}__menu {
          overflow: hidden;
        }

        .${B} .${B}__option:active,
        .${B} .${B}__option--is-focused,
        .${B} .${B}__option--is-selected {
          background: ${styleVars.colors.green};
          color: #fff;
        }

        .${B} .${B}__control {
          border: none;
          border-radius: inherit;
          box-shadow: none;
        }

        .${B} .${B}__menu-list {
          padding-top: 0;
          padding-bottom: 0;
        }

        @media (max-width: 480px) {
          .${B}__field {
            width: 100%;
          }
        }
        `}
      </style>
    </div>
  );
}

Filter.propTypes = {
  filters: proptypes.filters.isRequired,
  onChange: proptypes.func.isRequired,
  onClear: proptypes.func.isRequired,
};
