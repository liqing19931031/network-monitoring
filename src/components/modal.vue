<template>
        <transition name='modal'>
            <div class="modal-transition modal-mask notification" v-if="this.$store.state.modal" @click='hideModal'>
                <div class="modal-confirm" @click='prevent'>
                    <div class="modal-content">
                        <!--头部-->
                        <slot name="header">
                            <div class="modal-header">
                                <div class="title"><i class="glyphicon"></i>{{this.title}}</div>
                            </div>
                        </slot>
                        <!--内容区域-->
                        <div class="modal-body">
                            <slot name="body">
                            </slot>
                        </div>
                        <!--尾部,操作按钮-->
                        <div class="modal-footer">
                            <slot name="button">
                                <button class="btn btn-default" @click='hideModal'>取 消</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props: ['title'],
	data () {
		return {

		}
	},
    methods: {
        ...mapMutations([
            'hideModal'
        ]),
        prevent (e) {
          e.stopPropagation()
        }
    }
}

</script>

<style lang='less'>
.modal-primary{
    background-color: #007be3;
}
.modal-success{
    background-color: #43cb83;
}
.modal-danger{
    background-color: #d9534f;
}
.modal-warning{
    background-color: #f0ad4e;
}
.notification{
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}
.modal-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(55,55,55,.6);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    .modal-header{
        padding: 20px;
    }
    .modal-body{
        padding: 20px 45px;
    }
    .img-body{
        border:1px dashed #ddd;
        width: 100%;
        height: 250px;
        border-radius: 8px;
        background-color: #fbfbfc;
        .down-load{
            text-align: center;
            font-size: 80px;
            padding-bottom: 10px;
            cursor: pointer;
            img{
                left: 0;
                top: 0;
                position: absolute;
            }
            input[type="file"]{
                width: 80px;
                height: 80px;
                opacity: 0;
                z-index: 2;
                position: absolute;
            }
        }
        .text-line{
            padding: 10px 20px;
            text-align: center;
        }
        .text-prompt{
            color: #ccc;
        }
        .text-strong{
            color: #333;
        }
    }
  label{
    display: block;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    input[type="text"]{
        width: 300px;
        height: 24px;
        display: inline-block;
    }
  }
}
.modal-confirm{
  width: 500px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 6px;
}
@media only screen and (max-width: 640px) {
 .modal-confirm{
    width: 100%;
    margin: 0 20px;
    padding: 10px 20px; 
  }
}
.modal-enter-active {
    transition: all .3s ease;
}
.modal-leave-active{
    transition: all .3s ease;
}
.modal-enter,
.modal-leave-active {
    opacity: 0;
    transform: scale(1.5);
}
.modal-footer{
    border-top: none;
    text-align: center;
}
.modal-content{
    border: none;
}
.modal-header{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
</style>
