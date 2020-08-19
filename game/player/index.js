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
    KeyboardEventTypes
} from 'babylonjs'

export default class Player {
    constructor({ game, data, socket }){
        this.game = game
        this.data = data
        this.socket = socket

        this.mesh = new AbstractMesh(`player-${ this.data.id }`, this.game.scene)
        this.mesh.position = new Vector3(this.data.position.x, this.data.position.y, this.data.position.z)
        this.game.skybox.position = this.mesh.position
        this.game.camera.parent = this.mesh
        this.lastStepTime = Date.now()

        this.game.scene.onPointerObservable.add((e) => {
            this.socket.emit('player.input', {
                type: 'pointer',
                data: {
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
            })
        })

        this.game.scene.onKeyboardObservable.add((e) => {
            this.socket.emit('player.input', {
                type: 'keyboard',
                data: {
                    type: e.type,
                    key: e.event.key
                }
            })
        })

        this.targetPosition = this.mesh.position.clone()
        this.targetRotationQuaternion = new Quaternion()

    }

    SetPosition(position){
        this.targetPosition = new Vector3(position.x, position.y, position.z)
        // this.mesh.position.x = position.x
        // this.mesh.position.y = position.y
        // this.mesh.position.z = position.z
    }

    SetRotationQuaternion(rotationQuaternion){
        if(rotationQuaternion == null) return
        if(this.mesh.rotationQuaternion == null) {
            this.mesh.rotationQuaternion = new Quaternion()
        }

        this.targetRotationQuaternion = new Quaternion(
            rotationQuaternion.x,
            rotationQuaternion.y,
            rotationQuaternion.z,
            rotationQuaternion.w,
        )

        // this.mesh.rotationQuaternion.x = rotationQuaternion.x
        // this.mesh.rotationQuaternion.y = rotationQuaternion.y
        // this.mesh.rotationQuaternion.z = rotationQuaternion.z
        // this.mesh.rotationQuaternion.w = rotationQuaternion.w
    }

    Update(){
        const now = Date.now()
        const dt = (now - this.lastStepTime) / 1000
        
        this.mesh.position = Vector3.Lerp(this.mesh.position, this.targetPosition, 0.01)
        if(this.mesh.rotationQuaternion == null){
            this.mesh.rotationQuaternion = new Quaternion()
        }
        this.mesh.rotationQuaternion = Quaternion.Slerp(this.mesh.rotationQuaternion, this.targetRotationQuaternion, 0.01)

        this.lastStepTime = Date.now()
    }

    
}