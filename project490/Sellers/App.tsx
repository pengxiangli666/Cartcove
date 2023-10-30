import React from 'react';
import SellerLogin from './SellerLogin';

const App: React.FC = () => {
    const handleLogin = (username: string, password: string) => {
        console.log('Username:', username);
        console.log('Password:', password);
        // After the backend is completed, add your login logic here
    };

    return (
        <div className="app">
            <SellerLogin onLogin={handleLogin} />
        </div>
    );
};

export default App;
