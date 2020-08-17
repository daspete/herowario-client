<template>
    <div class="buildings">
        <div class="grid gap-4 mt-4 grid-cols-3">
            <div class="buildings__overview">
                
                <div class="text-xl font-bold text-gray-400">Active buildings</div>

                <div class="buildings__overview__grid grid grid-cols-8">
                    <div
                        :class="`buildings__overview__button ${ SelectedBuilding && SelectedBuilding.id == building.id ? 'buildings__overview__button--active' : '' }`"
                        v-for="building in buildings"
                        :key="`building-button-${ building.id }`"
                        @click="SelectBuilding(building.id)"
                    >
                        <!-- {{ building.type }} -->
                        <img :src="`/assets/icons/buildings/${ building.type }.png`" />
                    </div>
                </div>
            </div>
            <div class="buildings__building col-span-2">
                <BuildingDetails
                    v-if="SelectedBuilding"
                    :key="`building-${ SelectedBuilding.id }`"
                    :building="SelectedBuilding"
                />
            </div>
        </div>
        
        <!-- <Building
            v-for="building in buildings"
            :key="`building-${ building.id }`"
            :building="building"
        /> -->
    </div>
</template>

<script>
export default {
    props: {
        buildings: { type: Array, default: () => { return [] } }
    },

    data(){
        return {
            currentBuildingId: null
        }
    },

    computed: {
        SelectedBuilding(){
            if(this.currentBuildingId == null) return false
            return this.buildings.find((building) => {
                return building.id == this.currentBuildingId
            })
        }
    },

    methods: {
        SelectBuilding(buildingId){
            this.currentBuildingId = buildingId
        }
    }
}
</script>

<style lang="scss">
.buildings {
    &__overview {
        padding: 0 10px 10px 10px;
        border-radius: 4px;
        border: 2px solid rgba(white, 0.2);
        background-color: rgba(white, 0.2);

        &__grid {
            background-color: rgba(white, 0.2);
            max-height: 60vh;
            overflow: auto;
        }
        
        &__button {
            cursor: pointer;
            background-color: rgba(white, 0.2);
            border: 1px solid rgba(black, 0.2);

            &:hover {
                background-color: rgba(white, 0.5);
            }

            &--active {
                background-color: rgba(white, 0.7);

                &:hover {
                    background-color: rgba(white, 0.7);
                }
            }

            
        }
    }
}
</style>