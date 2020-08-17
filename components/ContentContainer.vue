<template>
    <div :class="MainClasses">
        <div v-if="title" class="contentcontainer__title" v-html="title"></div>
        
        <div class="contentcontainer__content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, default: null }
    },

    computed: {
        MainClasses(){
            const classes = []

            classes.push('contentcontainer')

            return classes
        }
    }
}
</script>

<style lang="scss">
.contentcontainer {
    @apply text-white;
    @apply bg-white bg-opacity-25;
    @apply border-2 border-white border-opacity-50;


    &__title {
        @apply px-2 py-1;
        @apply bg-white bg-opacity-25;
        @apply border-b border-white border-opacity-50;

        @apply font-bold;
        @apply text-lg;
        @apply uppercase;
    }

    &__content {
        @apply px-2 py-1;
    }

}
</style>