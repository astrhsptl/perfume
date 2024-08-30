import Checkbox from '@mui/material/Checkbox';
import HeaderTableStyles from '../table.module.css';
interface header {}
export const Header: React.FC<header> = () => {
  return (
    <>
      <div className={HeaderTableStyles.header_teb}>
        <div className={HeaderTableStyles.cell}>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
        </div>
        <div className={HeaderTableStyles.cell}>Номер</div>
        <div className={HeaderTableStyles.cell}>Клиент</div>
        <div className={HeaderTableStyles.cell}>Контакты</div>
        <div className={HeaderTableStyles.cell}>Дата и время покупки</div>
        <div
          className={HeaderTableStyles.cell}
          style={{ justifySelf: 'center' }}
        >
          Стоимость заказа
        </div>
        <div className={HeaderTableStyles.cell}>Статус</div>
      </div>
    </>
  );
};
