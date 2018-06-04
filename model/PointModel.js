import {BaseModel} from './BaseModel.js'

class PointModel extends BaseModel {
    constructor({x, y, r = 5}) {
        super()
        this.x = parseInt(x)
        this.y = parseInt(y)
        this.r = parseInt(r)
        this.isSelected = false
    }

    modify({x, y, r}) {
        if (x||x===0) {
            // if (x - this.r < 0) {
            //     x = this.r
            // } else if (x + this.r > conf.width) {
            //     x = conf.width - this.r
            // }
            this.x = parseInt(x)
        }
        if (y||y===0) {
            // if (y - this.r < 0) {
            //     y = this.r
            // } else if (y + this.r > conf.height) {
            //     y = conf.height - this.r
            // }
            this.y = parseInt(y)
        }
        r||r===0 ? this.r = parseInt(r) : false
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