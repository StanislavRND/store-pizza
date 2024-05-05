import React from 'react';
type CategoriesProps = {
  value: number;
  onCLickCategory: (index: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onCLickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            onClick={() => onCLickCategory(index)}
            className={value === index ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
