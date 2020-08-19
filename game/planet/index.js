import { Mesh, Vector3 } from 'babylonjs'

export default class Planet {
    constructor({ game, data }){
        this.game = game
        this.data = data

        this.mesh = Mesh.CreateSphere(`planet-${ this.data.id }`, 16, 20, this.game.scene)
        this.mesh.game = this.game
        this.mesh.position = data.position
    }
}