import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import { Route, Routes, Navigate } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";
function App() {
    return (
        <>
            <MainHeader />
            <main>
                <Routes>
                    <Route path="/welcome/*" element={<Welcome />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/" element={<Navigate to="/welcome" replace/> } />
                </Routes>
            </main>
        </>
    );
}

export default App;
