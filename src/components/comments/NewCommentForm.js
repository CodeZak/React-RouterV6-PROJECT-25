import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import classes from "./NewCommentForm.module.css";
import { addComment } from "../../lib/api";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = ({ onAddedComment }) => {
    const { sendRequest, status, error } = useHttp(addComment);

    const commentTextRef = useRef();
    const params = useParams();

    const submitFormHandler = async (event) => {
        event.preventDefault();
        const data = {
            commentData: commentTextRef.current.value,
            quoteId: params.quoteId,
        };
        await sendRequest(data);
    };

    useEffect(() => {
        if (!status.isLoading && !error) {
            onAddedComment();
        }
    }, [onAddedComment, status.isLoading, error]);

    if (status.isLoading && !error) {
        return <LoadingSpinner />;
    }

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control}>
                <label htmlFor="comment">Your Comment</label>
                <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button className="btn">Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;
