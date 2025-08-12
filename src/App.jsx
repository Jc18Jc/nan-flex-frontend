import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import HomePage from "./pages/user/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import WatchPage from "./pages/user/WatchPage";
import SignupPage from "./pages/user/SignupPage";
import ProfileCreatePage from "./pages/user/ProfileCreatePage";
import MyPage from "./pages/user/MyPage";
import ProfileEditPage from "./pages/user/ProfileEditPage";
import SearchPage from "./pages/user/SearchPage";
import DetailPage from "./pages/user/DetailPage";
import AdminRoute from "./components/admin/AdminRoute";
import AdminMainPage from "./pages/admin/AdminMainPage";

function App() {
  return (
    <Router basename="/home">
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
          <Route path="search" element = {<SearchPage/>}/>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin/main" element={<AdminMainPage />} />
        </Route>

        <Route path="*" element = {<AuthRedirect/>}/>
      </Routes>
    </Router>
  );
}

export default App;