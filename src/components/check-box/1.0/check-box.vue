<template>
	<ul class="c-check-box" v-if="modelData">
		<li v-for="item in modelData" @click="chooseItem(item)" :class="checkClass(item)">{{ item.name }}</li>
	</ul>
</template>

<style lang="scss" scoped>
.c-check-box {
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

	name: 'check-box',

	props: {
		value: {
			type: Array,
			default: []
		},
		data: {
			type: Array
		}
	},

	computed: {
		modelValue() {
			return this.value || [];
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
		// 复选框选框样式
		checkClass(item) {
			let isActive = this.modelValue.indexOf(item.value) !== -1;
			return {
				'g-click': true,
				't-border-color': isActive,
				't-bg-color': isActive,
				't-font-color': isActive
			};
		},
		// 选择项
		chooseItem(item) {
			let array = this.modelValue;
			if (array.indexOf(item.value) === -1) {
				array.push(item.value);
			} else {
				array.splice(array.indexOf(item.value), 1);
			}
			this.$emit('input', array);
			this.$emit('change', array);
		}
	}

};
</script>