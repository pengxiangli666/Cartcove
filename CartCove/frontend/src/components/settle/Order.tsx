import React, { useState, useEffect } from 'react';
import { Card, List, Tag } from 'antd';
import { message } from 'antd';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

interface ProductInfo {
    product: Product;
    quantity: number;
}

interface Order {
    id: number;
    user: number;
    address: any;
    payment: any;
    ordered: boolean;
    products_info: ProductInfo[];
    products: { product_id: number; quantity: number }[];
    price: string;
    ordered_on: string;
    status: string;
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get<Order[]>('/api/orders/', {
                headers: {
                    'Authorization': "Token " + window.localStorage.getItem("Token"),
                },
            });
            setOrders(response.data);
        };

        fetchOrders();
    }, []);

    const handleRefund = async (orderId: number) => {
        try {
            // Send a request to your API
            await axios.patch(`/api/orders/${orderId}/`, { status: "refund" }, {
                headers: {
                    'Authorization': "Token " + window.localStorage.getItem("Token"),
                },
            });

            const response = await axios.get<Order[]>('/api/orders/', {
                headers: {
                    'Authorization': "Token " + window.localStorage.getItem("Token"),
                },
            });
            setOrders(response.data);

            // Show a success message
            message.success('Refund successful');
        } catch (error) {
            // Handle error
            console.error('Error refunding order:', error);
            message.error('Error refunding order');
        }
    };

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={orders}
            renderItem={order => (
                <List.Item key={order.id}>
                    <Card title={`Order #${order.id}`} extra={<Tag color="green">{order.status}</Tag>}>
                        <List
                            itemLayout="horizontal"
                            dataSource={order.products_info}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={item.product.image} style={{ width: '110px', height: '110px' }} />}
                                        title={<div style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</div>}
                                        description={`Quantity: ${item.quantity} - Price: $${item.product.price}`}
                                    />
                                </List.Item>
                            )}
                        />
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <Tag color="blue">Total Price: ${order.price}</Tag>
                            <Tag color='red' onClick={() => handleRefund(order.id)}>Refund</Tag>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default OrdersPage;
