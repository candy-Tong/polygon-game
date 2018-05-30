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

    saveStatus(action, {view, model}) {
        switch (action) {
            case 'addPoint': {
                this.addPoint(view, model)
                break
            }
            case 'modifyPoint': {
                this.modifyPoint()
            }
        }
        // save
        this.history.unshift({
            presentPointList: this.deepCopy(this.presentPointList),
            presentLineList: this.deepCopy(this.presentLineList)
        })
        console.log(this.history)
    }


    // go back to last n time operation
    goback() {
    }

    deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}

export {HistoryModel}