<template>
	<!-- 根布局 -->
	<div class="c-layout">
		<top-bar class="top" :user-name="'韩永豪'" :logo="`${ baseURL }imgs/logo.png`" :title="'通用后台管理模板'"></top-bar>

		<div class="main">
			<side-nav class="left" :list="sideNav" :canFold="true"></side-nav>
			<div class="right">
				<transition name="g-fade">
					<router-view class="page" :key="$route.fullPath"></router-view>
				</transition>
			</div>
		</div>

		<!-- 弹出窗 -->
		<transition name="g-fade">
			<popup
				v-if="popup"
				:title="popup.title"
				:content="popup.content"
				:confirmText="popup.confirmText"
				:cancelText="popup.cancelText"
				:canCancel="popup.canCancel"
				:reverse="popup.reverse"
				:timeout="popup.timeout"
				@confirm="popup.confirm"
				@cancel="popup.cancel">
			</popup>
		</transition>
	</div>
</template>

<style lang="scss" src="@/common/scss/global/1.0/global.scss"></style>
<style lang="scss" src="@/common/scss/reset/1.0/reset.scss"></style>
<style lang="scss" src="@/common/scss/preset/1.0/all.scss"></style>

<style lang="scss">
/* 重置样式 */
html,
body {
	height: 100%;
	min-width: 1024px;
	overflow-y: hidden;
	overflow-x: auto;
}
</style>

<style lang="scss" scoped>
.c-layout {
	height: 100%;
	display: flex;
	flex-direction: column;
	.top {
		height: 60px;
		line-height: 60px;
	}
	.main {
		display: flex;
		flex: 1;
		.left {
			width: 220px;
			overflow-x: hidden;
			overflow-y: auto;
		}
		.right {
			position: relative;
			overflow-x: hidden;
			overflow-y: auto;
			flex: 1;
			.page {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				padding: 0 26px 38px 26px;
			}
		}
	}
}
</style>

<script>
import TopBar from '@/components/top-bar/1.0/top-bar';
import SideNav from '@/components/side-nav/1.0/side-nav';
import Popup from '@/components/popup/1.0/popup';

export default {

	data() {
		return {
			sideNav: [{
				name: '首页',
				iconClass: 'icon-add',
				link: '/',
				include: ['']
			}, {
				name: '课程管理',
				iconClass: 'icon-course',
				fold: false,
				children: [{
					name: '套餐管理',
					link: '/list',
					include: ['/list', '/form/create', '/form/:id/edit']
				}]
			}]
		}
	},

	computed: {
		popup() {
			return this.$store.state.popupOption;
		}
	},

	components: {
		TopBar,
		SideNav,
		Popup
	}
};
</script>