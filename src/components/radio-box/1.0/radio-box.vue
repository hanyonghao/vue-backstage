<template>
	<ul class="c-radio-box" v-if="modelData">
		<li v-for="item in modelData" @click="chooseItem(item)" :class="radioClass(item)">{{ item.name }}</li>
	</ul>
</template>

<style lang="scss" scoped>
.c-radio-box {
	li {
		min-width: 100px;
		height: 28px;
		line-height: 28px;
		margin-right: 10px;
		border-radius: 2px;
		border: 1px solid rgb(221, 221, 221);
		display: inline-block;
		transition: all 0.3s;
		text-align: center;
		font-size: 13px;
		color: rgb(51, 51, 51);
	}
}
</style>

<script>
export default {

	name: 'radio-box',

	props: {
		value: {},
		data: {
			type: Array
		}
	},

	computed: {
		modelValue() {
			return this.value;
		},

		modelData() {
			if (!Array.isArray(this.data)) {
				return [];
			}
			return this.data.map((item) => {
				if (typeof item !== 'object') {
					item = {
						name: item,
						value: item
					};
				}
				return item;
			});
		}
	},

	methods: {
		// 单选框样式
		radioClass(item) {
			let isActive = this.modelValue === item.value;
			return {
				'g-click': true,
				't-border-color': isActive,
				't-bg-color': isActive,
				't-font-color': isActive
			};
		},
		// 选择项
		chooseItem(item) {
			this.$emit('input', item.value);
			this.$emit('change', item.value);
		}
	}

};
</script>