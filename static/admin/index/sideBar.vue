<template>
<div>
    <Menu :theme="theme3" active-key="1">
        <Menu-group title="内容管理">
            <Menu-item key="1">
                <Icon type="document-text"></Icon>
                文章管理
            </Menu-item>
            <Menu-item key="2">
                <Icon type="chatbubbles"></Icon>
                评论管理
            </Menu-item>
        </Menu-group>
        <Menu-group title="统计分析">
            <Menu-item key="3">
                <Icon type="heart"></Icon>
                用户留存
            </Menu-item>
            <Menu-item key="4">
                <Icon type="heart-broken"></Icon>
                流失用户
            </Menu-item>
        </Menu-group>
    </Menu>
    
</div>
</template>
<script>

    export default {
        props:['theme'],
        data () {
            return {
                theme3: 'black'
            }
        }
    }
</script>