import {ITEMS_START, ITEMS_SUCCESS, ITEMS_ERROR} from '../constants';

export function updateSelected(selected) {
	return {
	  type: ITEMS_START,
	  payload: { selected },
	};
  }

export function itemsSuccess(data) {
	return {
		type: ITEMS_SUCCESS,
		data
	}
}

export function itemsError(e) {
	return {
		type: ITEMS_ERROR,
		error: e
	}
}