import Vue from 'vue';
import router from '@/router/index';
import store from '@/store/index';
import Layout from '@/components/layout/1.0/layout';

Vue.config.productionTip = false;

Vue.mixin({
	data() {
		return {
			baseURL: process.env.BASE_URL
		};
	}
});

new Vue({
	router,
	store,
	render: h => h(Layout)
}).$mount('#app');
