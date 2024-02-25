import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, FormInstance } from 'antd';
import axios from 'axios';

interface Payment {
  id: number;
  card_number: string;
  expiry_date: string;
  cvc: string;
}

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);
  const [form] = Form.useForm();

  const fetchPayments = async () => {
    try {
      const response = await axios.get<Payment[]>('http://127.0.0.1:8000/api/payments/', {
        headers: {
          'Authorization': "Token " + window.localStorage.getItem("Token"),
        },
      });
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const showModal = (payment?: Payment) => {
    setIsModalVisible(true);
    setCurrentPayment(payment || null);
    form.setFieldsValue(payment || { card_number: '', expiry_date: '', cvc: '' });
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      if (currentPayment) {
        // 修改支付方式
        await axios.put(`http://127.0.0.1:8000/api/payments/${currentPayment.id}/`, values, {
          headers: {
            'Authorization': "Token " + window.localStorage.getItem("Token"),
          },
        });
      } else {
        // 添加支付方式
        await axios.post('http://127.0.0.1:8000/api/payments/', values, {
          headers: {
            'Authorization': "Token " + window.localStorage.getItem("Token"),
          },
        });
      }
      setIsModalVisible(false);
      fetchPayments(); // 刷新列表
    } catch (error) {
      console.error('Failed to submit payment:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Card Number',
      dataIndex: 'card_number',
      key: 'card_number',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
    },
    {
      title: 'CVC',
      dataIndex: 'cvc',
      key: 'cvc',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: undefined, record: Payment) => (
        <Button type="link" onClick={() => showModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div style={{ margin: '20px' }}>
      <Button type="primary" onClick={() => showModal()}>
        Add Payment Method
      </Button>
      <Table dataSource={payments} columns={columns} rowKey="id" />

      <Modal title={currentPayment ? "Edit Payment Method" : "Add Payment Method"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="card_number" label="Card Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="expiry_date" label="Expiry Date" rules={[{ required: true }]}>
            <Input placeholder="MM/YY" />
          </Form.Item>
          <Form.Item name="cvc" label="CVC" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentsPage;
