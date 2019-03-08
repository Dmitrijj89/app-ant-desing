import { ITEMS_SUCCESS } from '../constants';
import { data } from '../api';

const initialState = {
    data: data
  };

  export default (state = initialState, action) => {
    switch (action.type) {
        case ITEMS_SUCCESS:
        const newData = [...state.data];
        const index = newData.findIndex(item =>{
          return action.payload.id === item.id
        });
        
        if (index > -1) {
          newData[index] = action.payload
          };
          return {...state, data: newData };
      default:
        return state
    }
  }