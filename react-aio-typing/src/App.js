import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { signOut } from "firebase/auth";

import AppHeader from './components/AppHeader';
import SignInSide from './components/SignInSide.js';
import { auth } from "./firebase";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  const signOutGoogle = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('success signOut');
      setUserName("");
    }).catch((err) => alert(err.message));
  }

  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main>
        {(userName === "")
          ? <div>
              <SignInSide></SignInSide>
            </div>
          : <div>
              <Button onClick={signOutGoogle} name="sign-out">
                Sign Out
              </Button>
              <h1>Welcome</h1>
            </div>
        }
      </main>
    </div>
  );
}

export default App;
