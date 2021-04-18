import styleVars from '../styles/vars';

export default function BonusProgramDescription() {
  const B = 'bonus-program-description';

  return (
    <div className={B}>
      Описание бонусной программы.

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
