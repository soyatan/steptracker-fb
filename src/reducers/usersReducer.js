const INITIAL_STATE = [];

//selector
export const usersSelector=state=>state.usersState;

export const SET_USERS='users/set';
export const GET_USERS='users/get';
export const FETCH_USERS='users/fetch';
export const ADD_USERS='users/add';



export const setUsers = (users) =>{
    return{
        type: SET_USERS,
        payload:{
            users
        }
    }
}

export const getUsers = () =>{
    return{
        type: GET_USERS,
      
    }
}

export const addUsers = (email,uid) =>{
    return{
        type: ADD_USERS,
        payload:{
            email,uid
        }
      
    }
}



export const fetchUsersRequest = () =>{
    return{
        type: FETCH_USERS,
    }
}

export const usersReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SET_USERS:
            const newState=action.payload.users
            return newState    
        case ADD_USERS:
            return [...state,{id:action.payload.uid,email:action.payload.email}]     
      
            
            
    default:
        return state;
    }
}