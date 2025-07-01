import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import DetailPage from "./pages/detailPage";
import WatchPage from "./pages/WatchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element = {<AuthRedirect/>}/>
        
        <Route element={<ProtectedRoute/>}>
          <Route path="/media/:mediaId" element = {<DetailPage/>}/>
          <Route path="/watch/:episodeId" element = {<WatchPage/>}/>
          <Route path="/home" element = {<HomePage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;