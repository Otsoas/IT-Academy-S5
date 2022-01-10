import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
//! import axios from "axios";
import { UserContext } from "./UserContext";
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
//! CVAMBIO
import Verifyuser from "./components/auth/Verifyuser";

function App() {
  const [user, setUser] = useState(null);
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

  return (
    <Router>
      <div className="App">
        {/* control */}
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat/:room_id/:room_name" component={Chat} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/verifyuser" component={Verifyuser} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
