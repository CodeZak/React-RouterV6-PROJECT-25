import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const CommentsList = ({Comments_data,Comment_status}) => {
    return (
        <>
            {Comment_status.isLoading && (
                <div className="centered">
                    <LoadingSpinner />
                </div>
            )}
            {!Comment_status.isLoading && (
                <ul className={classes.comments}>
                    {Comments_data.map((comment) => (
                        <CommentItem key={comment.id} text={comment.text} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default CommentsList;
