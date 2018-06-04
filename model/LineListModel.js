import {BaseListModel} from './BaseListModel.js'
import {LineView} from '../view/LineView.js'
import {LineModel} from './LineModel.js'

class LineListModel extends BaseListModel {
    constructor() {
        super()
        this.list = []
        this.linkingLine = null
    }

    add(dom) {
        let x = dom.getAttribute('cx') || dom.getAttribute('x')
        let y = dom.getAttribute('cy') || dom.getAttribute('y')
        x = parseInt(x)
        y = parseInt(y)
        let lineView = new LineView({x, y})
        let lineModel = new LineModel({x, y})
        this.linkingLine = {lineView, lineModel}
        this.list.push({lineView, lineModel})
    }

    addByPoint(begin, end,operation) {
        let lineView = new LineView({x: parseInt(begin.x), y: parseInt(begin.y)}, {
            x: parseInt(end.x),
            y: parseInt(end.y)
        },operation)
        let lineModel = new LineModel({x: parseInt(begin.x), y: parseInt(begin.y)}, {
            x: parseInt(end.x),
            y: parseInt(end.y)
        },operation)
        this.linkingLine = {lineView, lineModel}
        this.list.push({lineView, lineModel})
    }

    end(dom) {
        // 如果两点间已存在直线，停止该操作，并删除直线
        let {lineView, lineModel} = this.getLinkingLine()
        let x = dom.getAttribute('cx') || dom.getAttribute('x')
        let y = dom.getAttribute('cy') || dom.getAttribute('y')
        x = parseInt(x)
        y = parseInt(y)
        if ((lineModel.begin.x === x && lineModel.begin.y === y)
            || (this.find(lineModel.begin, {x, y}))
            || this.find(lineModel.begin).length > 2
        ) {
            this.delete()
        } else {
            lineView.modify(lineModel.begin, {x, y})
            lineModel.modify(lineModel.begin, {x, y})
        }
        this.linkingLine = null
    }

    /**
     * 根据起点终点位置查找  LineView 和 LineModel 实例
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {*}
     */
    find({x: x1, y: y1} = {}, {x: x2, y: y2} = {}) {
        x1 = parseInt(x1)
        y1 = parseInt(y1)
        x2 = parseInt(x2)
        y2 = parseInt(y2)
        if (arguments.length === 1) {
            return this.list.filter(function (line) {
                // console.log(line.lineModel.begin.x === x1 && line.lineModel.begin.y === y1)
                return line.lineModel.begin.x === x1 && line.lineModel.begin.y === y1
            }).concat(this.list.filter(function (line) {
                // console.log( line.lineModel.end.x === x1 && line.lineModel.end.y === y1)
                return line.lineModel.end.x === x1 && line.lineModel.end.y === y1
            }))
        } else if (arguments.length === 2) {
            return this.list.find(function (line) {
                return (line.lineModel.begin.x === x1 && line.lineModel.begin.y === y1 && line.lineModel.end.x === x2 && line.lineModel.end.y === y2)
                    || (line.lineModel.end.x === x1 && line.lineModel.end.y === y1 && line.lineModel.begin.x === x2 && line.lineModel.begin.y === y2)
            })

        } else {
            throw new Error('error argument num in ' + arguments.callee().name)
        }
    }

    findByOperationDom(dom) {
        return this.list.find(function (line) {
            // console.log(line.lineModel.begin.x === x1 && line.lineModel.begin.y === y1)
            return line.lineView.operationDom === dom
        })
    }

    findSelected() {
        return this.list.find(function (line) {
            // console.log(line.lineModel.begin.x === x1 && line.lineModel.begin.y === y1)
            return line.lineModel.isSelected === true
        })
    }

    clearAllSelect() {
        this.list.forEach(function (line) {
            line.lineView.clearSelect()
            line.lineModel.clearSelect()
        })
    }


    getLinkingLine() {
        return this.linkingLine
    }

    delete(line) {
        this.linkingLine = null
        let index = this.list.findIndex(function (value) {
            return value === line
        })
        this.list.splice(index, 1)
        console.log('delete')
        console.log(this.list)
        line.lineView.delete()
    }

    getAnotherLine(point, begin, end) {
        let lines = this.find({x: parseInt(point.x), y: parseInt(point.y)})
        return lines.find(function (line) {
            console.log((line.lineModel.begin.x !== begin.x && line.lineModel.begin.y !== begin.y && line.lineModel.end.x !== end.x && line.lineModel.end.y !== end.y))
            console.log((line.lineModel.begin.x !== end.x && line.lineModel.begin.y !== end.y && line.lineModel.end.x !== begin.x && line.lineModel.end.y !== begin.y))
            return (line.lineModel.begin.x !== begin.x || line.lineModel.begin.y !== begin.y || line.lineModel.end.x !== end.x || line.lineModel.end.y !== end.y) &&
                (line.lineModel.begin.x !== end.x || line.lineModel.begin.y !== end.y || line.lineModel.end.x !== begin.x || line.lineModel.end.y !== begin.y)
        })
    }
}

export {LineListModel}