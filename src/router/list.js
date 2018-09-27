export default [{
	meta: { title: '首页' },
	path: '/',
	component: (resolve) => require(['@/pages/home/home'], resolve)
}, {
	meta: { title: '列表页' },
	path: '/list',
	component: (resolve) => require(['@/pages/list/list'], resolve)
// }, {
// 	meta: { title: '表单创建页' },
// 	path: '/form/create',
// 	component: (resolve) => require(['@/pages/form/form'], resolve)
// }, {
// 	meta: { title: '表单编辑页' },
// 	path: '/form/:id/edit',
// 	component: (resolve) => require(['@/pages/form/form'], resolve)
}, {
	path: '*',
	redirect: '/'
}];