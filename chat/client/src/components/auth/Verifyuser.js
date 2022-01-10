import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";

const VerifyUser = async () => {
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //!CONTROL
  // console.log(user);

  try {
    const res = await fetch("http://localhost:5000/verifyuser", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    //! CONTROL
    console.log(res);
    const data = await res.json();
    //! CONTROL
    console.log(data);
    setUser(data);
  } catch (error) {
    console.log(error);
  }
};

export default VerifyUser;

///////////////////////////////////////////////////
// const [user, setUser] = useState(null);
// //!CONTROL
// console.log(user);
// useEffect(() => {
//   const verifyUser = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/verifyuser", {
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       //! CONTROL
//       console.log(res);
//       const data = await res.json();
//       setUser(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   verifyUser();
// }, []);
