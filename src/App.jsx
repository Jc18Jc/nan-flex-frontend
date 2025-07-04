import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import DetailPage from "./pages/detailPage";
import WatchPage from "./pages/WatchPage";
import SignupPage from "./pages/SignupPage";
import ProfileCreatePage from "./pages/ProfileCreatePage";
import MyPage from "./pages/MyPage";
import ProfileEditPage from "./pages/ProfileEditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage/>} />
        <Route path="create-profile" element = {<ProfileCreatePage/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="media/:mediaId" element = {<DetailPage/>}/>
          <Route path="watch/:episodeId" element = {<WatchPage/>}/>
          <Route path="home" element = {<HomePage/>}/>
          <Route path="mypage" element = {<MyPage/>}/>
          <Route path="edit-profile" element = {<ProfileEditPage/>}/>
        </Route>

        <Route path="*" element = {<AuthRedirect/>}/>
      </Routes>
    </Router>
  );
}

export default App;