<template>
	<div class="p-list">
		<!-- 标题 -->
		<bread-crumb :data="[{ name: '套餐管理' }]"></bread-crumb>

		<!-- 操作 -->
		<div class="handle g-handle g-clearfix">

			<div class="left">
				<div class="group g-mr">
					<label class="label">套餐名称：</label>
					<input v-model="packageName" class="item" size="small" placeholder="请输入" />
				</div>
				<div class="group">
					<button class="g-button">查询</button>
				</div>
			</div>

			<div class="right">
				<router-link to="/form/create" tag="button" class="g-button"><i class="g-icon icon-add icon"></i>新建套餐</router-link>
			</div>
		</div>

		<!-- 表格 -->
		<table-box class="table" :types="types" :data="data">
			<td slot-scope="{ value, type, item }" :class="{
				'picture': type.picture,
				'time': type.time,
				'long-text': type.longText,
				'g-singleline-text': type.longText
			}" :title="value">
				<template v-if="type.picture">
					<img :src="value" width="60" height="60" />
				</template>

				<template v-else-if="type.link">
					<a :href="value" target="_blank">链接</a>
				</template>

				<template v-else-if="type.time">{{ value | formatDate('YYYY-MM-DD hh:mm') }}</template>

				<template v-else>{{ value }}</template>

			</td>
		</table-box>
		
		<pagination class="pagination" v-model="currentPage" :total-page="10"></pagination>
	</div>
</template>


<style lang="scss" scoped>
.p-list {
	.handle {
		margin-top: 24px;
		.icon {
			vertical-align: -1px;
		}
	}
	.table {
		margin-top: 24px;
		.long-text {
			max-width: 170px;
		}
		.time {
			min-width: 130px;
		}
	}
	.pagination {
		margin-top: 24px;
	}
}
</style>


<script>
import BreadCrumb from '@/components/bread-crumb/1.0/bread-crumb';
import TableBox from '@/components/table-box/2.0/table-box';
import Pagination from '@/components/pagination/1.0/pagination';
import formatDate from '@/common/js/format-date/1.0/format-date';

export default {
	data() {
		return {
			packageName: '',
			currentPage: 1,
			data: [{ // 测试数据
				packageId: 1,
				packageIcon: 'https://thirdwx.qlogo.cn/mmopen/vi_32/oY4g8iceq85tga3XIVjCSHLGe18aibgGL8hC2RSFiaw3aFGEG20U35g3zdtejaictI2e3IKWX9Gene7z5CMQ41ncQw/132',
				packageName: '套餐一',
				packageNum: 10,
				updateTime: Date.now()
			}],
			types: [{
				name: '套餐ID',
				key: 'packageId'
			}, {
				name: '套餐图标',
				key: 'packageIcon',
				picture: true
			}, {
				name: '套餐名称',
				key: 'packageName',
				longText: true
			}, {
				name: '套餐数量',
				key: 'packageNum'
			}, {
				name: '更新时间',
				key: 'updateTime',
				time: true
			}]
		};
	},

	filters: {
		formatDate(val, format) {
			if (val) {
				return formatDate(new Date(val), format);
			}
		}
	},

	components: {
		BreadCrumb,
		TableBox,
		Pagination
	}

};
</script>