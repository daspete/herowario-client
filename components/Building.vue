<template>
    <div class="building w-1/6">
        <div class="border border-black m-2">
            <div class="text-lg font-bold bg-black text-white">
                {{ building.type }}

                <button class="text-right" v-if="building.isBuilt" @click="LevelUp">{{ building.level }}</button>
            </div>
            <div v-if="!building.isBuilt">
                Building...
                <div class="progress progress--build" :style="`width: ${ PercentBuilt }%`"></div>
            </div>
            <div v-if="building.isBuilt && building.isLeveling">
                Leveling up...
                <div class="progress progress--level" :style="`width: ${ PercentLevelUp }%`"></div>
            </div>
            <div v-if="building.isBuilt && !building.isLeveling && !building.isProducing">
                Waiting...
            </div>
            <div v-if="building.isBuilt && !building.isLeveling && building.isProducing">
                Producing...
                <div
                    v-for="material in Object.keys(building.stats.grow)"
                    :key="`material-grow-${ material }-${ building.id }`"
                >
                    {{ material }}
                    <div class="progress progress--produce" :style="`width: ${ PercentProduce(material) }%`"></div>
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
            let now = this.building.now
            let levelStartTime = this.building.lastLevelUpTime
            let levelTime = this.building.stats.levels[this.building.level].time * 1000

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
        
        LevelUp(){
            this.socket.emit('player.input', {
                type: 'building.level.add',
                data: { 
                    amount: 1,
                    buildingId: this.building.id
                }
            })
        }
    }
}
</script>

<style lang="scss">
.progress {
    height: 4px;
    
    &--build {
        background-color: green;
    }

    &--level {
        background-color: red;
    }

    &--produce {
        background-color: orange;
    }
}
</style>