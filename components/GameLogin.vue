<template>
    <div class="gamelogin">
        <div class="gamelogin__window">
            <ContentContainer title="Join HeroWarIO">
                <form @submit.prevent="Join" v-if="!isJoining">
                    <div class="text-center">
                        <label for="username">Username</label>
                        <input name="username" class="border border-teal-500 text-black" type="text" v-model="username">
                        <button class="px-2 py-1 bg-white text-black">Join</button>
                    </div>

                    
                </form>
                <div v-if="isJoining">Joining... please wait</div>
            </ContentContainer>
            
        </div>
        

        <div class="game__devinfo">
            Hi folks! This is a dev-preview of a space harvest and defense game. 
            Goal of this game is to collect many resources from different planets, 
            to generate other materials from these resources, and to build more ships, 
            defense towers or attack robots from it. 

            At the moment, you can just fly through space. There is a pinned planet, which will be your home planet.
            <br><br>
            <b>Controls: </b><br>
            WSAD -> forward. backward, left, right<br>
            SHIFT -> up<br>
            CONTROL -> down<br>
            Mouse Move -> look around (keep the mouse in the middle to steer forward)
        </div>
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
.gamelogin {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &__window {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 320px;
        height: 200px;
        margin-top: -100px;
        margin-left: -160px;
    }
}

.game__devinfo {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(white, 0.2);
    border-top: 1px solid white;
    padding: 10px;
    color: white;
    pointer-events: none;
}
</style>