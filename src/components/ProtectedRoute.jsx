
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, database } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

function ProtectedRoute({ children, adminOnly = false }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Not logged in
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      // Logged in but no admin check required
      if (!adminOnly) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      try {
        const snapshot = await get(ref(database, `users/${user.uid}`));

        if (snapshot.exists()) {
          const userData = snapshot.val();

          if (userData.role === "admin") {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error(error);
        setAuthorized(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminOnly]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
