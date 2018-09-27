<template>
	<ul class="c-picture-picker">
		<li v-for="(item, index) in modelValue" @click="choose(index)" :style="imgStyle(item)">

			<div v-if="item.tag" class="tag">
				<span>{{ item.tag }}</span>
			</div>

			<div v-if="item.url" class="close g-click" title="删除" @click.stop="remove(index)">
				<i class="g-icon icon-close"></i>
			</div>

			<div v-if="item.url && !(item.percent >= 0)" class="btn g-click">重新选择</div>

			<template v-if="item.percent >= 0">
				<div class="cover" :style="{ height: 100 - item.percent + '%' }"></div>
				<div class="percent" :style="{ 'line-height': height }">{{ item.percent + '%' }}</div>				
			</template>

			<file-uploader
				@beforeUpload="beforeUpload($event, item)"
				@uploadProgress="uploadProgress($event, item)"
				@uploadFinish="uploadFinish($event, item)"
				@error="error($event, item)"
				file-size-limit="3"
				ref="uploader">
			</file-uploader>

		</li>
	</ul>
</template>

<style lang="scss" scoped>
.c-picture-picker {
	li {
		position: relative;
		border: 1px solid #ddd;
		display: inline-block;
		margin-right: 15px;
		margin-bottom: 5px;
		background-image: url(./imgs/icon-add.png);
		background-size: 25px auto;
		background-repeat: no-repeat;
		background-position: center;
		cursor: pointer;
		.tag {
			position: absolute;
			top: 0;
			left: 0;
			width: 0;
			height: 0;
			border: 20px solid;
			border-color: #ffcf27 transparent transparent #ffcf27;
			z-index: 10;
			span {
				position: absolute;
				top: -12px;
    		left: -26px;
				width: 40px;
				transform: rotate(-45deg);
				text-align: center;
				font-size: 12px;
				color: #333;
				z-index: 11;
			}
		}
		.btn {
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			line-height: 20px;
			background: rgba(0, 0, 0, 0.4);
			cursor: pointer;
			text-align: center;
			font-size: 12px;
			color: #fff;
			z-index: 10;
		}
		.close {
			position: absolute;
			right: 0;
			top: 0;
			border-radius: 50%;
			background: #fff;
			transform: translate(50%, -50%);
			z-index: 10;
			i {
				font-size: 18px;
				color: #FF5151;
			}
		}
		.cover {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.4);
			z-index: 8;
		}
		.percent {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			text-align: center;
			text-shadow: 0 0 8px #000;
			font-size: 14px;
			color: #fff;
			z-index: 9;
		}
	}
}
</style>

<script>
import FileUploader from '@/public/components/file-uploader/2.0/file-uploader';

export default {

	name: 'picture-picker',

	props: {
		value: {
			type: Array,
			default: []
		},
		firstTag: {
			type: String
		},
		max: Number,
		width: {
			type: String,
			default: '148px'
		},
		height: {
			type: String,
			default: '148px'
		}
	},

	data() {
		return {
			modelValue: []
		};
	},

	watch: {
		value() {
			this.updateModel();
		},
		firstTag() {
			this.updateModel();
		}
	},

	methods: {
		imgStyle(item) {
			let style = {
				'width': this.width,
				'height': this.height
			};

			if (item.url) {
				style['background-image'] = `url(${ item.url })`;
				style['background-size'] = 'cover';
			}

			return style;
		},

		updateModel() {
			this.modelValue = [...this.value];
			if (this.value.length === 0 || (!this.max || this.value.length < this.max)) {
				this.modelValue.push({
					tag: '',
					url: '',
					percent: NaN
				});
			}

			this.modelValue[0].tag = this.firstTag;
		},

		choose(index) {
			if (this.modelValue[index].percent >= 0) {
				return;
			}
			this.$refs.uploader[index].chooseFile();
		},

		remove(index) {
			this.$refs.uploader[index].cancel();
			this.modelValue.splice(index, 1);
			this.$emit('input', this.modelValue.filter((t) => {
				return t.url;
			}));
		},

		beforeUpload(data, item) {
			item.percent = 0;

			let reader = new FileReader();

			reader.onload = (e) => {
				item.url = e.target.result;
			};

			reader.readAsDataURL(data.file.getSource().getSource());

		},

		uploadProgress(data, item) {
			item.percent = data.file.percent;
		},

		uploadFinish(data, item) {

			let $img = new Image();

			$img.onload = () => {
				item.url = data.url;
				item.percent = NaN;
				this.$emit('input', this.modelValue.filter((t) => {
					return t.url;
				}));
			};

			$img.src = data.url;

		},

		error(data) {
			this.$message.error(data.errTip);
		}
	},

	created() {
		this.updateModel();
	},

	components: {
		FileUploader
	}

};
</script>