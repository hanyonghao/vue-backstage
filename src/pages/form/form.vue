<template>
	<div class="p-form">
		<!-- 标题 -->
		<bread-crumb :data="[{ name: '套餐管理', path: '/package/list' }, { name: this.id ? '编辑菜单' : '新增套餐' }]"></bread-crumb>

		<!-- 表单 -->
		<ul class="g-form">
			<li class="group">
				<label class="label red">套餐名称：</label>
				<p class="row">
					<el-input class="normal" size="small" placeholder="请输入套餐名称" v-model="packageName" maxLength="60"></el-input>
					<span class="limit">{{ (packageName || '').length }}/60</span>
				</p>
			</li>
			<li class="group">
				<!-- 表格 -->
				<table-box class="table" :thead="thead">
					<tr v-for="(item, index) in classContentList" :key="index">
						<td class="num">
							{{ index + 1}}
						</td>
						<td class="content" @click="focus(index)">
							<auto-textarea v-model="item.classContent" placeholder="请输入课堂内容" maxLength="300" ref="textarea"></auto-textarea>
						</td>
						<td class="ctrl">
							<a @click="remove(index)">删除</a>
						</td>
					</tr>
					<tr>
						<td class="add" colspan="3" @click="add">
							<a>
								<i class="g-icon icon-add"></i>
								<span>添加</span>
							</a>
						</td>
					</tr>
				</table-box>
			</li>
			<li class="group">
				<button-box :value="btns"></button-box>
			</li>
		</ul>
		
	</div>
</template>


<style lang="scss" scoped>
.p-package-form {
	.table {
		width: 800px;
		.num {
			width: 80px;
		}
		.ctrl {
			width: 80px;
		}
		.add {
			text-align: left;
			cursor: pointer;
		}
	}
}
</style>


<script>
import validate from '@/common/js/validator/1.0/validator';
import TableBox from '@/components/table-box/1.0/table-box';
import ButtonBox from '@/components/button-box/1.0/button-box';
import AutoTextarea from '@/components/auto-textarea/1.0/auto-textarea';

export default {
	data() {
		return {
			id: this.$route.params.id,
			thead: ['第*课', '课堂内容', '操作'],
			packageName: '',
			classContentList: [],
			classContentIdList: [],
			rules: [{
				key: 'packageName',
				name: '套餐名称',
				extra: [(val) => {
					if (val && val.length > 60) {
						return '套餐名称不能超过60个字';
					}
				}]
			}, {
				key: 'classContentList',
				name: '课堂内容',
				extra: [(val) => {
					let msg = '';
					val.some((item) => {
						if (!item.classContent && item.classContent !== 0) {
							msg = '课堂内容填写不全';
							return true;
						}
					});
					return msg;
				}]
			}]
		};
	},

	computed: {
		btns() {
			return [{
				type: 'active',
				text: '保存',
				click: this.save
			}];
		}
	},

	methods: {

		focus(index) {
			this.$refs.textarea[index].focus();
		},

		add() {
			if (this.classContentList.length < 200) {
				this.classContentList.push({
					classContent: ''
				});
			} else {
				this.$message.error('最多200门课堂');
			}
		},

		remove(index) {
			let id = this.classContentList[index].id;

			if (id) {
				this.classContentIdList.push(id);
			}

			this.classContentList.splice(index, 1);
		},

		save() {
			let params = {
				packageName: this.packageName,
				classContentList: this.classContentList.filter((item) => {
					return !!item.classContent;
				}).map((item, index) => {
					return {
						classContentId: item.id,
						classNum: index + 1,
						classContent: item.classContent
					};
				})
			};

			let msg = validate(params, this.rules);

			if (this.id) {
				params.classContentIdList = this.classContentIdList;
			}

			// 包一层
			params.coursePackage = {
				packageName: params.packageName
			};

			delete params.packageName;

			if (msg) {
				this.$message.error(msg);
				return;
			}

			return vendor.send(this.id ? `/api/coursePackage/${ this.id }` : '/api/coursePackage', {
				showLoading: true,
				method: this.id ? 'PUT' : 'POST',
				data: params
			}).then(() => {

				this.$router.push('/package/list');

			}).catch((err) => {
				this.$message.error(err.message || '请求失败，请稍后重试');
			});
		}
	},

	created() {
		this.add();
	},

	components: {
		TableBox,
		ButtonBox,
		AutoTextarea
	}

};
</script>