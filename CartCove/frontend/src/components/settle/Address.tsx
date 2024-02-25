import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from "axios";

interface Address {
    id: number;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

const Address = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
    const [form] = Form.useForm();

    const fetchAddresses = async () => {
        const response = await axios.get('https://www.cartcove.org/api/addresses/', {
            headers: {
                Authorization: "Token " + window.localStorage.getItem("Token"),
            },
        });
        setAddresses(response.data);
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const showModal = (address: Address | null) => {
        setIsModalVisible(true);
        setCurrentAddress(address);
        if (address) {
            form.setFieldsValue(address);
        } else {
            form.resetFields();
        }
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        if (currentAddress) {
            // Update
            await axios.put(`https://www.cartcove.org/api/addresses/${currentAddress.id}/`, values, {
                headers: {
                    'Authorization': "Token " + window.localStorage.getItem("Token"),
                },
            });
        } else {
            // Create
            await axios.post('https://www.cartcove.org/api/addresses/', values, {
                headers: {
                    'Authorization': "Token " + window.localStorage.getItem("Token"),
                },
            });
        }
        setIsModalVisible(false);
        fetchAddresses(); // 刷新列表
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Zip Code',
            dataIndex: 'zip_code',
            key: 'zip_code',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Button type="link" onClick={() => showModal(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <div style={{ margin: '20px' }}>
            <Button type="primary" onClick={() => showModal(null)}>
                Add Address
            </Button>
            <Table dataSource={addresses} columns={columns} rowKey="id" />

            <Modal title="Edit Address" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="city" label="City" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="state" label="State" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="zip_code" label="Zip Code" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Address;
