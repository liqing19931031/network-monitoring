<template>
    <div class="home clearfix">
        <div class="left-content pull-left">
            <div class="package content">
                <div class="header text-gray text-big">
                    套餐信息
                </div>
                <div class="body">
                <div v-if='this.isEmptyObject(this.packageInformation)'>
                    <div class="package-message clearfix">
                        <div>HTTP监控</div>
                        <div class="mon-sum pull-left" style="width: 80%">
                            <div class="mon-sum-hover brand-primary" :style='longColor(packageInformation.http)'></div>
                        </div>
                        <div class="pull-left text-right" style="width: 20%">
                            <span class="text-danger">{{packageInformation.http}}</span>/2
                        </div>
                    </div>
                    <div class="package-message clearfix">
                        <div>DNS监控</div>
                        <div class="mon-sum pull-left" style="width: 80%">
                            <div class="mon-sum-hover brand-primary" :style='longColor(packageInformation.dns)'></div>
                        </div>
                        <div class="pull-left text-right" style="width: 20%">
                            <span class="text-danger">{{packageInformation.dns}}</span>/2
                        </div>
                    </div>
                    <div class="package-message clearfix">
                        <div>PING监控</div>
                        <div class="mon-sum pull-left" style="width: 80%">
                            <div class="mon-sum-hover brand-primary" :style='longColor(packageInformation.ping)'></div>
                        </div>
                        <div class="pull-left text-right" style="width: 20%">
                            <span class="text-danger">{{packageInformation.ping}}</span>/2
                        </div>
                    </div>
                    <div class="package-message clearfix">
                        <div>内容监控</div>
                        <div class="mon-sum pull-left" style="width: 80%">
                            <div class="mon-sum-hover brand-primary" :style='longColor(packageInformation.cg)'></div>
                        </div>
                        <div class="pull-left text-right" style="width: 20%">
                            <span class="text-danger">{{packageInformation.cg}}</span>/2
                        </div>
                    </div>
                    <div class="package-message clearfix">
                        <div>短信数量</div>
                        <div class="mon-sum pull-left" style="width: 50%">
                            <div class="mon-sum-hover brand-primary" :style='{width: (100*alarmUser.message/alarmUser.summessage) + "%"}'></div>
                        </div>
                        <div class="pull-left text-right" style="width: 30%">
                            <span class="text-danger">{{alarmUser.message}}</span>/{{alarmUser.summessage}}
                        </div>
                        <div class="pull-left text-right" style="width: 20%;position: relative;height: 24px">
                            <span class="add-message brand-primary text-center pull-right" @click='addMessage("短信套餐")'>
                            +                                
                            </span>
                        </div>
                    </div>
                </div>
                    
                </div>
            </div>
            <div class="alarm-contacts content">
                <div class="header text-gray text-big">
                    告警联系人信息
                </div>
                <div class="body" v-if='this.isEmptyObject(alarmUser)'>
                    <div class="message">
                        <div>电子邮箱：</div>
                        <div>{{alarmUser.email}}<span class="pull-right text-primary pull-right"><router-link to='/user/inform'>设置</router-link></span></div>
                    </div>
                    <div>
                        <div>手机：</div>
                        <div>{{alarmUser.telephone}}<span class="pull-right text-primary pull-right"><router-link to='/user/inform'>设置</router-link></span></div>
                    </div>
                </div>
            </div>
            <div class="call-me content">
                <div class="header text-gray text-big" @click='xunhuan'>
                    联系我们
                </div>
                <div class="body">
                    <div class="message">
                        <div>电子邮箱：</div>
                        <div>szfw@szfw.org</div>
                    </div>
                    <div class="message">
                        <div>咨询电话：</div>
                        <div>400-847-0006</div>
                    </div>
                    <div>
                        <div>微信公众号：</div>
                        <div class="text-center">
                            <img src="static/erwei.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-content pull-left">
            <chart :title='"网站监测概述"' :className='"overview"'></chart>
            <alarmList :alarmData='alarmData.dataList'></alarmList>
            <timeLong :title='`网站响应时间 (${this.dateFormat(new Date())})`' :className='"resTime"'></timeLong>
        </div>
        <modal :title='modalParams.title'>
            <div slot='body' v-if='modalParams.custom === "message"'>
                <div class="add-message-content" v-for='item in this.messages'>
                    <span class="text-left">{{item.name}}：{{item.content}}</span>
                    <span class="text-right pull-right"><a :href='`http://www.sitemonitor.com/api/addSms?id=${item.id}`' target="_blank">点击购买</a></span>
                </div>
                <!-- <div class="add-message-content">
                    <span class="text-left">套餐一：10元/100条短信通知</span>
                    <span class="text-right pull-right"><a href="">点击购买</a></span>
                </div>
                <div class="add-message-content">
                    <span class="text-left">套餐一：20元/250条短信通知</span>
                    <span class="text-right pull-right"><a href="">点击购买</a></span>
                </div>
                <div class="add-message-content">
                    <span class="text-left">套餐一：30元/400条短信通知</span>
                    <span class="text-right pull-right"><a href="">点击购买</a></span>
                </div> -->
            </div>
        </modal>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import chart from './chart'
import alarmList from './alarm'
import timeLong from './timeLong'
import modal from '../modal'

export default {
    name: 'home',
    data () {
        return {
            alarmData: {
                dataList: [
                ]
            },
            modalParams: {
                title: '',
                onOk: '',
                custom: true
            },
            messages: [],
            alarmUser: {},
            packageInformation: {}
        }
    },
    mounted () {
        this.getData('get', 'api/meal', undefined, (res) => {
            this.$set(this, 'packageInformation', res.data.result)
        })
        this.getData('get', 'api/link', undefined, (res) => {
            this.$set(this, 'alarmUser', res.data.result)
        })
        this.getData('get', 'api/event', undefined, (res) => {
            this.$set(this.alarmData, 'dataList', res.data.result)
        })
        this.getData('get', 'api/package', undefined, (res) => {
            this.messages = res.data.result
        })
    },
    methods: {
        longColor (mon) {
            return {
                width: (100 * (mon / 2 > 1 ? 1 : mon / 2)) + '%'
            }
        },
        xunhuan () {
            for (let i = 0; i < 5; i++) {
                console.log(i + '次')
                setTimeout(function () {
                    /* eslint-disable */
                    console.log(new Date, i)
                }, 1000)
            }
        },
        addMessage (title) {
            this.$set(this.modalParams, 'title', title)
            this.$set(this.modalParams, 'custom', 'message')
            this.showModal()
        },
        ...mapMutations([
            'hideModal',
            'showModal'
        ])
    },
    components: {
        chart,
        alarmList,
        timeLong,
        modal
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .home{
        a{
            text-decoration: none;
        }
        .left-content{
            width: 14%;
            margin-right: 1%;
            .header{
                line-height: 45px;
                text-align: center;
                background-color: #f3f3f3;
                height: 45px;
                border-bottom: 1px solid rgb(221,221,221);
            }
            .content{
                margin-bottom: 20px;
                border:1px solid rgb(221,221,221);
                .body{
                    padding:20px 7px;
                    background-color: white;
                    span{
                        cursor: pointer;
                    }
                    .message{
                        margin-bottom: 20px;
                    }
                    img{
                        width: 145px;
                        height: 145px;
                    }
                }
            }
            .package{
                height:350px;
                .body{
                    height: 303px;
                    .package-message{
                        .mon-sum{
                            background-color: #cccccc;
                            border-radius: 4px;
                            height: 8px;
                            margin-top: 8px;
                            .mon-sum-hover{
                                height: 8px;
                                border-radius: 4px;
                            }
                        }
                        .mon-sum + .text-right{
                            margin-top: 3px;
                        }
                        .add-message{
                            width:18px;
                            height: 18px;
                            border-radius: 100%;
                            color: white;
                            font-size: 16px;
                            line-height: 18px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .package-message + .package-message{
                margin-top: 15px;
            }
            .alarm-contacts{
                .body{
                    height: 133px;
                }
            }
            .call-me{
                .body{
                    height: 353px;
                }
            }
        }
        .right-content{
            width: 85%;
        }
        .add-message-content{
            a{
                text-decoration: none;
            }
        }
        .add-message-content + .add-message-content{
            margin-top: 20px;
        }
    }
</style>
