import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Header, About, Home, NotFound, Footer} from "./components"

/**
 * @description - Root Component
 * @returns {JSX.Element}
 * @constructor
 */
const Root = () =>
    <Router>
        {/* Wrapper */}
        <div className="flex flex-col bg-slate-100 min-h-screen dark:bg-secondary">
            {/* Header */}
            <Header/>
            {/* Content */}
            <main className="container mx-auto px-3 pb-12 flex-grow pt-[20px]">
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/about" exact element={<About/>}/>
                    <Route path="/*" exact element={<NotFound/>}/>
                </Routes>
            </main>
            {/* Footer */}
            <Footer/>
        </div>
    </Router>

export default Root
