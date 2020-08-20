import { Mesh, Vector3 } from 'babylonjs'

export default class Planet {
    constructor({ game, data }){
        this.game = game
        this.data = data
        this.stats = data.stats

        this.mesh = Mesh.CreateSphere(`planet-${ this.data.id }`, 16, this.stats.size, this.game.scene)
        this.mesh.game = this.game
        this.mesh.position = new Vector3(data.position.x, data.position.y, data.position.z)
    }
}