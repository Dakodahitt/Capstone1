import { Link } from 'react-router-dom';

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <Link to={`/item/${item.id}`}>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemList;