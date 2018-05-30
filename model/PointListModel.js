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

    find(dom) {
        let obj = this.list.find(function (value) {
            return value.view.dom === dom
        })
        return obj ? obj : {}
    }
}

// let pointListModel=new PointListModel()
export {PointListModel}