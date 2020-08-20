<template>
    <div class="spaceview">
        <canvas ref="canvas"></canvas>

        <div class="hud">
            <div>x: {{ Math.round(player.position.x) }}</div>
            <div>y: {{ Math.round(player.position.y) }}</div>
            <div>z: {{ Math.round(player.position.z) }}</div>
            
            <div v-if="GetPlayerEntity()">{{ GetPlayerEntity().navigationTarget }}</div>
        </div>

        <div class="crosshair">
            <div class="line line--horizontal"></div>
            <div class="line line--vertical"></div>
        </div>
    </div>
</template>

<script>
import { 
    Scene, 
    Engine, 
    TargetCamera, 
    Vector3, 
    HemisphericLight, 
    MeshBuilder, 
    StandardMaterial, 
    CubeTexture, 
    Texture 
} from 'babylonjs'

import Planet from '~/game/planet'
import Player from '~/game/player'

export default {
    props: {
        player: { type: Object, default: () => { return {} } },
    },

    data(){
        return {
            
        }
    },

    watch: {
        'player.position'(value){
            this.playerEntity.SetPosition(value)
            // this.camera.position = new Vector3(value.x, value.y, value.z)
        },
        'player.rotationQuaternion'(value){
            this.playerEntity.SetRotationQuaternion(value)
        }
    },

    async mounted(){
        this.engine = null
        this.scene = null
        this.camera = null
        this.light = null
        this.skybox = null
        this.playerEntity = null

        this.planets = []

        this.socket = await this.$io.Connect()
        this.socket.emit('planets', (planets) => {
            this.CreateRenderer()
            this.CreatePlanets(planets)
            this.CreatePlayerEntity()

            this.Update = this.Update.bind(this)
            this.engine.runRenderLoop(this.Update)
        })
    },

    async beforeDestroy(){
        if(this.engine) this.engine.stopRenderLoop(this.Update)
    },

    methods: {
        GetPlayerEntity(){
            if(!this.playerEntity) return false
            return this.playerEntity
        },
        CreateRenderer(){
            this.engine = new Engine(this.$refs.canvas, true)
            this.scene = new Scene(this.engine)
            this.camera = new TargetCamera('Camera', Vector3.Zero(), this.scene)
            // this.camera.attachControl(this.$refs.canvas)
            this.light = new HemisphericLight('Light', new Vector3(0, 1, 0), this.scene)
            this.skybox = MeshBuilder.CreateBox('skybox', { size: 10000 }, this.scene)

            const skyboxMaterial = new StandardMaterial('skybox', this.scene)
            skyboxMaterial.backFaceCulling = false
            skyboxMaterial.reflectionTexture = new CubeTexture.CreateFromImages([
                '/assets/skyboxes/space/space_left.jpg',
                '/assets/skyboxes/space/space_up.jpg',
                '/assets/skyboxes/space/space_front.jpg',
                '/assets/skyboxes/space/space_right.jpg',
                '/assets/skyboxes/space/space_down.jpg',
                '/assets/skyboxes/space/space_back.jpg',
            ], this.scene)
            skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
            skyboxMaterial.disableLighting = true
            this.skybox.material = skyboxMaterial
        },

        CreatePlanets(planets){
            for(let i = 0; i < planets.length; i++){
                this.planets.push(new Planet({ game: this, data: planets[i] }))
            }
        },

        CreatePlayerEntity(){
            this.playerEntity = new Player({
                socket: this.socket,
                game: this,
                data: this.player
            })
        },

        async Update(){
            const dt = this.engine.getDeltaTime()

            this.playerEntity.Update(dt)

            this.scene.render()
        }
    }
}
</script>

<style lang="scss">
.spaceview {
    position: absolute;
    width: 100vw;
    height: 100vh;

    canvas {
        width: 100%;
        height: 100%;
        touch-action: none;
    }
}

.hud {
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    height: 100vh;
    border: 1px solid white;
    background-color: rgba(white, 0.1);
    color: white;
    font-size: 10px;
}

.crosshair {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10vw;
    height: 10vh;
    margin-left: -5vw;
    margin-top: -5vh;
    pointer-events: none;
}

.line {
    position: absolute;
    background-color: white;
    pointer-events: none;

    &--horizontal {
        top: 50%;
        width: 100%;
        height: 1px;
    }

    &--vertical {
        left: 50%;
        height: 100%;
        width: 1px;
    }
}
</style>