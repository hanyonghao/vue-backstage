<template>
	<!-- 二维码 -->
	<div class="c-qrcode">
		<canvas ref="qrcode"></canvas>
		<p>
			<a :href="text" target="_blank">打开</a>
			<a @click="copy">复制</a>
		</p>
	</div>
</template>

<style lang="scss" scoped>
.c-qrcode {
	position: absolute;
	top: -165px;
	left: 50%;
	width: 140px;
	height: 165px;
	margin-left: -70px;
	padding: 5px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: top;
	background-image: url(./imgs/code.png);
	box-sizing: border-box;
	text-align: center;
	z-index: 10;
	canvas {
		z-index: 50;
	}
	p {
		position: relative;
		top: -4px;
		text-align: center;
		font-size: 13px;
		color: rgb(51, 51, 51);
		z-index: 10;
		a {
			margin: 0 5px;
			color: rgb(0, 90, 161);
			cursor: pointer;
			&:hover {
				opacity: 0.8;
			}
		}
	}
}
</style>

<script>
import QRCode from 'qrcode';
import { copyToClipboard } from '@/public/common/js/html-util/1.0/html-util';

export default {

	name: 'qrcode',

	props: ['text', 'options'],

	data() {
		return {
			width: 125, // 重置宽度 px
			height: 125 // 重置高度 px
		};
	},

	methods: {
		// 更新二维码
		update() {
			QRCode.toCanvas(this.$refs.qrcode, this.text, this.options, (err) => {
				if (err) {
					this.$message.error('二维码生成失败');
				}

				this.$refs.qrcode.style.cssText = `width: ${ this.width }px; height: ${ this.height }px;`; // 重置尺寸
			});
		},

		copy() {
			if (copyToClipboard(this.text)) {
				this.$message.success('复制成功');
			} else {
				this.$message.error('复制失败');
			}
		}
	},

	watch: {
		text() {
			this.update();
		}
	},

	mounted() {
		this.$nextTick(() => {
			this.update();
		});
	}

};
</script>