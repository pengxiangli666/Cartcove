import React, { FormEvent, ChangeEvent, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

function AddProduct() {
  type FormData = {
    name: string;
    price: number;
    image: File | null;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    image: null,
  });

  const handleInput = <Key extends keyof FormData>(
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id as Key]:
        type === "file" && event.target.files ? event.target.files[0] : value,
    }));
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price.toString());
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    axios
      .post("http://www.airdropsharing.xyz/api/products/", formDataToSend)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="productCreatePage">
        <h1>Add a new product!</h1>

        <div className="addProduct">
          <form onSubmit={(event) => handleSubmit(event)}>
            name:{" "}
            <input
              id="name"
              value={formData.name}
              type="text"
              onChange={(event) => handleInput(event)}
              name="name"
            />{" "}
            price:{" "}
            <input
              id="price"
              value={formData.price}
              type="number"
              onChange={(event) => handleInput(event)}
              name="price"
            />
            <input
              id="image"
              type="file"
              onChange={(event) => handleInput(event)}
              accept="image/*"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
