import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, Switch, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Privacy Settings",
    children: (
      <ul>
        <li>
          Records search behavior logs
          <Switch style={{ marginLeft: "10px" }} defaultChecked={false} />
        </li>
        <li>
          Display search history terms
          <Switch defaultChecked style={{ marginLeft: "10px" }} />
        </li>
      </ul>
    ),
  },
  {
    key: "2",
    label: "Notification preference",
    children: (
      <ul>
        <li>
          Silent mode
          <Switch style={{ marginLeft: "10px" }} defaultChecked={false} />
        </li>
        <li>
          Audio prompt
          <Switch defaultChecked style={{ marginLeft: "10px" }} />
        </li>
      </ul>
    ),
  },
  {
    key: "3",
    label: "Secure",
    children: (
      <ul>
        <li>
          firewall
          <Switch style={{ marginLeft: "10px" }} defaultChecked={false} />
        </li>
        <li>
          Operating system and application updates
          <Switch defaultChecked style={{ marginLeft: "10px" }} />
        </li>
      </ul>
    ),
  },
];

const PersonalSettings: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb
        style={{ marginBottom: "10px" }}
        items={[
          {
            href: "/",
            title: (
              <>
                <HomeOutlined />&nbsp;
                Home
              </>
            ),
          },
          {
            title: "PersonalSettings",
          },
        ]}
      />
      <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
    </div>
  );
};

export default PersonalSettings;
