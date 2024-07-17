import Checkbox from '@mui/material/Checkbox';

interface header {}
export const Header: React.FC<header> = () => {
  return (
    <>
      <div className='table-row'>
        <div className='cell-check'>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
          Номер
        </div>
        <div className='cell'>Клиент</div>
        <div className='cell'>Контакты</div>
        <div className='cell'>Дата и время покупки</div>
        <div className='cell'>Стоимость заказа</div>
        <div className='cell'>Статус</div>
      </div>
    </>
  );
};
