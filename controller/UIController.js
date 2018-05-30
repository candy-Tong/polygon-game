import {BaseController} from './BaseController.js'
import {HistoryModel} from '../model/HistoryModel.js'
import {PointView} from '../view/PointView.js'
import {PointModel} from '../model/PointModel.js'
import {PointListModel} from '../model/PointListModel.js'
import {LineModel} from '../model/LineModel.js'
import {LineListModel} from '../model/LineListModel.js'

class UIController extends BaseController {
    constructor() {
        super()
        this.history = new HistoryModel()
        this.pointList = new PointListModel()
        this.lineModel = new LineListModel()
        // 私有变量，外部不要使用
        this.action = undefined
        this.moveArguments = {
            moveElement: null,
            offset_x: 0,
            offset_y: 0
        }
        this.lineArgument = {
            beginDom: null,
            endDom: null
        }

        // 事件委托
        document.onmousedown = (e) => {
            if (e.target.nodeName === 'circle') {
                if (e.button === 0) {
                    this.action = 'movePoint'
                    this.movePointBegin(e)
                } else if (e.button === 2) {
                    this.action = 'addLine'
                    this.addLineBegin(e)
                }
            }
        }
        document.onmousemove = (e) => {
            switch (this.action) {
                case 'movePoint': {
                    this.movePoint(e)
                    break
                }
                case 'addLine': {
                    this.addLineMove(e)
                    break
                }

            }
        }
        document.onmouseup = (e) => {
            switch (this.action) {
                case 'movePoint': {
                    this.movePointEnd(e)
                    break
                }
                case 'addLine': {
                    this.addLineEnd(e)
                    break
                }
            }
            this.action = undefined
        }
        document.oncontextmenu = function () {
            return false
        }
    }

    /**
     * 新增一个点
     * @param e 事件对象
     */
    addPoint(e) {
        let {pointView, pointModel} = this.pointList.add({
            x: e.clientX - this.moveArguments.offset_x,
            y: e.clientY - this.moveArguments.offset_y
        })
        // this.history.saveStatus('add', {pointView, pointModel})
    }

    movePointBegin(e) {
        this.moveArguments.moveElement = e.target
        this.moveArguments.offset_x = e.clientX - parseFloat(this.moveArguments.moveElement.getAttribute('cx'))
        this.moveArguments.offset_y = e.clientY - parseFloat(this.moveArguments.moveElement.getAttribute('cy'))

    }

    movePoint(e) {
        if (this.moveArguments.moveElement && this.moveArguments.moveElement.nodeName === 'circle') {
            let newX=e.clientX - this.moveArguments.offset_x
            let newY= e.clientY - this.moveArguments.offset_y
            let {view: pointView, model: pointModel} = this.pointList.find(this.moveArguments.moveElement)
            let lineList = this.lineModel.find({x: pointModel.x, y: pointModel.y})
            lineList.forEach(function ({lineView, lineModel}) {
                let anotherPosition = lineModel.getAnotherPosition({x: pointModel.x, y: pointModel.y})
                lineView.modify(anotherPosition,{x: newX,y: newY})
                lineModel.modify(anotherPosition,{x: newX,y: newY})
            })
            pointView.modify({x: newX,y: newY})
            pointModel.modify({x: newX,y: newY})
        }
    }

    movePointEnd() {
        let {view: pointView, model: pointModel} = this.pointList.find(this.moveArguments.moveElement)
        // this.history.saveStatus('modify', {pointView, pointModel})
        this.moveArguments.moveElement = null
    }

    addLineBegin(e) {
        this.lineArgument.beginDom = e.target
        this.lineModel.add(e.target)

    }

    addLineMove(e) {
        // console.log({x: e.offsetX, y: e.offsetY})
        if (this.lineArgument.beginDom) {
            let {lineView, lineModel} = this.lineModel.getLinkingLine()
            lineView.modify(lineModel.begin, {x: e.offsetX, y: e.offsetY})
            lineModel.modify(lineModel.begin, {x: e.offsetX, y: e.offsetY})
        }

    }

    addLineEnd(e) {
        if (e.target.nodeName !== 'circle') {
            this.lineModel.delete()
        } else {
            this.lineModel.end(e.target)
        }
    }
}

export {UIController}