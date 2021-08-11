
export function handleError (e) {
  let message = e.message || 'server is busy';
  if(e.response !== undefined && e.response) {
    const {data = {message: ''}} = e.response;
    if(data.message) message = data.message;
  }
  return message;
}

export const getQueryUrl = query => {
	if(/[&?]/.test(String(query).toLowerCase())){
		let result = {}
		query.split('?')[1].split('&').forEach((el, i) => result[el.split('=')[0]] = el.split('=')[1]);
		return result;
	}
	return false;
}

export const convertDataToQuery = (data) => {
	try {
		if(Array.isArray(data)) return '';
		const obj = Object.keys(data);
		if(obj.length === 0) return '';
		let query = ``;
		for(let i=0; i<obj.length; i++) {
			if(query.length === 0) {
				query += `?${obj[i]}=${data[obj[i]]}`;
				continue;
			}
			query += `&${obj[i]}=${data[obj[i]]}`;
		}
	
		return query;
	}catch(e) {return ''}
}