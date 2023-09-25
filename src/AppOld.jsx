import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Main from "./Main";
import Procurement from "./scenes/Procurement";
import Warehouse from "./scenes/Warehhouse";
import HomePage from "./scenes/home/Home";
import Production from "./scenes/Production";
import Export from "./scenes/Export";
// import ProgressTable from "./scenes/progressTable";

function App(props) {
  const [theme, colorMode] = useMode();

  const [userRole, setUserRole] = useState(null); // initialize with null value
  const [name, setName] = useState(null); // initialize with null value
  const handleUserRole = (role) => {
    setUserRole(role);
  }
  const handleName = (getname) => {
    setName(getname)
  }
  console.log("from Main");
  console.log(userRole);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {userRole === null && <HomePage onUserRole={handleUserRole} onName={handleName} />}
        {userRole === 'Supply' && <Main onUserRole={userRole} onName={name} />}
        {userRole === 'Procurement' && <Procurement onUserRole={userRole} onName={name} />}
        {userRole === 'Warehouse' && <Warehouse onUserRole={userRole} onName={name} />}
        {userRole === 'Production' && <Production onUserRole={userRole} onName={name} />}
        {userRole === 'Export' && <Export onUserRole={userRole} onName={name} />}

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
