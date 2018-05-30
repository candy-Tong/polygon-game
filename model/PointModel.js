import {BaseModel} from './BaseModel.js'

class PointModel extends BaseModel {
    constructor( {x, y, r = 25}) {
        super()
        this.x = parseInt(x)
        this.y = parseInt(y)
        this.r = parseInt(r)
    }

    modify({x, y, r} ) {
        this.x = parseInt(x)
        this.y = parseInt(y)
        this.r = parseInt(r)
    }

    remove() {
        this.redraw('delete')
    }
}

export {PointModel}