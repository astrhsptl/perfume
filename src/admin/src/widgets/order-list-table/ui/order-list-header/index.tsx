import { OrderCommonStyles } from '@/shared';
import Checkbox from '@mui/material/Checkbox';

interface OrderListHeader {}
export const OrderListHeader: React.FC<OrderListHeader> = () => {
  return (
    <>
      <div className={OrderCommonStyles.header_teb}>
        <div className={OrderCommonStyles.cell}>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
        </div>
        <div className={OrderCommonStyles.cell}>Номер</div>
        <div className={OrderCommonStyles.cell}>Клиент</div>
        <div className={OrderCommonStyles.cell}>Контакты</div>
        <div className={OrderCommonStyles.cell}>Дата и время покупки</div>
        <div
          className={OrderCommonStyles.cell}
          style={{ justifySelf: 'center' }}
        >
          Стоимость заказа
        </div>
        <div className={OrderCommonStyles.cell}>Статус</div>
      </div>
    </>
  );
};
