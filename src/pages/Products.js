import { Link } from "react-router-dom";

const Products = () => {
    return (
        <>
            <h2>Products page!</h2>
            <ul>
                <li>
                    <Link to="p1">product1</Link>
                </li>
                <li>
                    <Link to="p2">product2</Link>
                </li>
                <li>
                    <Link to="p3">product3</Link>
                </li>
            </ul>
        </>
    );
};
export default Products;
