<template>
	<!-- 弹出窗 -->
	<div class="c-popup">
		<div class="main">

			<!-- 弹窗标题 -->
			<div class="title">
				<span>{{ title }}</span>
				<slot name="title"></slot>
			</div>

			<!-- 弹窗内容 -->
			<template v-if="!$slots.default">
				
				<div class="content">

					<slot v-if="$slots.content" name="content"></slot>

					<div v-else class="wrap" v-html="content"></div>

				</div>

				<!-- 弹窗按钮 -->
				<div class="btns">

					<template v-if="reverse">
						<button class="cancel" @click="_confirm">{{ confirmText }}<span v-if="modelTimeout > 0">（{{ modelTimeout }}）</span></button>
						<button class="g-button ml" v-if="canCancel" @click="_cancel">{{ cancelText }}</button>
					</template>

					<template v-else>
						<button class="g-button" @click="_confirm">{{ confirmText }}<span v-if="modelTimeout > 0">（{{ modelTimeout }}）</span></button>
						<button class="cancel ml" v-if="canCancel" @click="_cancel">{{ cancelText }}</button>
					</template>
					
				</div>

			</template>

			<template v-else>
				<div class="wrap">
					<slot></slot>
				</div>
			</template>
			
		</div>
	</div>
</template>

<style lang="scss" scoped>
.c-popup {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.2);
	z-index: 2000;
	.main {
		position: absolute;
		top: 50%;
		left: 50%;
		min-width: 345px;
		transform: translate(-50%, -50%);
		background: white;
		.title {
			height: 44px;
			line-height: 44px;
			background: #ffcf27;
			text-align: center;
			font-size: 14px;
			color: #333;
		}
		.content {
			min-height: 42px;
			max-height: 200px;
			overflow-x: hidden;
			overflow-y: auto;
			margin: 40px 20px 0 20px;
			padding-bottom: 18px;
			line-height: 24px;
			text-align: center;
			font-size: 16px;
			color: rgb(51, 51, 51);
			box-sizing: border-box;
		}
		.btns {
			margin-top: 20px;
			padding-bottom: 20px;
			text-align: center;
			button {
				width: 134px;
				height: 38px;
				cursor: pointer;
				&.disabled {
					background: #ccc !important;
				}
				&.cancel {
					border: 1px solid rgb(226, 226, 226);
					background: white;
				}
				&.ml {
					margin-left: 20px;
				}
			}
		}
	}
}
</style>

<script>

export default {

	name: 'popup',

	props: {
		title: { // 标题
			type: String,
			default: '提示'
		},
		content: { // 内容
			type: String,
			default: ''
		},
		confirmText: { // 确认按钮文本
			type: String,
			default: '确认'
		},
		cancelText: { // 取消按钮文本
			type: String,
			default: '取消'
		},
		canCancel: { // 是否可以取消
			type: Boolean,
			default: false
		},
		reverse: { // 是否交换两个按钮的位置
			type: Boolean,
			default: false
		},
		timeout: { // 计时自动关闭
			type: Number,
			default: 0
		}
	},

	data() {
		return {
			modelTimeout: 0
		};
	},

	methods: {
		_confirm() {
			this.$emit('confirm');
			this._stopInterval();
		},
		_cancel() {
			this.$emit('cancel');
			this._stopInterval();
		},

		_stopInterval() {
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
				this.modelTimeout = 0;
			}
		},

		_startInterval(timeout) {
			if (timeout > 0) {

				this._stopInterval();

				this.modelTimeout = this.timeout;
				this.interval = setInterval(() => {
					this.modelTimeout--;
					if (this.modelTimeout <= 0) {
						this._confirm();
					}
				}, 1000);
			}
		}
	},

	watch: {
		timeout(val) {
			this._startInterval(val);
		}
	},

	created() {
		this._startInterval(this.timeout);
	},

	destroyed() {
		this._stopInterval();
	}

};
</script>