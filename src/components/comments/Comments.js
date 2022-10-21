import { useState, useEffect, useCallback } from "react";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { getAllComments } from "../../lib/api";

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();
    const { quoteId } = params;

    const { sendRequest, status, data } = useHttp(getAllComments);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };
    
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest,quoteId]);

    const onAddedCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    },[sendRequest,quoteId]);

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm onAddedComment={onAddedCommentHandler} />
            )}
            <CommentsList Comments_data={data} Comment_status={status} />
        </section>
    );
};

export default Comments;
