const INITIAL_STATE = {lon:29.004050981,lat:41.0214293};

//selector
export const initCoordSelector=state=>state.initcoordState;


export const SET_COORDS='recording/set';


export const setCoords = (coords) =>{
    return{
        type: SET_COORDS,
        payload:{
            coords
        }
    }
}



export const initcoordsreducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SET_COORDS:
            return action.payload.coords
    
        
    default:
        return state;
    }
}