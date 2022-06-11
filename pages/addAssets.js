import Image from "next/image";
import Router from "next/router";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import React from "react";
import { AmazonContext } from "../context/AmazonContext";
import Home from ".";

const styles = {
  container: `h-full w-full flex bg-[#fff] py-20 justify-center`,
  card: `shadow-lg rounded-lg w-2/4 pt-8 `,
  form: `bg-white rounded-md shadow-2xl p-5`,
  inputdiv: `flex items-center border-2 mb-8 py-2 px-3 rounded-2xl`,
  input: `flex items-center border-2 mb-8 py-2 px-3 rounded-2xl pl-2 w-full outline-none border-none`,
  title: `pb-4 text-gray-800 font-bold text-2xl mb-1`,
  button: `block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2`,
};

export default function addAssets() {
  const { user, setUserData, userError } = useMoralis();
  const { Moralis, isAuthenticated, account } = useMoralis();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [category, setCategory] = useState();

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const handleSubmit = async () => {
    const User = Moralis.Object.extend("_User");

    const Asset = Moralis.Object.extend("assets");
    const myDetails = new Asset();

    if (name) {
      myDetails.set("name", name);
    }

    if (description) {
      myDetails.set("description", description);
    }

    if (price) {
      myDetails.set("price", price);
    }
    if (category) {
      myDetails.set("category", category);
    }
    if (quantity) {
      myDetails.set("quantity", quantity);
    }

    myDetails.set("username", user.attributes.username);
    myDetails.set("assetUserId", user.attributes.ethAddress);
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("image", file.ipfs());
    }

    await myDetails.save();
    Router.push("/start");
  };

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <div className={styles.card}>
          <div className={styles.form}>
            <h1 className={styles.title}>Add Asset</h1>
            <div>
              <input
                className={styles.input}
                placeholder="Name"
                fullWidth
                autoComplete="name"
                onChange={(event) => setName(event.currentTarget.value)}
              />

              <input
                className={styles.input}
                placeholder="Asset Description"
                fullWidth
                autoComplete="description"
                onChange={(event) => setDescription(event.currentTarget.value)}
              />

              <input
                className={styles.input}
                placeholder="Asset Price"
                fullWidth
                autoComplete="price"
                onChange={(event) => setPrice(event.currentTarget.value)}
              />
              <input
                className={styles.input}
                placeholder="Asset Quantity"
                fullWidth
                autoComplete="price"
                onChange={(event) => setQuantity(event.currentTarget.value)}
              />

              <select
                className={styles.input}
                fullWidth
                autoComplete="category"
                value={category}
                onChange={(event) => setCategory(event.currentTarget.value)}
              >
                <option>Select Asset Category</option>
                <option>Pulses</option>
                <option>Fruit</option>
                <option>Meat</option>
              </select>
              <div>
                <h5>Asset Image</h5>
                <input type="file" name="file" onChange={changeHandler} />
              </div>
            </div>
            <button
              className={styles.button}
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}
