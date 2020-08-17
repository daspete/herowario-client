<template>
    <div :class="`materials${ isWidget ? 'widget' : '' }`">
        <div
            :class="`materials${ isWidget ? 'widget' : '' }__material`"
            v-for="material in Object.keys(materials)"
            :key="`material-${ material }`"
            :title="material"
        >
            <img :src="`/assets/icons/materials/${ material }.png`" />
            <span>{{ materials[material] }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        materials: { type: Object, default: () => { return {} } },
        isWidget: { type: Boolean, default: false }
    }
}
</script>

<style lang="scss">
.materials {
    // @apply bg-yellow-600;

    &__material {
        @apply inline-block;
        @apply px-3;
        @apply py-1;

        // @apply border;
        
        // @apply bg-yellow-500;
        // @apply text-yellow-700;
        // @apply border-yellow-600;

        @apply font-bold;

        @apply text-xs;
        @apply text-center;

        img {
            @apply inline-block;
            width: 16px;
            height: 16px;
            object-fit: contain;
            background-position: center center;
        }

        span {
            // @apply block;
            // @apply text-yellow-800;
        }
        
        &:hover {
            // @apply bg-yellow-400;
            // @apply text-yellow-600;

            span {
                // @apply text-yellow-700;
            }
        }
    }
}

.materialswidget {
    // @apply inline-block;

    &__material {
        @apply inline-block;
        @apply font-bold;
        @apply px-1;

        @apply text-xs;
        @apply text-center;

        img {
            @apply inline-block;
            width: 12px;
            height: 12px;
            object-fit: contain;
            background-position: center center;
        }
    }
}
</style>