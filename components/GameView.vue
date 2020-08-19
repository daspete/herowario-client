<template>
    <div class="gameview">
        <!-- <Materials :materials="me.materials" />
        <BuildingMenu @build="BuildBuilding" :player="me" />
        <Buildings :buildings="me.buildings" /> -->
        <!-- <ContentContainer>
            <Materials :materials="me.materials" />
        </ContentContainer> -->
        <SpaceView v-if="me.id" :player="me" />
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, default: () => { return {} } }
    },

    data(){
        return {
            me: {},
            others: {},
            planets: []
        }
    },

    async mounted(){
        this.socket = await this.$io.Connect()
        
        this.socket.on('game.update', (data) => {
            this.me = data.me
            this.others = data.others
        })
        
    },

    methods: {
        BuildBuilding(type){
            this.socket.emit('player.input', {
                type: 'building.add',
                data: { type }
            })
        }
    }
}
</script>

<style lang="scss">
.gameview {
    
}




</style>