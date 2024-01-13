import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import {Outlet, Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import IndexPage from "./pages/IndexPage";
import CreatePost from "./pages/CreatePost";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
   <UserContextProvider>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/createpost" element={<CreatePost/>}/>
      

    </Route>
   </Routes>
   </UserContextProvider>
  );
}

export default App;
