<template>
	<div class="c-auto-textarea" :style="textareaStyle">
		<textarea v-model="modelValue" :placeholder="placeholder" ref="textarea" :maxlength="maxLength"></textarea>
		<span v-text="modelValue"></span>
		<span v-if="maxLength" class="limit">{{ modelValue.length }}/{{ maxLength }}</span>
	</div>
</template>

<style lang="scss" scoped>
.c-auto-textarea {
	position: relative;
	min-height: 20px;
	line-height: 20px;
	white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
	text-align: left;
	font-size: 14px;
	color: transparent;
	textarea {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		line-height: 20px;
		padding: 0;
		border: 0;
		background: transparent;
		resize: none;
		font-size: 14px;
		color: #333;
	}
	.limit {
		position: absolute;
		right: 0;
		bottom: 0;
		line-height: 20px;
		color: #ccc;
		z-index: 10;
	}
}
</style>

<script>
export default {

	name: 'auto-textarea',

	props: {
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		maxLength: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			modelValue: ''
		};
	},

	computed: {
		textareaStyle() {
			if (this.modelValue && this.maxLength) {
				return {
					'padding-bottom': '20px'
				};
			}
		}
	},

	watch: {
		value(val) {
			this.modelValue = val;
		},
		modelValue(val) {
			this.$emit('input', val);
		}
	},

	methods: {
		focus() {
			this.$refs.textarea.focus();
		}
	},

	created() {
		this.modelValue = this.value;
	}

};
</script>