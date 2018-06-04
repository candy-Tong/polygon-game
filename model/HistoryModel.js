import {PointModel} from './PointModel.js'

class HistoryModel {
    constructor() {
        this.history = []
        this.presentPointList = []
        this.presentLineList = []
    }

    randomPoint() {

    }

    addPoint(view, model) {
        this.presentPointList.push({view, model})
    }

    modifyPoint(view, model) {
        return
    }

    saveStatus(record) {
        console.log(record)
        // save
        let json = JSON.stringify(record)
        this.history.push(json)
        console.log(this.history)
    }


    // go back to last n time operation
    goback(step) {
        if (step >= this.history.length) {
            this.history = [this.history[0]]
            return JSON.parse(this.history[0])
        }
        this.history = this.history.slice(0, -step)
        return JSON.parse(this.history[this.history.length - 1])
    }


}

export {HistoryModel}