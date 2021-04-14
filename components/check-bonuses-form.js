import { useState } from 'react';
import axios from 'axios';
import styleVars from '../styles/vars';
import PhoneTailField from './phone-tail-field';
import CardNumberField from './card-number-field';
import DialogOverlay from './dialog-overlay';
import DialogWindow from './dialog-window';

const PHONE_TAIL_LENGTH = 4;
const CARD_NUMBER_LENGTH = 13;
const ERROR_MESSAGE = {
  404: 'Карта с указанными данными не зарегистрирована',
  501: 'Не удалось проверить бонусы. Пожалуйста, свяжитесь с нами по телефону',
};

export default function CheckBonusesForm() {
  const B = 'check-bonuses-form';

  const [phoneTail, setPhoneTail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [bonusCount, setBonusCount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resultDialogIsOpened, setResultDialogIsOpened] = useState(false);

  const closeResultDialog = () => setResultDialogIsOpened(false);

  function isFormFilled() {
    return phoneTail.length === PHONE_TAIL_LENGTH
      && cardNumber.length === CARD_NUMBER_LENGTH;
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!isFormFilled()) return;

    const query = [
      `phoneTail=${phoneTail}`,
      `cardNumber=${cardNumber}`,
    ].join('&');

    try {
      const { data } = await axios.get(`/api/bonuses?${query}`);

      setBonusCount(data.count);
      setErrorMessage(null);
    } catch ({ response }) {
      setBonusCount(null);
      setErrorMessage(ERROR_MESSAGE[response.status] || ERROR_MESSAGE[501]);
    } finally {
      setResultDialogIsOpened(true);
    }
  }

  return (
    <div className={B}>
      <div className={`${B}__description`}>
        Здесь вы&nbsp;можете узнать, сколько бонусов накопилось на&nbsp;вашей карте.<br/>
        Для этого укажите последние четыре цифры своего номера телефона и&nbsp;номер карты.
      </div>

      <form onSubmit={onSubmit}>
        <div className={`${B}__section`}>
          <PhoneTailField
            value={phoneTail}
            onChange={setPhoneTail}
            maxLength={PHONE_TAIL_LENGTH}
          />
        </div>

        <div className={`${B}__section`}>
          <CardNumberField
            value={cardNumber}
            onChange={setCardNumber}
            maxLength={CARD_NUMBER_LENGTH}
          />
        </div>

        {isFormFilled() && (
          <div className={`${B}__section`}>
            <button type="submit" className={`${B}__button`}>
              Проверить
            </button>
          </div>
        )}
      </form>

      {resultDialogIsOpened && (
        <>
          <DialogOverlay onClick={closeResultDialog}/>

          <DialogWindow mix={`${B}__result`} onClose={closeResultDialog}>
            {errorMessage || (
              <>
                На вашей карте
                {' '}
                <span className={`${B}__count-value`}>{bonusCount}</span>
                {' '}
                бонусов
              </>
            )}
          </DialogWindow>
        </>
      )}

      <style jsx global>
        {`
        .${B} {
          padding: ${styleVars.padding}px;
        }

        .${B}__description {
          padding: ${styleVars.padding}px 0 ${styleVars.padding * 2}px;
          line-height: 1.5;
        }

        .${B}__section {
          padding: ${styleVars.padding}px 0;
          display: flex;
          justify-content: center;
        }

        .${B}__button {
          background: none;
          border: 1px solid ${styleVars.colors.green};
          border-radius: ${styleVars.borderRadius}px;
          padding: ${styleVars.padding}px;
          font-size: 20px;
          color: ${styleVars.colors.green};
          cursor: pointer;
        }

        .${B}__button:hover,
        .${B}__button:focus {
          outline: none;
          background: ${styleVars.colors.green};
          color: #fff;
        }

        .${B}__result {
          padding: ${styleVars.padding * 2}px;
          font-size: 20px;
          text-align: center;
        }

        .${B}__count-value {
          color: ${styleVars.colors.green};
          font-weight: 500;
        }
        `}
      </style>
    </div>
  );
}
