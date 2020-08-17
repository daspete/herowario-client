<template>
    <div class="game">
        <client-only>
            <GameLogin v-if="!joined && !gameOver" :config="config" @joined="OnJoined" />

            <GameView v-if="joined && !gameOver" :config="config" />
        </client-only>
    </div>
</template>

<script>
export default {
    data(){
        return {
            joined: false,
            gameOver: false,
            config: {},
            // inputManager: this.$inputManager
        }
    },

    async mounted(){
        this.socket = await this.$io.Connect()
        this.socket.emit('game.config', (gameConfig) => {
            this.config = gameConfig
            this.$store.commit('config/SetConfig', gameConfig)
        })
    },

    beforeDestroy(){
        // this.$inputManager.Stop()
    },

    methods: {
        OnJoined(){
            this.joined = true
            this.Start()
        },

        async Start(){
            // this.$inputManager.SetInputMap({
            //     setTargetPosition: {
            //         mouse: ['right'],
            //         handler: () => {
            //             this.socket.emit('player.input', {
            //                 type: 'set.target.position', 
            //                 data: {
            //                     x: this.inputManager.input.mouse.x,
            //                     y: this.inputManager.input.mouse.y
            //                 }
            //             })
            //         }
            //     }
            // })

            // this.$inputManager.Start(this)
        },
    }
}
</script>

<style lang="scss">

.game {
    @apply w-screen;
    @apply h-screen;
    @apply bg-green-900;
}

</style>