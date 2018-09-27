<template>
	<!-- 分页 -->
	<div class="c-block-pagination">
		<button :class="{ 'g-click': true, 'disabled': isDisabled('prev') }" @click="prev">上一页</button>
		<span>{{ value }}/{{ totalPage }}</span>
		<button :class="{ 'g-click': true, 'disabled': isDisabled('next') }" @click="next">下一页</button>
	</div>
</template>

<style lang="scss" scoped>
.c-block-pagination {
	text-align: center;
	font-size: 14px;
	color: rgb(51, 51, 51);

	button {
		width: 80px;
		height: 33px;
		border-radius: 2px;
		border: 1px solid rgb(221, 221, 221);
		background: #fff;
		&.disabled {
			color: rgb(153, 153, 153);
			cursor: default !important;
		}
	}

	span {
		height: 33px;
		line-height: 33px;
		padding: 0 10px;
		display: inline-block;
		border-radius: 2px;
		text-align: center;
	}
}
</style>

<script>

export default {

	name: 'pagination',

	props: {
		totalPage: Number, // 总条数
		value: { // 当前页码
			type: Number,
			default: 1
		}
	},

	methods: {
		isDisabled(type) {
			if (type === 'prev' && this.value <= 1) {
				return true;
			} else if (type === 'next' && this.value >= this.totalPage) {
				return true;
			} else {
				return false;
			}
		},
		prev() {
			if (!this.isDisabled('prev')) {
				this.$emit('input', this.value - 1);
			}
		},
		next() {
			if (!this.isDisabled('next')) {
				this.$emit('input', this.value + 1);
			}
		}
	}

};
</script>