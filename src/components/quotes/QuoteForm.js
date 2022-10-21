import { useContext, useRef } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
import useHttp from "../../hooks/useHttp";
import { addQuote } from "../../lib/api";
import { useNavigate } from "react-router-dom";
const QuoteForm = (props) => {
    const authorInputRef = useRef();
    const textInputRef = useRef();
    const navigate = useNavigate();

    const { sendRequest, status, data, error } = useHttp(addQuote);

    const inputChangeHandler = (e) => {};

    async function submitFormHandler(event) {
        event.preventDefault();

        const enteredAuthor = authorInputRef.current.value;
        const enteredText = textInputRef.current.value;

        // optional: Could validate here

        await sendRequest({ author: enteredAuthor, text: enteredText });
        navigate("/quotes");
    }

    if (status.error) {
        return (
            <div className="centered-cln">
                <p className="error">Something wrong happened</p>
                <p className="error">{status.error.message}</p>
            </div>
        );
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitFormHandler}>
                {status.isLoading && (
                    <div className={classes.loading}>
                        <LoadingSpinner />
                    </div>
                )}

                <div className={classes.control}>
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        ref={authorInputRef}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="text">Text</label>
                    <textarea
                        id="text"
                        rows="5"
                        ref={textInputRef}
                        onChange={inputChangeHandler}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button className="btn">Add Quote</button>
                </div>
            </form>
        </Card>
    );
};

export default QuoteForm;
