<template>
    <div class="hello">
        <div class="boxShow">
            <div class="trans"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .boxShow{
        width: 300PX;
        height: 300PX;
        margin:0 auto;
        position: relative;
        background-color: #f2de3f;
        box-shadow: 0px 5px 8px -4px rgba(0, 0, 0, 0.5)
    }
    .trans{
        position: absolute;
        right: 0;
        top: 0;
        width: 40px;
        height: 40px;
        background: linear-gradient( -135deg, transparent 1.8em, #58a 0);
    }
</style>
