import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
    if (action.type === "SEND") {
        return {
            data: [],
            error: null,
            status: { isLoading: true, error: false },
        };
    }

    if (action.type === "SUCCESS") {
        return {
            data: action.responseData,
            error: null,
            status: { isLoading: false, error: false },
        };
    }

    if (action.type === "ERROR") {
        return {
            data: [],
            error: action.errorMessage,
            status: { isLoading: false, error: true },
        };
    }

    return state;
}

function useHttp(requestFunction,startWithPending = false) {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: { isLoading: startWithPending ? true : false, error: false },
        data: [],
        error: null,
    });

    const sendRequest = useCallback(
        async function (requestData) {
            dispatch({ type: "SEND" });
            try {
                const responseData = await requestFunction(requestData);
                dispatch({ type: "SUCCESS", responseData });
            } catch (error) {
                dispatch({
                    type: "ERROR",
                    errorMessage: error.message || "Something went wrong!",
                });
            }
        },
        [requestFunction]
    );

    return { sendRequest, ...httpState };
}

export default useHttp;
