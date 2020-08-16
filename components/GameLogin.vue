<template>
    <div class="gamelogin">
        <form @submit.prevent="Join" v-if="!isJoining">
            <div>
                <label for="username">Username</label>
                <input name="username" class="border border-teal-500" type="text" v-model="username">
            </div>

            <button>Join</button>
        </form>
        <div v-if="isJoining">Joining... please wait</div>
    </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
    props: {
        config: { type: Object, default: () => { return {} } }
    },

    data(){
        return {
            username: 'anonymous',
            userId: nanoid(),
            isJoining: false,

        }
    },

    computed: {
        
    },

    async mounted(){
        this.socket = await this.$io.Connect()
    },

    methods: {
        async Join(){
            this.isJoining = true

            this.socket.emit('player.join', { username: this.username, userId: this.userId }, (player) => {
                this.isJoining = false
                this.$emit('joined')  
            })
        }
    }
}
</script>

<style lang="scss">

</style>