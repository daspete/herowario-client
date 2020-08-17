<template>
    <div class="buildingmenu grid grid-cols-8">
        <div
            :class="`buildingmenu__button`"
            v-for="building in PossibleBuildings"
            :key="`building-menu-button-${ building }`"
            @click="Build(building)"
            :title="building"
        >
            <div>{{ building }}</div>
            <img :src="`/assets/icons/buildings/${ building }.png`" />

            <div class="buildingmenu__button__cost">
                <Materials :materials="GetBuildingCost(building)" :isWidget="true" />
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        player: { type: Object, default: () => { return {} } }
    },
    computed: {
        PossibleBuildings(){
            let config = this.$store.getters['config/Config']
            if(!config.buildings) return []

            return Object.keys(config.buildings).filter((_building) => {
                return this.CanBuild(_building)
            })
        }
    },

    methods: {
        GetBuildingCost(type){
            let config = this.$store.getters['config/Config']
            let buildingSettings = config.buildings[type]

            return buildingSettings.build.cost
        },

        Build(building){
            this.$emit('build', building)
        },

        CanBuild(building){
            let config = this.$store.getters['config/Config']
            if(!config.buildings) return false
            if(!this.player.buildings) return false

            const dependencies = Object.keys(config.buildings[building].build.dependencies)

            const playerBuildings = this.player.buildings.map((_building) => {
                return _building.type
            })

            for(let i = 0; i < dependencies.length; i++){
                if(!playerBuildings.includes(dependencies[i])) return false
            }
            
            return true
        }
    }
}
</script>

<style lang="scss">
.buildingmenu {
    @apply bg-orange-600;

    &__button {
        @apply inline-block;
        // @apply px-3;
        // @apply py-1;

        @apply border;
        @apply cursor-pointer;

        @apply bg-orange-500;
        @apply text-orange-700;
        @apply border-orange-600;

        @apply font-bold;

        @apply text-center;

        > img {
            @apply inline-block;
            width: 48px;
            height: 48px;
            object-fit: contain;
            object-position: center center;
        }

        &__cost {
            background-color: rgba(white, 0.2);
        }

        span {
            // @apply block;
            @apply text-orange-800;
        }
        
        &:hover {
            @apply bg-orange-400;
            @apply text-orange-600;

            span {
                @apply text-orange-700;
            }
        }     
    }
}
</style>