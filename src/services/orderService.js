import axios from "axios";

const Order_API = "http://localhost:3000/orders";

export async function createOrder(orderData) {
  const response =await axios.post(Order_API, orderData);
  return response.data
}

export async function getUserOrders (userId){
    const response = await axios.get(Order_API,{
        params : {
            userId
        }
    })
return response.data
}
export async function updateOrderStatus(orderId, status) {
  const response = await axios.patch(`${Order_API}/${orderId}`, {
    status,
  });

  return response.data;
}