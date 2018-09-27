<template>
	<!-- 表格滚动条和公共样式 -->
	<div class="c-table">
		<table>

			<thead>

				<tr>
					<th v-for="(type, index) in types" :key="index">{{ type.name }}</th>
				</tr>

			</thead>

			<tbody>

				<template v-if="data">

					<template v-if="data.length > 0">
						<!-- 表格内容插槽 -->
						<tr v-for="(item, index) in data" :key="index">
							<slot
								v-for="type in types"
								:label="type.name"
								:column="type.key"
								:value="item[type.key]"
								:row="index"
								:item="item"
								:type="type">
							</slot>
						</tr>

					</template>

					<!-- 空内容 -->
					<template v-else>
						<tr v-if="types.length">
							<td class="empty" :colspan="types.length">暂无内容</td>
						</tr>
					</template>

				</template>

				<!-- 加载中 -->
				<template v-else>
					<tr v-if="types.length">
						<td class="loading" :colspan="types.length">加载中...</td>
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
			font-size: 14px;
		}
	}
	td.picture {
		line-height: 0;
	}
}
</style>

<script>
export default {

	name: 'table-box',

	props: {
		types: {
			type: Array,
			default() {
				return [];
			}
		},
		data: {
			type: Array
		}
	}

};
</script>