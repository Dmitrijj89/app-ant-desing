import {ITEMS_START, ITEMS_SUCCESS, ITEMS_ERROR} from '../constants';
import {data} from '../api';

const initialState = {
    data: data,
    loading: false,
    checkItem: [],
    error: null
  };

  export default (state = initialState, action) => {
    switch (action.type) {
        case ITEMS_START:
        return { ...state, selected: action.selected }
		case ITEMS_SUCCESS:
		   return {
		   	 ...state, loading: false, data: action.data
		   }
		case ITEMS_ERROR:
		   return {
		   	 ...state, loading: false, error: action.error
		   }
    //   case LOGIN:
    //     return {
    //       ...state,
    //       user: {
    //         mail: action.payload.mail,
    //       },
    //       errorMsg: '',
    //     }
    //   case LOGOUT:
    //     return {
    //       ...state,
    //       user: null,
    //       errorMsg: '',
    //     }
    //   case LOG_ERROR:
    //     return {
    //       ...state,
    //       errorMsg: action.payload.errorMsg,
    //     }
      default:
        return state
    }
  }