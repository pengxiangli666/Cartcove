import React, { useState } from 'react';
import { BookOutlined, HomeOutlined, PayCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import ProductInfoPage from "../../components/settle/Settle";
import Address from '../../components/settle/Address';
import PaymentsPage from '../../components/settle/Pay';
import OrdersPage from '../../components/settle/Order';


const items: MenuProps['items'] = [
    {
        label: 'Overview',
        key: 'Overview',
        icon: <ShoppingCartOutlined style={{ fontSize: '20px' }} />,
    },
    {
        label: 'Payment methods',
        key: 'pay',
        icon: <PayCircleOutlined style={{ fontSize: '20px' }} />,
    },
    {
        label: 'Billing history',
        key: 'billing',
        icon: <BookOutlined style={{ fontSize: '20px' }} />,
    },
    {
        label: "Address",
        key: "address",
        icon: <HomeOutlined style={{ fontSize: '20px' }} />
    }
];

const Settle: React.FC = () => {
    const [current, setCurrent] = useState('Overview');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div style={{ backgroundColor: 'white', height: '95%' }}>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                style={{ fontSize: '20px' }}
            />
            {current === 'Overview' && <ProductInfoPage current={current} setCurrent={setCurrent} />}
            {current === 'address' && <Address />}
            {current === 'pay' && <PaymentsPage />}
            {current === 'billing' && <OrdersPage />}
        </div>
    );
};

export default Settle;