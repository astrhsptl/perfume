'use client';

import { EntityId, FilterStyle } from '@/shared';
import {
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

type Value = { key: EntityId; value: ReactNode };

interface FilterModalDropdownProps {
  title: string;
  items: Value[];
}

export function FilterModalDropdown({
  title,
  items,
}: FilterModalDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(() => !open);
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        color: '#fff',
        '& .MuiTypography-root': { fontFamily: 'inherit' },
        '& .MuiButtonBase-root': {
          paddingLeft: 0,
        },
      }}
      component='div'
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon
          sx={{
            '&': {
              minWidth: 30,
            },
          }}
        >
          <Image
            src={'/arrow-down.svg'}
            alt='Открыть / закрыть меню'
            width={14}
            height={7}
            className={clsx(
              FilterStyle.filterDropdownArrow,
              open && FilterStyle.open
            )}
          />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List
          component='div'
          sx={{
            '& .MuiButtonBase-root': {
              paddingLeft: 2,
            },
          }}
        >
          {items.map(({ key, value }, index) => (
            <ListItemButton key={key} sx={{ pl: 2 }}>
              <ListItemIcon
                sx={{
                  '&': {
                    minWidth: 30,
                  },
                }}
              >
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
              </ListItemIcon>
              <ListItemText primary={value} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
