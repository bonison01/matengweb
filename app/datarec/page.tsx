'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from './Orders.module.css';

interface Order {
  id: number;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  buyer_name: string;
  buyer_address: string;
  buyer_phone: string;
  business_id: string;
  email: string;
  created_at: string;
  status: string;
  item_list: { id: number; name: string; price: number; total: number; quantity: number }[]; // Assuming item_list is an array of objects
  total_price: number;
  total_calculated_price: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch data from Supabase on mount
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('order_rec')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setOrders(data || []); // Ensure data is never null
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order List</h1>
      {orders.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Buyer Name</th>
              <th>Buyer Address</th>
              <th>Buyer Phone</th>
              <th>Business ID</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Item List</th>
              <th>Total Price</th>
              <th>Total Calculated Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.order_id}</td>
                <td>{order.product_id}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.buyer_name}</td>
                <td>{order.buyer_address}</td>
                <td>{order.buyer_phone}</td>
                <td>{order.business_id}</td>
                <td>{order.email}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>{order.status}</td>

                {/* Handling item_list (assuming it's an array of objects) */}
                <td>
                  {order.item_list.map((item) => (
                    <div key={item.id}>
                      <span>{item.name}</span> - 
                      <span>{item.quantity} x ${item.price}</span> = 
                      <span>${item.total}</span>
                    </div>
                  ))}
                </td>

                <td>{order.total_price}</td>
                <td>{order.total_calculated_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default Orders;
