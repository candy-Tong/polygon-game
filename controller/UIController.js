import {BaseController} from './BaseController.js'
import {HistoryModel} from '../model/HistoryModel.js'
import {PointListModel} from '../model/PointListModel.js'
import {LineListModel} from '../model/LineListModel.js'

class UIController extends BaseController {
    constructor() {
        super()
        this.history = new HistoryModel()
        this.pointList = new PointListModel()
        this.lineList = new LineListModel()
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
        this.updatePointSizeArguments = {
            selectDom: null,
            baseX: undefined,
            baseR:undefined
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
            } else if (e.target.className.baseVal === 'point') {
                if (e.button === 0) {
                    // 修改点的值
                    this.action = 'updatePointSize'
                    this.updatePointSizeBegin(e.target,e.offsetX)
                } else if (e.button === 2) {
                    // 连线
                    this.action = 'addLine'
                    this.addLineBegin(e)
                }
            }else if(e.target.nodeName==='line'){
                if (e.button === 0) {
                    let x1=e.target.getAttribute('x1')
                    let y1=e.target.getAttribute('y1')
                    let x2=e.target.getAttribute('x2')
                    let y2=e.target.getAttribute('y2')
                    this.updateLineOperation({x1,y1},{x2,y2})
                } else if (e.button === 2) {

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
                case 'updatePointSize':{
                    this.updatePointSizeMove(e.offsetX)
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
            let newX = e.clientX - this.moveArguments.offset_x
            let newY = e.clientY - this.moveArguments.offset_y
            let {view: pointView, model: pointModel} = this.pointList.find({
                x:this.moveArguments.moveElement.getAttribute('cx'),
                y:this.moveArguments.moveElement.getAttribute('cy')
            })
            let lineList = this.lineList.find({x: pointModel.x, y: pointModel.y})
            lineList.forEach(function ({lineView, lineModel}) {
                let anotherPosition = lineModel.getAnotherPosition({x: pointModel.x, y: pointModel.y})
                lineView.modify(anotherPosition, {x: newX, y: newY})
                lineModel.modify(anotherPosition, {x: newX, y: newY})
            })
            pointView.modify({x: newX, y: newY})
            pointModel.modify({x: newX, y: newY})
        }
    }

    movePointEnd() {
        let {view: pointView, model: pointModel} = this.pointList.find({
            x:this.moveArguments.moveElement.getAttribute('cx'),
            y:this.moveArguments.moveElement.getAttribute('cy')
        })
        // this.history.saveStatus('modify', {pointView, pointModel})
        this.moveArguments.moveElement = null
    }

    addLineBegin(e) {
        this.lineArgument.beginDom = e.target
        this.lineList.add(e.target)

    }

    addLineMove(e) {
        // console.log({x: e.offsetX, y: e.offsetY})
        if (this.lineArgument.beginDom) {
            let {lineView, lineModel} = this.lineList.getLinkingLine()
            lineView.modify(lineModel.begin, {x: e.offsetX, y: e.offsetY})
            lineModel.modify(lineModel.begin, {x: e.offsetX, y: e.offsetY})
        }

    }

    addLineEnd(e) {
        if (e.target.nodeName === 'circle' || e.target.nodeName === 'text') {
            this.lineList.end(e.target)
        } else {
            this.lineList.delete()
        }
    }

    updatePointSizeBegin(dom, x) {
        this.updatePointSizeArguments.selectDom = dom
        this.updatePointSizeArguments.baseX = x
        let {model: pointModel} = this.pointList.find({
            x:this.updatePointSizeArguments.selectDom .getAttribute('x'),
            y:this.updatePointSizeArguments.selectDom .getAttribute('y')
        })
        this.updatePointSizeArguments.baseR=pointModel.r
    }
    updatePointSizeMove(x){
        let {view: pointView, model: pointModel} = this.pointList.find({
            x:this.updatePointSizeArguments.selectDom .getAttribute('x'),
            y:this.updatePointSizeArguments.selectDom .getAttribute('y')
        })
        let increaseR=parseInt((x-this.updatePointSizeArguments.baseX)/10)
        pointView.modify({r:this.updatePointSizeArguments.baseR+increaseR})
        pointModel.modify({r:this.updatePointSizeArguments.baseR+increaseR})
    }
    updatePointSizeEnd(){
        this.updatePointSizeArguments.selectDom = null
        this.updatePointSizeArguments.baseX = undefined
        this.updatePointSizeArguments.baseR = undefined
    }
    updateLineOperation({x1,y1},{x2,y2}){
        let {lineView,lineModel} = this.lineList.find({x:x1,y:y1},{x:x2,y:y2})
        let operation=lineModel.operation==='+'?'×':'+'
        lineView.modify(null,null,operation)
        lineModel.modify(null,null,operation)

    }
}

export {UIController}