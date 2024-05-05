import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{ imageUrl: string; title: string; price: number }>();
  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(`https://65bcc6cab51f9b29e93241eb.mockapi.io/items/${id}`);
        setPizza(response.data);
      } catch (error) {
        alert('Ошибка при получении пиццы.');
        navigate('/');
      }
    };
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <img style={{ marginBottom: '10px' }} src={pizza.imageUrl} alt="" />
      <h2 style={{ marginBottom: '10px' }}>{pizza.title}</h2>
      <h4 style={{ marginBottom: '20px' }}>{pizza.price} ₽</h4>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
