import Image from "next/image";
import Router from "next/router";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import React from "react";
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

export default function EditProfile() {
  const { user, setUserData, userError } = useMoralis();
  const { Moralis, isAuthenticated, account } = useMoralis();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [check, setCheck] = useState();
  const [selectRole, setSelectRole] = useState();

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const handleSubmit = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    const check = "2";

    if (name) {
      myDetails.set("name", name);
    }

    if (username) {
      myDetails.set("username", username);
    }

    if (email) {
      myDetails.set("email", email);
    }
    if (selectRole) {
      myDetails.set("selectRole", selectRole);
    }
    if (check) {
      myDetails.set("check", "2");
    }

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("profileImg", file.ipfs());
    }

    await myDetails.save().then(() => {
      alert("You've successfully Completed your profile");
    });
    Router.push("/start");
  };

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <div className={styles.card}>
          <div className={styles.form}>
            <h1 className={styles.title}>Add Profile</h1>
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
                placeholder="Username"
                fullWidth
                autoComplete="username"
                onChange={(event) => setUsername(event.currentTarget.value)}
              />

              <input
                className={styles.input}
                placeholder="Email Address"
                fullWidth
                autoComplete="email"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />

              <select
                className={styles.input}
                fullWidth
                autoComplete="email"
                value={selectRole}
                onChange={(event) => setSelectRole(event.currentTarget.value)}
              >
                <option>Select User Role</option>
                <option>Producer</option>
                <option>Distributer</option>
                <option>Retailer</option>
              </select>
              <div>
                <h4>Select Profile Image</h4>
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
