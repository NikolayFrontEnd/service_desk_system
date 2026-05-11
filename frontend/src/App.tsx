import { BrowserRouter,Routes, Route } from 'react-router-dom'
import MainPage from './view/pages/mainPage'
import SignInPage from './view/pages/signInPage'
function App() {

  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
 </>
  )
}

export default App
/* 
1) вывести имя работника
2) вывести список задач
3) вывести кнопку добавить неисправность компьютера и проверять роль
4) если ты ремонтник, то смотреть список задач и твои задачи
5) если ты тех поддержка, ты можешь смотреть список задач и назначать их ремонтникам
*/