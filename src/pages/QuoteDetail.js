import { useEffect } from "react";
import { Route, Routes, useParams, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/useHttp";

const QuoteDetail = () => {
    const params = useParams();
    console.log(params.quoteId);
    const { quoteId } = params;

    const { sendRequest, status, data } = useHttp(getSingleQuote,true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (!data.text && !status.isLoading) {
        return <h1>No quotes found</h1>;
    }

    return (
        <>
            <h1>Quote detail page</h1>
            {status.isLoading && (
                <div className="centered">
                    <LoadingSpinner />
                </div>
            )}
            {!status.isLoading && (
                <>
                    <HighlightedQuote text={data.text} author={data.author} />

                    <Routes>
                        <Route
                            path=""
                            element={
                                <div className="centered">
                                    <Link to={"comments"} className="btn--flat">
                                        Load comments
                                    </Link>
                                </div>
                            }
                        />
                        <Route path="comments" element={<Comments />} />
                    </Routes>
                </>
            )}
        </>
    );
};
export default QuoteDetail;
