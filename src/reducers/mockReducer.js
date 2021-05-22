const INITIAL_STATE = 'begin';

//selector
export const mockSelector=state=>state.mockState;


export const SET_MOCK='mock/set';


export const setMock = (status) =>{
    return{
        type: SET_MOCK,
        payload:{
          status
        }
    }
}


export const mockReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SET_MOCK:
            return (action.payload.status)
        
    default:
        return state;
    }
}