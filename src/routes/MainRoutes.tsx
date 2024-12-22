import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Quiz from '../pages/quiz/Quiz'

function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Quiz />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes
