import "./index.scss";
import { Button, Input, Dropdown, Space,message } from "antd";
import { ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const { Search } = Input;

export default function Header() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const [useName, setUseName] = useState("");
  const onSearch = (value: string) => {

  };
  const setting = () => {
    navigateTo("/PersonalSettings");
  };
  const logOut=()=>{
    window.localStorage.removeItem('userName')
    setUseName('');
    message.success("Log out successfully");
    navigateTo("/");
  }
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={setting}>
          Personal Settings
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logOut}>
          Log out
        </a>
      ),
    },
  ];
  useEffect(() => {
    console.log(location.pathname,'location.pathname');
    
    const localUserName: string = window.localStorage.getItem("userName") || "";
    setUseName(localUserName);
  }, [location.pathname]);
  return (
    <header className="header">
      <div>Cartcove</div>
      <div className="search">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div>
        <Button shape="round">
          <ShoppingCartOutlined />
          My Bag
        </Button>
      </div>
      {useName ? (
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <a onClick={(e) => e.preventDefault()} style={{color:'#1677ff',cursor:'pointer'}}>
            <Space>
              {useName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <Button shape="round">
          <Link to="/SignIn">Sign In</Link>
        </Button>
      )}
    </header>
  );
}
