import HeaderTableStyles from '@/widgets/Order/table.module.css';
import Checkbox from '@mui/material/Checkbox';
interface header {}
export const Header: React.FC<header> = () => {
  return (
    <>
      <div className={HeaderTableStyles.header_teb}>
        <div className={HeaderTableStyles.cell}>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
        </div>
        <div className={HeaderTableStyles.cell}>Номер</div>
        <div className={HeaderTableStyles.cell}>Наименование</div>
        <div className={HeaderTableStyles.cell}>Объем</div>
        <div className={HeaderTableStyles.cell}>Кол-во</div>
        <div
          className={HeaderTableStyles.cell}
          style={{ justifySelf: 'center' }}
        >
          Стоимость единицы
        </div>
        <div className={HeaderTableStyles.cell}>Итого</div>
      </div>
    </>
  );
};
