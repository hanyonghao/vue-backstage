export default function(date, formation) {
	let values = {
		Y: date.getFullYear(),
		M: date.getMonth() + 1,
		D: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds()
	};

	return formation.replace(/Y+|M+|D+|h+|m+|s+/g, function(match) {
		let result = values[match[0]];
		if (match.length > 1 && result.toString().length !== match.length) {
			result = ((new Array(match.length)).join('0') + result).slice(-match.length);
		}
		return result;
	});
}