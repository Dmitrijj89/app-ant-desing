import { ITEMS_SUCCESS } from '../constants';

export function updateData({id, name, condition, email, addresses}) {
	console.log('098if',email, "%^",addresses )
	return {
	  type: ITEMS_SUCCESS,
		payload: {
			id,
			name,
			condition,
			email,
			addresses
		}
	};
  }