import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const params = useParams()

    return (
        <>
            <h2>Product Detail page!</h2>
            <h3>{params.id}</h3>
        </>
    );
};
export default ProductDetail;
