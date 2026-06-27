import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { auth, database } from "../firebase/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import "../styles/Navbar.css";

function Navbar() {

  const { cartItems } = useCart();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async(currentUser)=>{

      setUser(currentUser);

      if(currentUser){

        const snapshot=await get(ref(database,`users/${currentUser.uid}`));

        if(snapshot.exists()){

          setUserData(snapshot.val());

        }

      }else{

        setUserData(null);

      }

    });

    return()=>unsubscribe();

  },[]);

  const handleLogout=async()=>{

    await signOut(auth);

    navigate("/login");

  };

  return(

<nav className="navbar">

<div className="logo">
ShopEase
</div>

<div className="nav-links">

<Link to="/">Home</Link>

{userData?.role!=="admin" && (

<>

<Link to="/products">

Products

</Link>

<Link to="/cart">

Cart

<span className="cart-badge">

{cartItems.length}

</span>

</Link>

</>

)}

{userData?.role==="admin" && (

<Link to="/admin">

Dashboard

</Link>

)}

{user ? (

<>

<span className="user-name">

👋 {userData?.name}

</span>

<button

className="logout-btn"

onClick={handleLogout}

>

Logout

</button>

</>

):(

<>

<Link to="/login">

Login

</Link>

<Link to="/register">

Register

</Link>

</>

)}

</div>

</nav>

  );

}

export default Navbar;