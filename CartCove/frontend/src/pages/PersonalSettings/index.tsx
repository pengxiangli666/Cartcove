import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
const items = [
  {
    key: "1",
    label: "Privacy Settings",
    children: (
      <ul>
        <li>
          Records search behavior logs
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
        </li>
        <li>
          Display search history terms
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
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
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
        </li>
        <li>
          Audio prompt
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
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
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
        </li>
        <li>
          Operating system and application updates
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />
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
      <Breadcrumb style={{ marginBottom: "10px" }}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#">PersonalSettings</Breadcrumb.Item>
      </Breadcrumb>

      <Accordion defaultActiveKey="0">
        {items.map((res) => {
          return (
            <Accordion.Item eventKey={res.key}>
              <Accordion.Header>{res.label}</Accordion.Header>
              <Accordion.Body>{res.children}</Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default PersonalSettings;
