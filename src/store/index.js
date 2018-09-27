import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 弹窗配置
		popupOption: null
	},

	mutations: {

		// 显示弹窗
		showPopup(state, options) {
			// 如果传的参数不是配置项，默认为提示框内容
			if (typeof options !== 'object') {
				options = { content: options };
			}

			function close() {
				state.popupOption = null;
			}

			state.popupOption = {
				...options,
				confirm() {
					(options.confirm || close).call(this, close);
				}, // 赋值默认方法
				cancel() {
					(options.cancel || close).call(this, close);
				} // 赋值默认方法
			};
		},

		// 关闭弹窗
		closePopup(state) {
			state.popupOption = null;
		}
	},

	// 根仓库只保存所有应用的公共状态，
	// 每个应用自身的状态应放到自身的仓库中
	modules: {
	}
});