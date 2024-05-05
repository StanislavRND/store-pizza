import debounce from 'lodash.debounce';
import React from 'react';
import { useDispatch } from 'react-redux';
import close from '../../assets/img/4115230_cancel_close_delete_icon.svg';
import search from '../../assets/img/9035548_search_outline_icon (1).svg';
import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className={styles.root}>
      <img src={search} alt="svg" className={styles.icon} />
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
      />
      {value && <img className={styles.close} src={close} alt="close" onClick={onClickClear} />}
    </div>
  );
};
export default Search;
