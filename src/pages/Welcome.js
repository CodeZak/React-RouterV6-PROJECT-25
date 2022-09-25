import { Route, Routes } from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <h2>Welcome page!</h2>
            <Routes>
                <Route
                    path="new-user"
                    element={<p>Welcome new user</p>}
                />
            </Routes>
        </>
    );
};
export default Welcome;
