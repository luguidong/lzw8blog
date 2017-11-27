<template>
<div class="side_bar_con">
    <Row> 
        <i-col span="8">
            <Menu width='200px' :theme="theme2" active-key="1-2" :open-keys="['1']" name='menu'>
                <Submenu key="1" name='1'>
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        内容管理
                    </template>
                    <Menu-item key="1-1" name='1-1'>文章管理</Menu-item>
                    <Menu-item key="1-2" name='1-2'>评论管理</Menu-item>
                    <Menu-item key="1-3" name='1-3'>举报管理</Menu-item>
                </Submenu>
                <Submenu key="2" name='2'>
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                    </template>
                    <Menu-item key="2-1" name='2-1'>新增用户</Menu-item>
                    <Menu-item key="2-2" name='2-2'>活跃用户</Menu-item>
                </Submenu>
                <Submenu key="3" name='3'>
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        统计分析
                    </template>
                    <Menu-group title="使用">
                        <Menu-item key="3-1" name='3-1'>新增和启动</Menu-item>
                        <Menu-item key="3-2" name='3-2'>活跃分析</Menu-item>
                        <Menu-item key="3-3" name='3-3'>时段分析</Menu-item>
                    </Menu-group>
                    <Menu-group title="留存">
                        <Menu-item key="3-4" name='3-4'>用户留存</Menu-item>
                        <Menu-item key="3-5" name='3-5'>流失用户</Menu-item>
                    </Menu-group>
                </Submenu>
            </Menu>
        </i-col>
    </Row>
</div>
</template>
<script>
    export default {
        data () {
            return {
                theme2: 'dark'
            }
        }
    }
</script>
<style scoped>
.side_bar_con{
    width:200px;
    position: fixed;
    left: 0;
    top:0;
    bottom:0;
    background:#495060;
}

</style>
