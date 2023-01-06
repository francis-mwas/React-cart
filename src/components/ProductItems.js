import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './../App.css';
import Product from './Product';

export default function ProductItems({ items, onAdd, onRemove, cartItems }) {
  const [search, setSearch] = useState('');
  console.log('The items are here: ', items);

  const totalAmount = cartItems.reduce(
    (acc, curItem) =>
      parseInt(acc) + curItem.quantity * parseInt(curItem.selling_price),
    0
  );
  console.log('The total amount is : ', totalAmount);
  return (
    <React.Fragment>
      <div className="app">
        <div className="rectangle">
          <div className="search-rectangle">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              style={{ border: 'none' }}
              className="search-product"
              placeholder="Search products"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <h4 className="create-transaction">Create transaction</h4>
          {/* products comes here  */}
          {items
            ? items.map((item) => (
                <Product
                  productId={item.id}
                  item={item}
                  key={Math.random()}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  count={item.quantity}
                  cartItems={cartItems}
                />
              ))
            : 'No data'}
          <div className="rectangle-total">
            <h5 className="total-amount">Total amount</h5>
            <span className="kes">KES- {totalAmount}</span>

            {/* <div className='done-rectangle'> */}

            <div className="done-rectangle">
              <button className="done-button">
                Done
                <ArrowForwardIcon className="done-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
