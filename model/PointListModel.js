import {BaseListModel} from './BaseListModel.js'
import {PointModel} from './PointModel.js'
import {PointView} from '../view/PointView.js'

class PointListModel extends BaseListModel {
    constructor() {
        super()
        this.list = []
    }

    add({x, y, r}) {
        let pointView = new PointView({x, y, r})
        let pointModel = new PointModel({x, y, r})
        this.list.push({view: pointView, model: pointModel})
        return {pointView, pointModel}
    }

    find({x, y}) {
        x = parseInt(x)
        y = parseInt(y)
        let obj = this.list.find(function (point) {
            return point.model.x === x && point.model.y === y
        })
        return obj ? obj : {}
    }

    findSelected(){
        return this.list.find(function (point) {
            return point.model.isSelected===true
        })
    }

    delete(point) {
        let index = this.list.findIndex(function (value) {
            return value === point
        })
        this.list.splice(index, 1)
        console.log('delete')
        console.log(this.list)
        point.view.delete()
    }

    clearAllSelect() {
        this.list.forEach(function (point) {
            point.view.clearSelect()
            point.model.clearSelect()
        })
    }
}

// let pointListModel=new PointListModel()
export {PointListModel}