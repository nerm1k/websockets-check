import { Provider } from "react-redux"
import { store } from "./store/store"
import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout/Layout"
import MainPage from "./pages/MainPage/MainPage"
import ChatPage from "./pages/ChatPage/ChatPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import SignUpPage from "./pages/SignUpPage/SignUpPage"
import LogoutPage from "./pages/LogoutPage/LogoutPage"

function App() {


  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
