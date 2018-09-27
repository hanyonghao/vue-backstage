export default function(formData, rules) {
	let msg = '';
	if (!Array.isArray(rules)) {
		return msg;
	}
	rules.forEach((rule) => {
		if (!msg) {
			let value = formData[rule.key];
			if (typeof value === 'string') {
				value = value.replace(/\s/g, '');
			}

			if (rule.required !== false) {
				if ((!value && value !== 0) || (Object.prototype.toString.call(value) === '[object Array]' && value.length == 0)) {
					msg = rule.name + '不能为空';
				}
			}
			if (Array.isArray(rule.extra)) {
				rule.extra.forEach((func) => {
					if (!msg && typeof func === 'function') {
						msg = func(value);
					}
				});
			}
		}
	});
	return msg;
}