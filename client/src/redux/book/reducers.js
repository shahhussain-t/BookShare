import { ADD_BOOK_FAIL, ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, GET_BOOKS_FAIL, GET_BOOKS_REQUEST, GET_BOOKS_SUCCESS, GET_BOOK_FAIL, GET_BOOK_REQUEST, GET_BOOK_SUCCESS, UPDATE_BOOK_FAIL, UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS } from "./types";


export const BookReducers = (state = {
    loading: false,
    success: false,
    error: null,
    book: {},
    books: []
}, action) => {

    switch (action.type) {
        case ADD_BOOK_REQUEST ||
            GET_BOOK_REQUEST ||
            UPDATE_BOOK_REQUEST :
            return {
                ...state,
                loading: true
            }
        case GET_BOOKS_REQUEST :
            return {
                ...state,
                loading : true
            }

        case ADD_BOOK_SUCCESS ||
            GET_BOOK_SUCCESS ||
            UPDATE_BOOK_SUCCESS :
            return {
                ...state,
                loading: false,
                success: true,
                book: action.payload
            }

        case GET_BOOKS_SUCCESS :
            return {
                ...state,
                loading : false,
                success : true,
                books : action.payload
            }

        case ADD_BOOK_FAIL ||
            GET_BOOK_FAIL ||
            UPDATE_BOOK_FAIL :
            return {
                ...state,
                loading: false,
                error: action
            }
        case GET_BOOKS_FAIL :
            return {
                ...state,
                loading : false,
                error : action.payload
            }

        default: return state
    }

}