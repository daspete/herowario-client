<template>

    <div class="building">
        <div class="building__label">
            <div class="building__label-content border-b border-blue-300 mb-1">{{ building.type }}</div>
            <div class="building__label-content--mini flex">
                <div class="mr-1 w-12">Lvl {{ building.level }}</div>
                <div v-if="GetUpgradeCost() != false && building.isBuilt && !building.isLeveling" class="cursor-pointer flex w-full" @click="LevelUp">
                    <Icon icon="arrow-outline-up" class="fill-current text-blue-400 w-4 h-4 mr-2" />
                    <Materials :materials="GetUpgradeCost()" :isWidget="true" />
                </div>
            </div>
        </div>

        <div class="building__actions">
            <button v-if="building.isProducing && building.isBuilt && !building.isLeveling" @click="StopProduction">Pause production</button>
            <button v-if="!building.isProducing && building.isBuilt && !building.isLeveling" @click="StartProduction">Resume production</button>
        </div>

        <div class="building__status" v-if="!building.isBuilt">
            Building...
            <div class="progress progress--build" :style="`width: ${ PercentBuilt }%`">{{ PercentBuilt }}%</div>
        </div>
        <div class="building__status" v-if="building.isBuilt && building.isLeveling">
            Leveling up...
            <div class="progress progress--level" :style="`width: ${ PercentLevelUp }%`">{{ PercentLevelUp }}%</div>
        </div>
        <div class="building__status" v-if="building.isBuilt && !building.isLeveling && !building.isProducing">
            Waiting...
        </div>
        <div class="building__status" v-if="building.isBuilt && !building.isLeveling && building.isProducing">
            <div
                class="text-left font-bold text-xs flex"
                v-for="material in Object.keys(building.stats.grow)"
                :key="`material-grow-${ material }-${ building.id }`"
            >
                <div class="w-1/12">
                    <img :src="`/assets/icons/materials/${ material }.png`" />
                    {{ building.stats.grow[material].amount }}
                </div>
                <div class="w-11/12">
                    <div class="progress progress--produce" :style="`width: ${ PercentProduce(material) }%`">{{ PercentProduce(material) }}%</div>
                </div>
                
            </div>
        </div>

        
    </div>

</template>

<script>
export default {
    props: {
        building: { type: Object, default: () => { return {} } }
    },

    computed: {
        PercentBuilt(){
            let now = this.building.now
            let buildStartTime = this.building.buildStartTime
            let buildTime = this.building.stats.build.time * 1000

            let currentBuildTime = now - buildStartTime

            return Math.floor((currentBuildTime / buildTime) * 100)
        },

        PercentLevelUp(){
            if(typeof this.building.stats.levels[this.building.level - 1] === 'undefined') return 0

            let now = this.building.now
            let levelStartTime = this.building.lastLevelUpTime
            let levelTime = this.building.stats.levels[this.building.level - 1].time * 1000

            let currentLevelTime = now - levelStartTime

            return Math.floor((currentLevelTime / levelTime) * 100)
        }
    },

    async mounted(){
        this.socket = await this.$io.Connect()
    },
    
    methods: {
        PercentProduce(type){
            let now = this.building.now
            let lastProduceTime = this.building.lastProduceTime[type]

            let produceTime = this.building.stats.grow[type].time * 1000

            let currentProduceTime = now - lastProduceTime

            return Math.floor((currentProduceTime / produceTime) * 100)
        },

        GetUpgradeCost(){
            if(typeof this.building.stats.levels[this.building.level - 1] === 'undefined') return false
            return this.building.stats.levels[this.building.level - 1].cost
        },
        
        LevelUp(){
            this.socket.emit('player.input', {
                type: 'building.level.add',
                data: { 
                    amount: 1,
                    buildingId: this.building.id
                }
            })
        },

        StopProduction(){
            this.socket.emit('player.input', {
                type: 'building.production.stop',
                data: { 
                    buildingId: this.building.id
                }
            })
        },

        StartProduction(){
            this.socket.emit('player.input', {
                type: 'building.production.start',
                data: { 
                    buildingId: this.building.id
                }
            })
        }
    }
}
</script>

<style lang="scss">

.building {
    @apply bg-blue-500;
    @apply bg-opacity-25;
    @apply text-blue-400;

    @apply shadow-xl;

    padding: 10px;
    border-radius: 4px;

    &__label {
        @apply text-lg;
        @apply font-bold;
        // @apply bg-blue-800;
        @apply text-blue-400;
        

        &-content {
           
            &--mini {
                @apply text-xs;
                @apply font-normal;
            }
        }
    }

    &__status {
        @apply px-2;
        @apply text-center;
        @apply font-bold;

        img {
            @apply inline-block;
            @apply mr-1;
            
            width: 16px;
            height: 16px;
            object-fit: contain;
            object-position: center center;
        }
    }

    &__actions {
        // @apply bg-blue-600;
        @apply px-1 pb-1;
        @apply text-right;

        button {
            @apply text-xs;
            @apply px-1;
            // @apply bg-blue-400;
            @apply font-bold;
        }
    }
}


.progress {
    @apply text-xs;
    @apply font-bold;
    @apply text-black;
    @apply text-left;
    @apply pl-1;

    &--build {
        @apply bg-green-600;
    }

    &--level {
        @apply bg-red-500;
    }

    &--produce {
        @apply bg-orange-400;
    }
}
</style>