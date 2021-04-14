import { useState } from 'react';
import styleVars from '../styles/vars';
import PhoneTailField from './phone-tail-field';
import CardNumberField from './card-number-field';

export default function CheckBonusesForm() {
  const B = 'check-bonuses-form';

  const [phoneTail, setPhoneTail] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  return (
    <form className={B}>
      <div className={`${B}__description`}>
        Здесь вы&nbsp;можете узнать, сколько бонусов накопилось на&nbsp;вашей карте.<br/>
        Для этого укажите последние четыре цифры своего номера телефона и&nbsp;номер карты.
      </div>

      <div className={`${B}__fields`}>
        <div className={`${B}__field`}>
          <PhoneTailField
            value={phoneTail}
            onChange={setPhoneTail}
          />
        </div>

        <div className={`${B}__field`}>
          <CardNumberField
            value={cardNumber}
            onChange={setCardNumber}
          />
        </div>
      </div>

      <style jsx global>
        {`
        .${B} {
          padding: ${styleVars.padding}px;
        }

        .${B}__description {
          padding: ${styleVars.padding}px 0 ${styleVars.padding * 2}px;
          line-height: 1.5;
        }

        .${B}__field {
          padding: ${styleVars.padding}px 0;
          display: flex;
          justify-content: center;
        }
        `}
      </style>
    </form>
  );
}
