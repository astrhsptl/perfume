import Checkbox from '@mui/material/Checkbox';

interface header {}
export const Header: React.FC<header> = () => {
  return (
    <>
      <div className='table-row table-container--main'>
        <div className='cell'>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
        </div>
        <div className='cell'>Номер</div>
        <div className='cell'>Клиент</div>
        <div className='cell'>Контакты</div>
        <div className='cell'>Дата и время покупки</div>
        <div className='cell' style={{ justifySelf: 'center' }}>
          Стоимость заказа
        </div>
        <div className='cell'>Статус</div>
      </div>
    </>
  );
};
