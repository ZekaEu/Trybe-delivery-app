import { useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import ProductsNavigation from '../Components/ProductsNavigation';
import DeliveryContext from '../Context/DeliveryContext';

export default function OrderDetails() {
  const { fetchOrder, order } = useContext(DeliveryContext);

  const { id } = useParams();
  useEffect(() => {
    fetchOrder(id).then(() => console.log(order));
  });
  // const navigate = useNavigate();
  // const [removeItem, setRemoveItem] = useState('');
  // const [sellerId, setSellerId] = useState(2);
  // const [deliveryAddress, setDeliveryAddress] = useState('');
  // const [deliveryNumber, setDeliveryNumber] = useState('');
  // const { totalPrice,
  //   setTotalPrice, fetchSellers, sellers } = useContext(DeliveryContext);

  // const cart = JSON.parse(localStorage.getItem('cart'));
  // const user = JSON.parse(localStorage.getItem('user'));
  // useEffect(() => {
  //   fetchSellers();
  //   if (cart) {
  //     const total = cart.reduce(
  //       (acc, item) => acc + Number(item.price * item.quantity),
  //       0,
  //     );
  //     setTotalPrice(total.toFixed(2));
  //   }
  //   const newCart = cart.filter((product) => product.id !== removeItem);
  //   localStorage.setItem('cart', JSON.stringify(newCart));
  //   setRemoveItem('');
  // }, [removeItem]);

  // const completePurchase = async () => {
  //   const arrProducts = cart
  //     .map((sku) => ({ productId: sku.id, quantity: sku.quantity }));
  //   const requestParam = {
  //     userId: user.id,
  //     sellerId,
  //     totalPrice,
  //     deliveryAddress,
  //     deliveryNumber,
  //     status: 'Pendente',
  //     arrProducts,
  //   };

  //   const { data } = await axios({
  //     method: 'post',
  //     url: POST_SALE,
  //     data: requestParam,
  //     headers: { Authorization: user.token },
  //   });
  //   localStorage.removeItem('cart');
  //   navigate(`/customer/orders/${data.id}`);
  //   setTotalPrice(0);
  // };

  return (
    <div>
      { console.log(order) }
      <ProductsNavigation />
      <table className="table table-striped mt-4 align-middle">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(order).length !== 0 && (
            order.products.map(({ name, price, quantity }, index) => (
              <tr key={ `${name}` }>
                <th
                  scope="row"
                  data-testid={ `${index}` }
                >
                  { index + 1 }
                </th>
                <td
                  data-testid={ `${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `${index}` }
                >
                  { quantity }
                </td>
                <td
                  data-testid={ `${index}` }
                >
                  { (price).replace('.', ',') }
                </td>
                <td
                  data-testid={ `${index}` }
                >
                  { (Number(price) * Number(quantity))
                    .toFixed(2).replace('.', ',') }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div
        className="checkout_total_price d-flex justify-content-center"
        data-testid="customer_checkout__element-order-total-price"
      >
        Total: R$
        <span data-testid="customer_products__checkout-bottom-value">
          { Object.keys(order).length && order.totalPrice.replace('.', ',') }
        </span>
      </div>
    </div>
  );
}
