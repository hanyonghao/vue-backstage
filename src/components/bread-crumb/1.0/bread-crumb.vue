<template>
	<div class="c-bread-crumb">

		<template v-for="item in data">

			<template v-if="item.path">
				<router-link class="name g-valign-mid" :to="item.path" :key="item.name">{{ item.name }}</router-link>
				<i class="g-icon icon-right g-valign-mid" :key="item.name"></i>
			</template>

			<template v-else>
				<span class="name g-valign-mid" :key="item.name">{{ item.name }}</span>
			</template>

		</template>
		
	</div>
</template>

<style lang="scss" scoped>
.c-bread-crumb {
	height: 60px;
	line-height: 60px;
	border-bottom: 2px solid rgb(238, 238, 238);
	color: rgb(51, 51, 51);
	font-size: 0;
	.name {
		font-size: 18px;
	}
	span {
		color: #333;
	}
	a {
		font-weight: bold;
		transition: color 0.3s;
		color: #333;
		&:hover {
			color: #ffcf27;
		}
	}
	i {
		margin: 0 10px;
		font-size: 14px;
		color: #ccc;
	}
}
</style>

<script>

export default {

	name: 'c-bread-crumb',

	props: {
		data: {
			type: Array,
			default() {
				return [];
			}
		}
	}

};
</script>