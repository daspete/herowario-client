<template>
    <div :class="WindowClasses">
        window
    </div>
</template>

<script>
export default {
    computed: {
        WindowClasses(){
            const classes = []

            classes.push('window')

            return classes
        }
    }
}
</script>

<style lang="scss">

</style>