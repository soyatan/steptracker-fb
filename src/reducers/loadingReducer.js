const INITIAL_STATE = false;

//selector
export const loadingSelector=state=>state.loadingState;


export const SWITCH_LOADING='loading/set';


export const switchLoading = (status) =>{
    return{
        type: SWITCH_LOADING,
        payload:{
          status
        }
    }
}


export const loadingReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SWITCH_LOADING:
            return (action.payload.status)
        
    default:
        return state;
    }
}