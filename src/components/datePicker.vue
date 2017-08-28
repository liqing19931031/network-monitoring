<template> <!-- 待优化 todo 点击外部下拉菜单消失 -->
    <div @click='focus'>
        <div class="calendar-input-container" v-show="show" :class="[isRed ? 'red-theme' : 'blue-theme']" :style="containerStyle" @click='prevent'>
          <label for="calendar-input">
              <input ref="mainInput" class="calendar-input" type="text" readonly="readonly" :class="{focus: isfocus}" @click="focus" v-model="selectValue">
          </label>
            <transition name="fade">
                <div id="calendar" v-show="changeShowCalendar">
                    <div id="calendar-header">
                        <span class="arrow" @click="subMonth">&lt;</span>
                        <span id="date-box">
                            {{trueSelectYear}}年{{trueSelectMonth}}月
                        </span>
                        <span class="arrow" @click="addMonth">&gt;</span>
                    </div>
                    <div class="week">
                        <span v-for="(item, index) in week" :class="{weekend: index === 0 || index === 6}">
                            {{item}}
                        </span>
                    </div>
                    <div class="hour">
                        <span class="arrow" @click="addHour">&lt;</span>
                        <span>
                            {{this.hour}}:00
                        </span>
                        <span class="arrow" @click="subHour">&gt;</span>
                    </div>
                    <div class="days">
                        <span v-for="(item, index) in renderData" :class="{ 
                            weekend: index % 7 === 0 || index % 7 === 6, 
                            unselect: unselectArr.includes(index),
                            select: index === firstDayInWeek + trueSelectDay - 1
                          }" @click="changeSelectDay(index)" ref='days'>
                            {{item}}
                        </span>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
  name: 'calendar-input',
  props: {
    timeName: {
        type: String
    },
  	subData: {
  		type: Object
  	},
    show: {   // 是否显示组件
      	type: Boolean,
      	default: true
    },
    isRed: {  // 红蓝两种主题可选
      	type: Boolean,
      	default: false
    },
    limit: {  // 日期可选范围
      type: Object,
      default () {
        return {
          minYear: 1900,
          minMonth: 1,
          minDay: 1,
          maxYear: new Date().getFullYear(),
          maxMonth: new Date().getMonth() + 1,
          maxDay: new Date().getDate()
        }
      }
    },
    showCalendar: {
    	type: Boolean,
    	default: false
    },
    containerStyle: {// 组件容器样式
      type: Object
    }
  },
  mounted () {
  	this.addDbClick(this.$refs.days.filter(this.getenselects))
  },
  data () {
    return {
      isfocus: false,
      changeShowCalendar: this.showCalendar,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      hour: 0,
      date: new Date(),
      selectYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth() + 1,
      selectDay: new Date().getDate()
    }
  },
  methods: {
  	addDbClick ($ele) {
  		$ele.forEach((item, index) => {
  			item.addEventListener('dblclick', () => {
  				this.focus()
  			})
  		})
  	},
    prevent (e) {
        e.stopPropagation()
    },
  	getenselects (ele) {
  		return ele.className !== 'unselect' && ele.className !== 'weekend unselect'
  	},
    focus () {
      this.isfocus = !this.isfocus
      this.changeShowCalendar = !this.changeShowCalendar
    },
    subHour () {
      let nexthour
      nexthour = this.hour === 23 ? 0 : this.hour + 1
      this.$set(this, 'hour', nexthour)
    },
    addHour () {
      let nexthour
      nexthour = this.hour === 0 ? 23 : this.hour - 1
      this.$set(this, 'hour', nexthour)
    },
    subMonth () {
      if (this.selectMonth === 1) {
        this.selectMonth = 12
        this.selectYear -= 1
      } else {
        this.selectMonth -= 1
      }
      if (this.selectYear < this.limit.minYear) this.selectYear = this.limit.minYear
      if (this.selectYear === this.limit.minYear) {
        if (this.selectMonth <= this.limit.minMonth) {
          this.selectMonth = this.limit.minMonth
        }
      }
    },
    addMonth () {
      if (this.selectMonth === 12) {
        this.selectMonth = 1
        this.selectYear += 1
      } else {
        this.selectMonth += 1
      }
      if (this.selectYear > this.limit.maxYear) this.selectYear = this.limit.maxYear
      if (this.selectYear === this.limit.maxYear) {
        if (this.selectMonth >= this.limit.maxMonth) {
          this.selectMonth = this.limit.maxMonth
        }
      }
    },
    changeSelectDay (index) {
      if (this.unselectArr.includes(index)) return false
      this.selectDay = index - this.firstDayInWeek + 1
    }
  },
  computed: {
    trueSelectYear () {
      if (this.selectYear < this.limit.minYear) return this.limit.minYear
      if (this.selectYear > this.limit.maxYear) return this.limit.maxYear
      return this.selectYear
    },
    trueSelectMonth () {
      if (this.selectYear === this.limit.minYear && this.selectMonth < this.limit.minMonth) return this.limit.minMonth
      if (this.selectYear === this.limit.maxYear && this.selectMonth > this.limit.maxMonth) return this.limit.maxMonth
      return this.selectMonth
    },
    trueSelectDay () {
      if (this.selectYear === this.limit.minYear && this.selectMonth === this.limit.minMonth && this.selectDay < this.limit.minDay) return this.limit.minDay
      if (this.selectYear === this.limit.maxYear && this.selectMonth === this.limit.maxMonth && this.selectDay > this.limit.maxDay) return this.limit.maxDay
      if (this.selectDay > this.dayCount) return this.dayCount
      return this.selectDay
    },
    selectValue () {
      return `${this.trueSelectYear}-${this.trueSelectMonth < 10 ? '0' + this.trueSelectMonth : this.trueSelectMonth}-${this.trueSelectDay} ${this.hour < 10 ? '0' + this.hour : this.hour}:00`
    },
    firstDayInWeek () {
      return new Date(this.trueSelectYear, this.trueSelectMonth - 1, 1).getDay()
    },
    dayCount () {
      return new Date(this.trueSelectYear, this.trueSelectMonth, 0).getDate()
    },
    lastMonthDay () {
      let lastNum = this.firstDayInWeek
      let lastDays = []
      if (lastNum === 0) return lastDays

      let i = 0
      let lastDayNum = new Date(this.trueSelectYear, this.trueSelectMonth - 1, 0).getDate()
      for (; i < lastNum; i++) {
        lastDays.unshift(lastDayNum)
        lastDayNum--
      }
      return lastDays
    },
    nextMonthDay () {
      let num = 42 - this.firstDayInWeek - this.dayCount
      let nextDays = []
      if (num === 0) return nextDays
      let i = 1
      for (; i <= num; i++) {
        nextDays.push(i)
      }
      return nextDays
    },
    renderData () {
      let nowDays = []
      let i = 1
      for (; i <= this.dayCount; i++) {
        nowDays.push(i)
      }
      return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay]
    },
    unselectArr () {
      let index = 0
      let arr = []
      if (this.trueSelectYear === this.limit.minYear && this.trueSelectMonth === this.limit.minMonth) {
        for (; index < this.firstDayInWeek + this.limit.minDay - 1; index++) {
          arr.push(index)
        }
      } else {
        for (; index < this.firstDayInWeek; index++) {
          arr.push(index)
        }
      }
      if (this.trueSelectYear === this.limit.maxYear && this.trueSelectMonth === this.limit.maxMonth) {
        index = this.firstDayInWeek + this.limit.maxDay
        for (; index < 42; index++) {
          arr.push(index)
        }
      } else {
        index = this.firstDayInWeek + this.dayCount
        for (; index < 42; index++) {
          arr.push(index)
        }
      }
      return arr
    }
  },
  watch: {
    selectValue (newVal) {
    	this.$set(this.subData, this.timeName, newVal)
    },
    showCalendar (newVal) {
        (!newVal && this.changeShowCalendar) && this.focus()
    }
  }
}
</script>

<style lang='less' scoped>
label{
  display: inline;
}
.calendar-input-container {
	display: inline-block;
	position: relative;
	padding: 10px;
	text-align: center;
	font-family: SimHei
}
.calendar-input-container .fade-enter-active, .calendar-input-container .fade-leave-active {
	-webkit-transition: opacity .5s;
	transition: opacity .5s
}
.calendar-input-container .fade-enter, .calendar-input-container .fade-leave-active {
	opacity: 0
}
.calendar-input-container .calendar-input {
	box-sizing: border-box;
	width: 100%;
	height: 30px;
	padding-left: 5px;
	padding-right: 5px;
	border: 1px solid #ccc;
	border-radius: 4px;
	cursor: pointer;
	outline: none;
	-webkit-transition: all .6s;
	transition: all .6s
}
.calendar-input-container #calendar {
	position: absolute;
	width: 100%;
	z-index: 99999;
	height: 240px;
	background-color: white;
	box-sizing: border-box;
	border: 2px solid #eee;
	border-radius: 2%
}
.calendar-input-container #calendar div, .calendar-input-container #calendar span {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-direction: row;
	flex-direction: row;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center
}
.calendar-input-container #calendar div {
	height: 10%;
	width: 100%
}
.calendar-input-container #calendar span {
	height: 100%;
	width: 14.2857%
}
.calendar-input-container #calendar #calendar-header {
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-direction: row;
	flex-direction: row;
	-ms-flex-wrap: nowrap;
	flex-wrap: nowrap;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between
}
.calendar-input-container #calendar #calendar-header, .calendar-input-container #calendar #calendar-header span {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center
}
.calendar-input-container #calendar #calendar-header #date-box {
	-webkit-box-flex: 2;
	-ms-flex-positive: 2;
	flex-grow: 2
}
.calendar-input-container #calendar .week {
	box-sizing: border-box;
	padding: 5px;
	font-size: 16px
}
.calendar-input-container #calendar .week span {
	height: 100%
}
.calendar-input-container #calendar .days {
	box-sizing: border-box;
	height: 70%;
	padding: 5px;
	font-size: 14px
}
.calendar-input-container #calendar .days span {
	height: 16.666667%;
	cursor: pointer;
	-webkit-transition: all .5s;
	transition: all .5s
}
.calendar-input-container #calendar .days .unselect {
	cursor: default
}
.blue-theme .focus {
	border-color: #9ecaed;
	box-shadow: 0 0 5px #9ecaed
}
.blue-theme .arrow {
	cursor: pointer;
	color: #2f80c3;
  user-select: none;
	-webkit-transition: color .5s;
	transition: color .5s
}
.blue-theme .arrow:hover {
	color: #9ecaed
}
.blue-theme .weekend {
	color: #2f80c3
}
.blue-theme .days span:hover {
	border-radius: 2px;
	background-color: #9ecaed;
	color: #fff
}
.blue-theme .days .unselect, .blue-theme .days .unselect:hover {
	border-radius: 0;
	background-color: #fff;
	color: #ccc
}
.blue-theme .days .select, .blue-theme .days .select:hover {
	border-radius: 2px;
	background-color: #2f80c3;
	color: #fff
}
.red-theme #calendar-header {
	color: #fff;
	background-color: #cb1b01
}
.red-theme .focus {
	border-color: #ccc;
	box-shadow: 0 0 5px #ccc
}
.red-theme .arrow {
	cursor: pointer
}
.red-theme .weekend {
	color: #cb1b01
}
.red-theme .days {
	color: #888
}
.red-theme .days span:hover {
	border-radius: 2px;
	background-color: red;
	color: #fff
}
.red-theme .days .unselect, .red-theme .days .unselect:hover {
	border-radius: 0;
	background-color: #fff;
	color: #ccc
}
.red-theme .days .select, .red-theme .days .select:hover {
	border-radius: 2px;
	background-color: #cb1b01;
	color: #fff
}
</style>
