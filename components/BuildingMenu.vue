<template>
    <div class="buildingmenu">
        <button 
            v-for="building in PossibleBuildings"
            :key="`building-menu-button-${ building }`"
            @click="$emit('build', building)"
        >Build {{ building }}</button>

        <!-- <button @click="$emit('build', 'woodcutter')">Build Woodcutter</button>
        <button @click="$emit('build', 'stonehut')">Build Stonehut</button> -->
    </div>
</template>

<script>
export default {
    computed: {
        PossibleBuildings(){
            let config = this.$store.getters['config/Config']
            if(!config.buildings) return []

            return Object.keys(config.buildings)
        }
    }
}
</script>

<style>

</style>