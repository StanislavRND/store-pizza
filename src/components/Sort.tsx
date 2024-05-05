import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sort, sortPropertyEnum } from '../redux/filter/types';
import { setSort } from '../redux/filter/slice';

type ListItem = {
  name: string;
  sortProperty: sortPropertyEnum;
};

interface ExtendedMouseEvent extends MouseEvent {
  composedPath(): EventTarget[];
}

type SortPopupProps = {
  value: Sort;
};

export const list: ListItem[] = [
  { name: 'популярности', sortProperty: sortPropertyEnum.RATING },
  { name: 'цене', sortProperty: sortPropertyEnum.PRICE },
  { name: 'алфавиту', sortProperty: sortPropertyEnum.TITLE },
];

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: ListItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: ExtendedMouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((el, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(el)}
                className={value.sortProperty === el.sortProperty ? 'active' : ''}>
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
export default SortPopup;
