<template>
    <div>
        <p class="h">Hello World</p>
        <sub1 @a="onA" />
    </div>
</template>

<script>
import sub1 from './sub1';
export default {
    components: {
        sub1,
    },
    beforeCreate() {

    },
    created() {
        
    },
    methods: {
        onA(d) {
            console.log('a', d);
        }
    }
}
</script>

<style>
    .h {
        color: yellow;
    }
</style>
