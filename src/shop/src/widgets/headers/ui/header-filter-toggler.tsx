'use client';

import { FilterItemsForm, perfumeListActions } from '@/entities';
import { perfumeAPIBuild, useAppDispatch } from '@/features';
import { useModal } from '@/features/use-modal';
import { ParamManager, ProductListStyle } from '@/shared';
import { FilterModal } from '@/widgets/modals';
import Image from 'next/image';
import { useEffect } from 'react';

interface HeaderFilterTogglerProps {}

export const HeaderFilterToggler = ({}: HeaderFilterTogglerProps) => {
  const dispatch = useAppDispatch();
  const perfumeApi = perfumeAPIBuild.clientApi();
  const { child, modalPromise, toggle } = useModal<FilterItemsForm>(
    <FilterModal />
  );

  useEffect(() => {
    modalPromise
      ?.catch(() => null)
      .then((data) => {
        if (data === null) return;

        data.sex.forEach((sex) =>
          ParamManager.setParam(window, 'sex', sex.value)
        );
        data.perfume_type_id.forEach((type) =>
          ParamManager.setParam(window, 'type_id', type.key.toString())
        );
        data.brand_id.forEach((brand) =>
          ParamManager.setParam(window, 'brand_id', brand.key.toString())
        );
        ParamManager.setParam(window, 'cost_from', data.cost.from.toString());
        ParamManager.setParam(window, 'cost_to', data.cost.to.toString());

        perfumeApi
          .fetchAll({
            params: {
              ...ParamManager.readParams(window),
            },
          })
          .then((data) => {
            if (data === null) return;
            dispatch(perfumeListActions.set(data.data.data));
          });
      });
  }, [modalPromise]);

  return (
    <>
      <div
        className={ProductListStyle.filterToggleContainer}
        onClick={() => toggle()}
      >
        <Image
          src={'/filter.svg'}
          alt={'Открыть фильтр'}
          height={17}
          width={21}
        />
      </div>
      {child}
    </>
  );
};
