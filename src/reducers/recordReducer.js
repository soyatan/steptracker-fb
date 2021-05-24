const INITIAL_STATE = null;

//selector
export const recordSelector=state=>state.recordState;



export const CREATE_RECORD_REQUEST='record/create/request';
export const FETCH_RECORDS='record/create';
export const DELETE_RECORD='record/delete';
export const DELETE_RECORD_REQUEST='record/delete/request';
export const SET_RECORDS='record/set';
export const ADD_RECORD='record/add';


export const createRecordRequest = (locations,name) =>{
    
    return{
        type: CREATE_RECORD_REQUEST,
        payload:{
            locations,name,
        }
    }
}


export const fetchRecords = () =>{
    
    return{
        type: FETCH_RECORDS,
      
    }
}
export const deleteRecordRequest = (id) =>{
    
    return{
        type: DELETE_RECORD_REQUEST,
        payload:{
            id
        }
      
    }
}
export const deleteRecord = (id) =>{
    
    return{
        type: DELETE_RECORD,
        payload:{
            id
        }
      
    }
}

export const setRecords = (records) =>{
    
    return{
        type: SET_RECORDS,
        payload:{
            records
        }
      
    }
}

export const addRecord = (record) =>{
    
    return{
        type: ADD_RECORD,
        payload:{
            record
        }
      
    }
}

export const recordReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SET_RECORDS:
            return action.payload.records
        case DELETE_RECORD:
            const newState=state.filter(item=>item.id!==action.payload.id)
            return newState;
        
    default:
        return state;
    }
}
