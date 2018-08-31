<template>
    <div>
        sub1
        <sub2 />
        <div @click="knock">asdfasdf</div>
    </div>
</template>

<script>
import sub2 from './sub2'
export default {
    components: {
        sub2,
    },
    beforeCreate() {
    },
    created() {
        ;
    },
    methods: {
        knock() {
            this.$broadcast('kkk', {ok: 1});
        }
    }
}
</script>

<style>
</style>
