<template>
	<!-- 表格滚动条和公共样式 -->
	<div class="c-table">
		<table>

			<thead>

				<tr v-if="thead">
					<th v-for="item in thead">
						{{ item }}
					</th>
				</tr>

			</thead>

			<tbody>

				<template v-if="!isLoading">

					<template v-if="!isEmpty">
						<!-- 表格内容插槽 -->
						<slot></slot>

					</template>

						<!-- 空内容 -->
					<template v-else>
						<tr v-if="thead.length">
							<td class="empty" :colspan="thead.length">暂无内容</td>
						</tr>
					</template>

				</template>

				<!-- 加载中 -->
				<template v-else>
					<tr v-if="thead.length">
						<td class="loading" v-loading="true" :colspan="thead.length" ref="loading"></td>
					</tr>
				</template>

			</tbody>

		</table>
	</div>
</template>

<style lang="scss" scoped>
.c-table {
	width: 100%;
	overflow-y: hidden;
	overflow-x: auto;
	background-color: #eee;
	border-left: 1px solid rgb(226, 226, 226);
	border-right: 1px solid rgb(226, 226, 226);
	border-bottom: 1px solid rgb(226, 226, 226);
  box-sizing: border-box;
	table {
		min-width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		background-color: #fff;
		tr:last-child {
			td,
			th {
				border-bottom: 0;
			}
		}
		td, th {
			min-width: 104px;
			padding: 11px 12px;
			border: 1px solid rgb(226, 226, 226);
			line-height: 26px;
			color: rgb(51, 51, 51);
			font-size: 13px;
			box-sizing: border-box;
			text-align: center;
			&:first-child {
				border-left: 0;
			}
			&:last-child {
				border-right: 0;
			}
		}
		th {
			background-color: rgb(239, 239, 239);
			font-weight: normal;
			text-align: center;
		}
		a {
			color: rgb(0, 90, 161);
			cursor: pointer;
			transition: opacity 0.3s;
			&:hover {
				opacity: 0.8;
			}
		}
		tbody tr:hover {
			background-color: #F7F7F7;
		}
		.loading,
		.empty {
			height: 100px;
			text-align: center;
		}
	}
}
</style>

<script>
import { Loading } from 'element-ui';

export default {

	name: 'table-box',

	props: {
		thead: {
			type: Array,
			default: []
		},
		isLoading: {
			type: Boolean,
			default: false
		},
		isEmpty: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			loading: null // 记录加载动画
		};
	},

	watch: {
		// 由于不明原因，组件化后加载的指令会失效，只能手动触发加载动画
		isLoading(val) {
			if (val) {
				this.$nextTick(() => {
					let $loading = this.$refs.loading;
					// 避免获取不了节点变成全局加载动画
					if ($loading) {
						this.loading = Loading.service({ target: $loading });
					}
				});
			} else if (this.loading) {
				this.loading.close();
				this.loading = null;
			}
		}
	}

};
</script>