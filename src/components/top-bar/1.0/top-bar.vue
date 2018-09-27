<template>
	<div class="c-top-bar">
		<div class="left">
			<img :src="logo" :alt="title" />
			<span>{{ title }}</span>
		</div>
		<div class="right">
			<div class="item">
				<i class="g-icon icon-user"></i>
				<span>{{ userName }}</span>
			</div>

			<div class="item g-click" @click="logout">
				<i class="g-icon icon-exit"></i>
				<span>退出</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.c-top-bar {
	background: #333;
	&.white {
		background: #fff;
		box-shadow: 0 2px 6px #ddd;
		.left {
			span {
				color: #333;
			}
			img {
				height: 40px;
			}
		}
		.right {
			.item i,
			.item span {
				color: #333;
			}
		}
	}
	.left {
		float: left;
		padding-left: 15px;
		img {
			height: 30px;
			margin-right: 5px;
			vertical-align: middle;
		}
		span {
			vertical-align: middle;
			font-size: 22px;
			color: #fff;
		}
	}
	.right {
		float: right;
		padding-right: 15px;
		.item {
			display: inline-block;
			margin-left: 15px;
			i, span {
				vertical-align: middle;
				color: #fff;
				font-size: 14px;	
			}
			i {
				margin-right: 2px;
			}
		}
	}
}
</style>

<script>
export default {

	name: 'top-bar',

	props: {
		userName: {
			type: String,
			default: ''
		},

		logo: {
			type: String,
			default: ''
		},

		title: {
			String: String,
			default: ''
		}
	},

	methods: {
		// 退出登录
		logout() {
			// 弹窗
			this.$store.commit('showPopup', {
				content: '确认要退出登录吗？',
				canCancel: true,
				confirm: (popupClose) => {
					this.$emit('beforeExit');
					popupClose();
				}
			});
		}
	}

};
</script>