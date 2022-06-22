export const name = 'ppz-pagination'

export const defaults = { // 全局配置
  size: 16
}

export const options = {
  props: { // 局部配置
    size: { type: Number, default: defaults.size },
    index: { type: Number, default: 1 },
    count: { type: Number, default: 0 }
  },
  data() {
    return {
      inputingSize: this.size,
      inputingIndex: this.index
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.size) || 1
    }
  },
  template: `
    <div class="ppz-pagination">
      <icon-btn @click="refresh" iid="refresh" />
      <ppz-input v-model.trim="inputingSize" />
      <span>条记录 / 页 共 {{count}} 条 {{pageCount}} 页</span>
      <icon-btn :disabled="index <= 1" @click="incr(-2)" iid="arrow-left2" />
      <icon-btn :disabled="index <= 1" @click="incr(-1)" iid="arrow-left" />
      <ppz-input v-model.trim="inputingIndex" />
      <icon-btn :disabled="index >= pageCount" @click="incr(1)" iid="arrow-right" />
      <icon-btn :disabled="index >= pageCount" @click="incr(2)" iid="arrow-right2" />
    </div>
  `,
  methods: {
    // 触发翻页来源一
    async incr(which) {
      let size = this.formatSize()
      this.setSize(size)
      await this.$nextTick() // 让 size 得以更新（pageCount 更新）

      let index = this.formatIndex()
      index = {
        '-2': 1,
        '-1': index - 1,
        1: index + 1,
        2: this.pageCount
      }[which]
      this.setIndex(index)

      this.$emit('change')
    },
    // 触发翻页来源二
    refresh() {
      this.setIndex(this.formatIndex())
      this.setSize(this.formatSize())
      this.$emit('change')
    },
    formatIndex() { // 获取“正确格式”
      let index = parseInt(this.inputingIndex)
      if(index != this.inputingIndex)
        index = 1
      return index
    },
    formatSize() { // 获取“正确格式”
      let size = parseInt(this.inputingSize)
      if(size != this.inputingSize)
        size = this.size
      return size
    },
    setIndex(index) { // 设置“正确范围”
      if(index <= 0)
        this.inputingIndex = 1
      else if(index >= this.pageCount)
        this.inputingIndex = this.pageCount
      else
        this.inputingIndex = index
      this.$emit('update:index', this.inputingIndex)
    },
    setSize(size) { // 设置“正确范围”
      if(size <= 1)
        this.inputingSize = 1
      else
        this.inputingSize = size
      this.$emit('update:size', this.inputingSize)
    }
  }
}

export const style = `
  .ppz-pagination input {
    width: 2.2em;
    text-align: center;
  }
`