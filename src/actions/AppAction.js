import {ITEMS_START, ITEMS_SUCCESS, ITEMS_ERROR} from '../constants';

export function itemsStart() {
	return {
		type: ITEMS_START
	}
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