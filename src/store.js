import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const initialState = {
    users: [],
    newUser: {
    
    }
}

const GOT_USERS = 'GOT_USERS'
const CREATE_USER = 'CREATE_USER'
const SUBMIT_USER = 'SUBMIT_USER'
const DELETE_USER = 'DELETE_USER'

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_USERS: 
                return {...state, users: action.users}
        case CREATE_USER: 
                return {...state, newUser: action.newUser}
        case SUBMIT_USER:
                return {...state, users: [...state.users, action.user]}
        case DELETE_USER:
                return {...state, users: [...state.users, action.users]}
        default:
            return state
    }
}

export const gotUsers = (arrayOfUsers) => (
    {
        type: GOT_USERS,
        users: arrayOfUsers
    }
)

export const createUser = (newUser) => (
    {
        type: CREATE_USER,
        newUser,   
    }
)

export const deleteUserAction = (users) => (
    { 
        type: DELETE_USER,
        users
    }
)

export const submitUserAction = (user) => (
    {
        type: SUBMIT_USER,
        user
    }
)

export const fetchUsers = () => {
    return (dispatch) => {
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(gotUsers(users)))
    }
}

export const submitUser = (user) => {
    return (dispatch) => {
        axios.post('/api/users', user)
            .then(res => res.data)
            .then(userRes => dispatch(submitUserAction(userRes)))
    }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        return axios.delete(`/api/users/${id}`)
            .then(() => {
                dispatch(fetchUsers())
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store;