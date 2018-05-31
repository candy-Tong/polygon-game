import {BaseModel} from './BaseModel.js'

class PointModel extends BaseModel {
    constructor({x, y, r = 35}) {
        super()
        this.x = parseInt(x)
        this.y = parseInt(y)
        this.r = parseInt(r)
        this.isSelected = false
    }

    modify({x, y, r}) {
        x ? this.x = parseInt(x) : false
        y ? this.y = parseInt(y) : false
        r ? this.r = parseInt(r) : false
    }

    remove() {
        this.redraw('delete')
    }

    select() {
        this.isSelected = true
    }

    clearSelect() {
        this.isSelected = false
    }
}

export {PointModel}