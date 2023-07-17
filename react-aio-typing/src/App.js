import { useState } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import AppHeader from './components/AppHeader';
import SignInSide from './components/SignInSide.js';

function App() {
  let [ signined, setSignined ] = useState(false);

  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main>
        {signined
          ? <div>
              <Button onClick={() => setSignined(false)}  name="sign-out">
                Sign Out
              </Button>
            </div>
          : <div>
              <Button onClick={() => setSignined(true)}  name="sign-in">
                Sign in
              </Button>
              <SignInSide></SignInSide>
            </div>
        }
      </main>
    </div>
  );
}

export default App;
