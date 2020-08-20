import { 
    Scene, 
    Engine, 
    TargetCamera, 
    Vector3, 
    HemisphericLight, 
    MeshBuilder, 
    StandardMaterial, 
    CubeTexture, 
    Texture,
    AbstractMesh,
    Axis,
    Quaternion,
    Space,
    KeyboardEventTypes,
    Mesh
} from 'babylonjs'

export default class Player {
    constructor({ game, data, socket }){
        this.game = game
        this.data = data
        this.socket = socket

        this.mesh = new AbstractMesh(`player-${ this.data.id }`, this.game.scene)
        this.arrow = MeshBuilder.CreateCylinder('test', { height: 2, diameterTop: 0, diameterBottom: 0.5 }, this.game.scene)
        this.arrow.rotation.x = Math.PI * 0.5
        this.arrow.bakeCurrentTransformIntoVertices()
        this.arrow.parent = this.mesh
        this.arrow.position = new Vector3(0, -5, 20)
        
        this.mesh.position = new Vector3(this.data.position.x, this.data.position.y, this.data.position.z)
        this.game.skybox.position = this.mesh.position
        this.game.camera.parent = this.mesh

        this.lastStepTime = Date.now()

        this.inputs = {
            keyboard: {},
            pointer: {}
        }

        this.game.scene.onPointerObservable.add((e) => {
            const pointerData = {
                type: e.type,
                eventType: e.event.type,
                button: e.event.button,
                x: e.event.clientX,
                y: e.event.clientY,
                canvas: {
                    width: this.game.$refs.canvas.width,
                    height: this.game.$refs.canvas.height
                }
            }

            if(JSON.stringify(pointerData) == JSON.stringify(this.inputs.pointer)) return 

            this.socket.emit('player.input', {
                type: 'pointer',
                data: pointerData
            })

            this.inputs.pointer = pointerData
        })

        this.game.scene.onKeyboardObservable.add((e) => {
            const keyboardData = {
                type: e.type,
                key: e.event.key
            }

            if(JSON.stringify(keyboardData) == JSON.stringify(this.inputs.keyboard)) return 

            this.socket.emit('player.input', {
                type: 'keyboard',
                data: keyboardData
            })

            this.inputs.keyboard = keyboardData
        })

        this.targetPosition = this.mesh.position.clone()
        this.targetRotationQuaternion = new Quaternion()

        this.navigationTarget = this.GetNearestPlanetPosition()
    }

    GetNearestPlanet(){
        const nearestPlanet = this.game.planets.find((planet) => {
            return true
        })

        return nearestPlanet
    }

    GetNearestPlanetPosition(){
        const planet = this.GetNearestPlanet()
        return planet.mesh.position 
    }

    SetPosition(position){
        this.targetPosition = new Vector3(position.x, position.y, position.z)
     }

    SetRotationQuaternion(rotationQuaternion){
        if(rotationQuaternion == null) return
        if(this.mesh.rotationQuaternion == null) {
            this.mesh.rotationQuaternion = new Quaternion()
        }

        const precision = 100000

        this.targetRotationQuaternion = new Quaternion(
            Math.round(rotationQuaternion.x * precision) / precision,
            Math.round(rotationQuaternion.y * precision) / precision,
            Math.round(rotationQuaternion.z * precision) / precision,
            Math.round(rotationQuaternion.w * precision) / precision,
        )
    }

    Update(){
        const now = Date.now()
        const dt = (now - this.lastStepTime) / 1000
        
        this.mesh.position = Vector3.Lerp(this.mesh.position, this.targetPosition, 0.05)
        this.arrow.lookAt(this.navigationTarget, 0, 0, 0, Space.WORLD)
        this.game.skybox.position = this.mesh.position
        
        if(this.mesh.rotationQuaternion == null) this.mesh.rotationQuaternion = new Quaternion()
        const newRotationQuaternion = Quaternion.Slerp(this.mesh.rotationQuaternion, this.targetRotationQuaternion, 0.025)
        this.mesh.rotationQuaternion = newRotationQuaternion
        
        this.lastStepTime = Date.now()
    }

    
}