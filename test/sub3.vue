<template>
    <div>sub3</div>
</template>

<script>
export default {
    created() {
        this.$on('kkk', data => {
            console.log('sub3', data);
        })
        this.$bubble('a', 1);
    },
    methods: {
    }
}
</script>

<style>
</style>
