import {BaseModel} from './BaseModel.js'

class LineModel extends BaseModel {
    constructor(begin = {}, end = {}, operation = '+', id) {
        super()
        this.begin = {
            x: parseInt(begin.x),
            y: parseInt((begin.y))
        }
        this.end = {
            x: parseInt(end.x),
            y: parseInt((end.y))
        }
        this.operation = operation
        this.isSelected = false
        id ? this.id = id : this.id = LineModel.id++
    }

    select() {
        this.isSelected = true
    }

    clearSelect() {
        this.isSelected = false
    }

    modify(begin = {}, end = {}, operation) {
        begin ? this.begin = {
            x: parseInt(begin.x),
            y: parseInt((begin.y))
        } : false
        end ? this.end = {
            x: parseInt(end.x),
            y: parseInt((end.y))
        } : false
        operation ? this.operation = operation : false
    }

    getAnotherPosition({x, y}) {
        x = parseInt(x)
        y = parseInt(y)
        if (this.begin.x === x && this.begin.y === y) {
            return this.end
        } else if (this.end.x === x && this.end.y === y) {
            return this.begin
        } else {
            throw new Error('can not find another position in ' + arguments.callee().name)
        }
    }

    export() {
        return {
            point: [
                {x: this.begin.x, y: this.begin.y},
                {x: this.end.x, y: this.end.y}
            ],
            operation: this.operation,
            id: this.id
        }
    }

    static import(obj) {
        return new LineModel(obj.point[0], obj.point[1], obj.operation, obj.id)
    }
}

LineModel.id = 0
export {LineModel}