import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./view/pages/mainPage";
import SignInPage from "./view/pages/signInPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
