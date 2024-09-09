import { OrderComplectation } from '@/shared';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <div className={OrderComplectation.tableHead}>
        <div className={OrderComplectation.cell}>Номер</div>
        <div className={OrderComplectation.cell}>Наименование</div>
        <div className={OrderComplectation.cell}>Объем</div>
        <div className={OrderComplectation.cell}>Кол-во</div>
        <div className={OrderComplectation.cell}>Стоимость единицы</div>
        <div className={OrderComplectation.cell}>Итого</div>
      </div>
    </>
  );
};
