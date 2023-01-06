import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItems from './components/ProductItems';

//Backend connection
const accessToken = '180|v0n3wJMC0ZC1PQbZ3ybMDzBPxNyPbXWn9FOgrbCW';
const apiUrl = 'https://live.phindor.com/phindor-api/public/api';

const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const App = () => {
  const [data, setData] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  let newOperationData = [];
  console.log('The cart neeeeeeeeeeeeeeeew itms: ', cartItems);
  // Format items to add quantity which defaults to 1
  const formatItems = (data) => {
    data.map((item) => {
      item.quantity = 1;
    });
  };

  useEffect(() => {
    authAxios
      .get('/list-products/614')
      .then((res) => {
        formatItems(res.data.jsonData);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (data.jsonData) {
    newOperationData = [...data.jsonData];
  }

  const onAdd = (dataItem) => {
    const itemExists = cartItems
      ? cartItems.find((item) => item.id === dataItem.id)
      : null;
    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === dataItem.id
            ? { ...itemExists, quantity: itemExists.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...dataItem,
          quantity: dataItem.quantity,
          otherz: 'here we go',
        },
      ]);
    }
  };
  console.log('The cart items: ', cartItems);
  const onRemove = (dataItem) => {
    const itemExists = cartItems
      ? cartItems.find((item) => item.id === dataItem.id)
      : null;
    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === dataItem.id
            ? {
                ...itemExists,
                quantity: itemExists.quantity > 0 ? itemExists.quantity - 1 : 0,
              }
            : item
        )
      );
    }
  };

  return (
    <div>
      <ProductItems
        items={newOperationData}
        onAdd={onAdd}
        onRemove={onRemove}
        cartItems={cartItems}
      />
    </div>
  );
};

export default App;
