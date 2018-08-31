<template>
    <div>sub2

        <sub3 />
    </div>
</template>

<script>
import sub3 from './sub3';
export default {
    created() {
        this.$on('kkk', data => {
            console.log('sub2', data);
            // data.stopSpread();
        })
        this.$on('a', e => {
            // e.stopSpread();
            console.log(e, 'sub2');
        })
    },
    components: {
        sub3,
    },
    methods: {

    }
}
</script>

<style>
</style>
