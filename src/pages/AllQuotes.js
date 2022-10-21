import { useEffect, useReducer } from "react";
import QuoteList from "../components/quotes/QuoteList";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/useHttp";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = ({ quotesFunnel }) => {
    const { sendRequest, status, data, error } = useHttp(getAllQuotes,true);
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (error) {
        return (
            <div className="centered-cln">
                <p className="error">Something wrong happened</p>
                <p className="error">{error.message}</p>
            </div>
        );
    }
    
    if (!status.isLoading && (data.length === 0 || !data)) {
        return <NoQuotesFound />;
    }

    return (
        <>
            {status.isLoading && (
                <div className="centered">
                    <LoadingSpinner></LoadingSpinner>
                </div>
            )}
            {!status.isLoading && <QuoteList quotes={data} />}
        </>
    );
};

export default AllQuotes;
