import React, { useEffect, useState } from 'react';
import { Card, Select, Button, Col, Row } from 'antd';
import axios from "axios";
import './Settle.css';

const { Option } = Select;


interface ProductInfo {
    product: {
        id: number;
        name: string;
        price: string;
        image: string;
    };
    quantity: number;
}

interface Order {
    id: number;
    user: number;
    address: null | string;
    payment: null | string;
    ordered: boolean;
    products_info: ProductInfo[];
    products: { product_id: number; quantity: number }[];
    price: string;
    ordered_on: string;
}

interface Payment {
    id: number;
    cvc: string;
    card_number: string;
    expiry_date: string;
}

interface Address {
    id: number;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

interface ConfirmData {
    address: number;
    ordered: boolean;
    payment: number;
    orderId: number;
}

interface ProductInfoPageProps {
    current: string;
    setCurrent: React.Dispatch<React.SetStateAction<string>>;
}


const ProductInfoPage: React.FC<ProductInfoPageProps> = ({ current, setCurrent }) => {
    const [orders, setOrders] = useState<Order[]>([]);;
    const [totalPrice, setTotalPrice] = useState(0);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);

    const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

    const handleConfirmClick = async () => {
        if (selectedPayment && selectedAddress) {
            const url = `http://127.0.0.1:8000/api/orders/${orders[0].id}/`;
            const data = {
                address: selectedAddress,
                ordered: true,
                payment: selectedPayment,
            };

            try {
                const response = await axios.patch(url, data, {
                    headers: {
                        Authorization: "Token " + window.localStorage.getItem("Token"),
                    },
                });
                setCurrent('billing');
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };


    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/orders/?pay=true', {
                headers: {
                    Authorization: "Token " + window.localStorage.getItem("Token"),
                },
            });
            setOrders(response.data);
            let total = 0;
            response.data.forEach((order: Order) => {
                order.products_info.forEach((productInfo) => {
                    total += Number(productInfo.product.price) * productInfo.quantity;
                });
            });
            setTotalPrice(total);

        };

        const fetchPayments = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/payments/', {
                headers: {
                    Authorization: "Token " + window.localStorage.getItem("Token"),
                },
            });
            setPayments(response.data);
        };

        const fetchAddresses = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/addresses/', {
                headers: {
                    Authorization: "Token " + window.localStorage.getItem("Token"),
                },
            });
            setAddresses(response.data);
        };

        fetchOrders();
        fetchPayments();
        fetchAddresses();
    }, []);

    return (
        <div className="settle-container">
            <Card className="card">
                <div className="card-header">
                    <h3>Cart Info</h3>
                </div>
                <div className="card-content">
                    {orders.map((order) => (
                        <div key={order.id}>
                            <Row justify="center">
                                <Col span={6} style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}>Product Name</Col>
                                <Col span={6} style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}>Quantity</Col>
                                <Col span={6} style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}>Unit Price</Col>
                                <Col span={6} style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}>Total Price</Col>
                            </Row>
                            {order.products_info.map((productInfo) => (
                                <Row justify="center" align="middle" key={productInfo.product.id}>
                                    <Col span={6} style={{ textAlign: 'center', fontSize: '18px' }}>{productInfo.product.name}</Col>
                                    <Col span={6} style={{ textAlign: 'center', fontSize: '18px' }}>{productInfo.quantity}</Col>
                                    <Col span={6} style={{ textAlign: 'center', fontSize: '18px' }}>¥{productInfo.product.price}</Col>
                                    <Col span={6} style={{ textAlign: 'center', fontSize: '18px', color: 'red' }}>¥{Number(productInfo.product.price) * productInfo.quantity}</Col>
                                </Row>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="card-footer" style={{ fontSize: '20px' }}>
                    <div >Total</div>
                    <div style={{ color: 'red' }}>${totalPrice}</div>
                </div>
            </Card>
            <div className="select-container">
                <label htmlFor="payment-method">Payment Method Selection</label>
                {
                    payments.length === 0 ? (
                        <div style={{ color: 'red' }}>Please add a payment method</div>
                    ) : (
                        <Select id="billing-address" placeholder="Select Payment Method" className="select" onChange={(value: number) => setSelectedPayment(value)}>
                            {payments.map((payment) => (
                                <Option key={payment.id} value={payment.id}>
                                    Card Number: {payment.card_number}
                                </Option>
                            ))}
                        </Select>
                    )
                }
            </div>
            <div className="select-container">
                <label htmlFor="billing-address">Billing Address Selection</label>
                {
                    addresses.length === 0 ? (
                        <div style={{ color: 'red' }}>Please add a billing address</div>
                    ) : (
                        <Select id="billing-address" placeholder="Select Billing Address" className="select" onChange={(value: number) => setSelectedAddress(value)}>
                            {addresses.map((address) => (
                                <Option key={address.id} value={address.id}>
                                    {address.address}, {address.city}, {address.state}, {address.zip_code}, {address.country}
                                </Option>
                            ))}
                        </Select>
                    )
                }
            </div>
            <Button className="submit-button" type="primary" onClick={handleConfirmClick}>Confirm</Button>
        </div>
    );
};

export default ProductInfoPage;
