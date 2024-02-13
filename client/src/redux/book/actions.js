import { ADD_BOOK_FAIL, ADD_BOOK_REQUEST, ADD_BOOK_SUCCESS, GET_BOOKS_FAIL, GET_BOOKS_REQUEST, GET_BOOKS_SUCCESS, GET_BOOK_FAIL, GET_BOOK_SUCCESS, UPDATE_BOOK_FAIL, UPDATE_BOOK_REQUEST, UPDATE_BOOK_SUCCESS } from "./types";
import axios from "axios";

const url = "http://localhost:3000/api"

export const add_book = (book) => async (dispatch) => {
    try {
        dispatch({
            type : ADD_BOOK_REQUEST
        });

        const { data } = await axios.post(`${url}/book/add`, book);

        dispatch({
            type : ADD_BOOK_SUCCESS,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : ADD_BOOK_FAIL,
            payload : error.response.data
        })
    }
}

export const update_book = (book) => async (dispatch) => {
    try {
        dispatch({
            type : UPDATE_BOOK_REQUEST
        });

        const {data} = await axios.put(`${url}`, book);

        dispatch({
            type : UPDATE_BOOK_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : UPDATE_BOOK_FAIL,
            payload : error.response.data
        })
    }
}

export const get_book = (id) => async (dispatch) => {
    try {
        dispatch({
            type : GET_BOOKS_REQUEST
        });

        const {data} = await axios.get(`${url}/book/${id}`);

        dispatch({
            type : GET_BOOK_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GET_BOOK_FAIL,
            payload : error.response.data
        })
    }
}

export const get_books = () => async (dispatch) => {
    console.log("bboookkkss")
    try {
        dispatch({
            type : GET_BOOKS_REQUEST
        });

        const {data} = await axios.get(`${url}/books/`, { params : {
            country : "",
            state : "",
            title : "CSS",
            tags : ""
        }});

        dispatch({
            type : GET_BOOKS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GET_BOOKS_FAIL,
            payload : error.response.data
        })
    }
}