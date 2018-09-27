<template>
	<div class="c-btns">
		<template v-for="(btn, index) in btns">
			
			<template v-if="btn.type === 'preview'">
				<div class="btn">
					<button class="g-button" @click="showPreview(btn, index)">{{ btn.text || '预览' }}</button>
					<transition name="g-fade">
						<qrcode v-if="previewLink[index]" width="130" height="130" class="canvas" :text="previewLink[index]" />
					</transition>
				</div>
			</template>

			<template v-else-if="btn.type === 'active'">
				<div class="btn">
					<button type="button" class="g-button" @click="btn.click">{{ btn.text }}</button>
				</div>
			</template>

			<template v-else>
				<div class="btn">
					<button type="button" class="g-click" @click="btn.click">{{ btn.text }}</button>
				</div>
			</template>

		</template>

	</div>
</template>

<style lang="scss" scoped>
.c-btns {
	margin-top: 10px;
	padding: 20px 0;
	border-top: 1px solid rgb(238, 238, 238);
	.btn {
		position: relative;
		width: 134px;
		height: 38px;
		margin-right: 20px;
		vertical-align: top;
		display: inline-block;
		button {
			width: 100%;
			height: 100%;
			border-radius: 2px;
			border: 1px solid rgb(226, 226, 226);
			background: #fff;
			font-size: 13px;
			color: rgb(51, 51, 51);
		}
	}
}
</style>

<script>
import Qrcode from '@/components/qrcode/1.0/qrcode';

export default {

	data() {
		return {
			previewLink: []
		};
	},

	props: {
		value: {
			type: [Array, Object]
		}
	},

	computed: {
		btns() {
			if (Array.isArray(this.value)) {
				return this.value;
			} else {
				return [this.value];
			}
		}
	},

	methods: {
		// 显示二维码
		showPreview(btn, index) {

			let result = btn.click();

			// 如果返回的是Promise
			if (result && result.then) {
				result.then((url) => {

					if (!/^http(s):?/.test(url)) {
						url = 'https:' + url;
					}

					if (url) {
						let array = [];
						array[index] = url;
						this.previewLink = array;
						document.addEventListener('click', this.hidePreview);
					}
				});
			}
		},

		// 隐藏二维码
		hidePreview() {
			this.previewLink = [];
			document.removeEventListener('click', this.hidePreview);
		}

	},

	components: {
		Qrcode
	},

	destroyed() {
		document.removeEventListener('click', this.hidePreview);
	}
};
</script>