const INITIAL_STATE = {currentLocation:null,recording:false,locations:[],navigate:false}

//selector
export const locationSelector=state=>state.locationState;


export const SET_RECORDING='recording/set';
export const ADD_LOCATION='location/add';
export const SET_NAVIGATING='navigating/set';
export const ERASE_LOCATIONS='locations/delete';

export const SET_CURRENT_LOCATION='location/set';


export const setRecording = (status) =>{
    return{
        type: SET_RECORDING,
        payload:{
          status
        }
    }
}

export const setNavigating = (status) =>{
    return{
        type: SET_NAVIGATING,
        payload:{
          status
        }
    }
}

export const setCurrentLocation = (currentlocation) =>{
    return{
        type: SET_CURRENT_LOCATION,
        payload:{
            currentlocation
        }
    }
}

export const addLocation = (location) =>{
    
    return{
        type: ADD_LOCATION,
        payload:{
            location
        }
    }
}

export const eraseLocations = () =>{
    
    return{
        type: ERASE_LOCATIONS,
        
    }
}

export const locationReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SET_CURRENT_LOCATION:
            return {...state,currentLocation:action.payload.currentlocation}
        case ADD_LOCATION:
            return {...state,locations:[...state.locations,action.payload.location]}
        case ERASE_LOCATIONS:
            return {...state,locations:[]}
        case SET_RECORDING:
            return {...state,recording:action.payload.status}
        case SET_NAVIGATING:
            return {...state,navigate:action.payload.status}
 
        
    default:
        return state;
    }
}