export const name = 'ppz-pagination'

export const defaults = { // 全局配置
  size: 16
}

export const options = {
  props: { // 局部配置
    size: { type: Number, default: defaults.size },
    index: { type: Number, default: 1 },
    count: { type: Number, default: 0 },
    l10n: {}
  },
  data() {
    return {
      inputingSize: this.size,
      inputingIndex: this.index,
      inputingl10n: this.l10n
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
      <span class="txt">{{l10n.perPage}}</span>
      <ppz-input class="page-size" v-model.trim="inputingSize" />
      <span class="txt">{{l10n.totalRecords}}</span>
      <span>{{count}}</span>
      <span class="txt">{{l10n.record}}</span>
      <span>{{pageCount}}</span><span class="txt">{{l10n.pages}}</span>
      <icon-btn class="big" :disabled="index <= 1" @click="incr(-2)" iid="arrow-left2" />
      <icon-btn class="big" :disabled="index <= 1" @click="incr(-1)" iid="arrow-left" />
      <ppz-input v-model.trim="inputingIndex" />
      <icon-btn class="big" :disabled="index >= pageCount" @click="incr(1)" iid="arrow-right" />
      <icon-btn class="big" :disabled="index >= pageCount" @click="incr(2)" iid="arrow-right2" />
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
  .ppz-pagination {
    display: flex;
    align-items: center;
  }
  .ppz-pagination .txt {
    font-size: .8em;
    margin: 0 .2em;
  }
  .ppz-pagination button {
    padding: 0 .28em;
  }
  .ppz-pagination button.big svg {
    transform: scale(1.3);
  }
  .ppz-pagination input {
    width: 2.2em;
    padding: 0 0.16em;
    text-align: center;
    height: 1.3em;
    background: rgba(var(--color1), .1);
    border-radius: 4px;
  }
  .ppz-pagination .page-size {
    margin: 0 .3em;
  }
`