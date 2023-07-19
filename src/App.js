import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import TableData from "./components/TableData";
// import { useEffect, useState } from "react";

function App() {
  
  

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  
  // useEffect(() => {
  //   if(isLoggedIn === true){
  //     navigate("/table")
  //   }
  // }, [isLoggedIn,navigate])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<LoginForm />}
          />
          <Route  path="/table" element={<TableData />} />
        </Routes>
        
      </BrowserRouter>
      {/* <TableData/> */}
    </div>
  );
}

export default App;
