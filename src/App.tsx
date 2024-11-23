import ToolBar from "./components/ToolBar/ToolBar";
import Add from "./Add/Add";
import {Route, Routes} from "react-router-dom";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";

const App = () => {
    return (
        <>
            <header>
                <ToolBar />
            </header>
            <main className="container">
                <Add />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/categories' element={<Categories />} />
                </Routes>
            </main>
        </>
    );
};

export default App
