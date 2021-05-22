const INITIAL_STATE = {user:null,status:false,errorMessage:null};

//selector
export const userSelector=state=>state.userState;


export const SET_USER='user/set';
export const ADD_ERROR='error/add';
export const SIGNUP_REQUEST='signup/request';
export const SIGNIN_REQUEST='signin/request';
export const SIGNOUT_REQUEST='signout/request';
export const SIGNOUT_USER='signout/user';

export const addError = (error) =>{
    return{
        type: ADD_ERROR,
        payload:{
            error
        }
    }
}

export const signUpRequest = (email,password) =>{
    return{
        type: SIGNUP_REQUEST,
        payload:{
            email,password
        }
    }
}
export const signInRequest = (email,password) =>{
    return{
        type: SIGNIN_REQUEST,
        payload:{
            email,password
        }
    }
}

export const signOutRequest = () =>{
    return{
        type: SIGNOUT_REQUEST,
        
    }
}

export const signOutCurrentUser = () =>{
    return{
        type: SIGNOUT_USER,
        
    }
}
export const setUserToken = (user) =>{
    return{
        type: SET_USER,
        payload:{
            user
        }
    }
}

export const userReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SET_USER:
            return ({user:action.payload.user,errorMessage:null,status:true})
        case SIGNOUT_USER:
            return ({user:null,errorMessage:null,status:false})
        case ADD_ERROR:
             return ({...state,errorMessage:action.payload.error})
        
    default:
        return state;
    }
}