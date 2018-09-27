<template>
	<div class="c-nav">
		<ul>
			<li v-for="item in list" :key="item.name" :class="{ 'active': isActive(item.include, item.isPath) }">

				<!-- 能点击 -->
				<template v-if="item.link">
					<router-link class="text link" tag="span" :to="item.link">
						<i class="icon g-icon" :class="item.iconClass"></i>
						<span>{{ item.name }}</span>
					</router-link>
				</template>
				
				<!-- 不能点击 -->
				<template v-else>
					<span class="text" :class="canFold ? 'link' : ''" @click="toggleNav(item)">
						<i class="icon g-icon" :class="{ [item.iconClass]: true, active: hasActiveChildren(item.children) }"></i>
						<span>{{ item.name }}</span>
						<i v-if="canFold" class="g-icon arrow icon-right" :class="{ fold: item.fold }"></i>
					</span>
				</template>

				<!-- 子菜单 -->
				<ul class="sub-nav" v-if="item.children" :style="navStyle(item)">
					<li v-for="child in item.children" :key="child.name" :class="{ 'active': isActive(child.include, item.isPath) }" ref="subNav">
						<router-link class="text link" tag="span" :to="child.link">
							<span>{{ child.name }}</span>
						</router-link>
					</li>
				</ul>

			</li>
		</ul>
	</div>
</template>

<style lang="scss">
.c-nav {
	position: relative;
	min-height: 100%;
	box-sizing: border-box;
	background: #424242;
	padding-bottom: 30px;
	li {
		position: relative;
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			content: ' ';
			width: 5px;
			height: 100%;
			opacity: 0;
			transition: opacity 300ms;
			background: #ffcf27;
			z-index: 10;
		}
		&.active {
			& > .text {
				background: rgb(75, 75, 75) !important;
				i, span {
					opacity: 1 !important;
				}
			}
			&::before {
				opacity: 1;
			}
		}
		.text {
			position: relative;
			height: 56px;
			display: block;
			line-height: 56px;
			padding-left: 30px;
			transition: background 300ms;
			font-size: 14px;
			cursor: default;
			color: #fff;
			&.link:hover {
				background: rgb(62, 62, 62);
			}	
			&.link:hover {
				cursor: pointer;
			}
			i {
				opacity: 0.5;
				transition: all 300ms;
				&.active {
					opacity: 1;
				}
			}
		}
	}

	.sub-nav {
		overflow: hidden;
		transition: height 0.3s;
		.text {
			height: 44px;
			line-height: 44px;
			padding-left: 57px;
			font-size: 12px;
			i {
				opacity: 0.5;
			}
			span {
				opacity: 0.6;
				transition: opacity 300ms;
			}
		}
	}

	i.icon {
		margin-right: 8px;
		font-size: 14px;
	}

	i.arrow {
		position: absolute;
		top: 0;
		right: 15px;
		z-index: 10;
	}

	i.icon-right {
		transform: rotate(-90deg);
	}

	i.icon-right.fold {
		transform: rotate(90deg);
	}
}
</style>

<script>
export default {

	name: 'side-nav',

	props: {
		canFold: {
			type: Boolean,
			default: false
		},
		list: {
			type: Array,
			default() {
				return [];
			}
		}
	},

	data() {
		return {
			ready: false
		}
	},

	computed: {
		// 路由的定义路径
		routeMatch() {
			let path;

			this.$route.matched.forEach((item) => {
				path = (path || '')  + item.path;
			});

			return path;
		},
		routePath() {
			return this.$route.path;
		}
	},

	watch: {
		$route() {
			this.checkFold();
		}
	},

	methods: {
		// 是否激活状态
		isActive(include, isPath) {
			if (this.ready) {
				return this.isCurrent(include, isPath)
			}
		},

		// 是否当前菜单
		isCurrent(include, isPath) {
			if (Array.isArray(include)) {
				if (isPath) {
					return include.indexOf(this.routePath) !== -1;
				} else {
					return include.indexOf(this.routeMatch) !== -1;
				}
			} else {
				return false;
			}
		},

		// 是否包含已激活的子菜单
		hasActiveChildren(children) {
			let flag = false;
			if (Array.isArray(children)) {
				children.forEach((child) => {
					if (this.isActive(child.include)) {
						flag = true;
					}
				});
			}
			return flag;
		},

		navStyle(item) {
			if (!this.canFold) {
				return {};
			} else if (item.fold) {
				return {
					height: this.$refs.subNav[0].clientHeight * item.children.length + 'px'
				};
			} else {
				return {
					height: 0
				};
			}
		},

		toggleNav(item) {
			if (!this.canFold) {
				return;
			}

			item.fold = !item.fold;
		},

		checkFold() {
			if (this.ready) {
				return;
			}

			if (this.list.some((item) => {
				if (Array.isArray(item.children) && item.children.some((child) => {
					if (child.isPath) {
						return child.include.indexOf(this.routePath) !== -1;
					} else {
						return child.include.indexOf(this.routeMatch) !== -1;
					}
				})) {
					item.fold = true;
					return true;
				} else {
					return this.isCurrent(item.include, item.isPath);
				}
			})) {
				this.ready = true;
			}
		}
	},

	mounted() {
		this.checkFold();
	}

};
</script>