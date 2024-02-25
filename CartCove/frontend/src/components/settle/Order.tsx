import React, { useState, useEffect } from 'react';
import { Card, List, Tag } from 'antd';
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
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get<Order[]>('https://www.cartcove.org/api/orders/', {
                headers: {
                    'Authorization': "Token " + window.localStorage.getItem("Token"),
                },
            });
            setOrders(response.data);
        };

        fetchOrders();
    }, []);

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={orders}
            renderItem={order => (
                <List.Item key={order.id}>
                    <Card title={`Order #${order.id}`} extra={order.ordered ? <Tag color="green">Completed</Tag> : <Tag color="volcano">Pending</Tag>}>
                        <List
                            itemLayout="horizontal"
                            dataSource={order.products_info}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={item.product.image} alt={item.product.name} style={{ width: '48px', height: '48px' }} />}
                                        title={item.product.name}
                                        description={`Quantity: ${item.quantity} - Price: $${item.product.price}`}
                                    />
                                </List.Item>
                            )}
                        />
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <Tag color="blue">Total Price: ${order.price}</Tag>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default OrdersPage;
