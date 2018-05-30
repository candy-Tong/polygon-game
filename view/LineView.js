import {BaseView} from './BaseView.js'

class LineView extends BaseView {
    constructor(point1={},point2={},operation='+') {
        super()
        this.init(point1,point2,operation)
    }

    init(point1,point2,operation) {
        let svg = document.getElementById('board')
        this.dom = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        this.dom.setAttribute('id', LineView.id++)
        this.dom.setAttribute('x1', point1.x)
        this.dom.setAttribute('y1', point1.y)
        this.dom.setAttribute('x2', point1.x)
        this.dom.setAttribute('y2', point1.y)
        this.dom.setAttribute('style', 'stroke:rgb(99,99,99);stroke-width: 2px;z-index: -1')
        svg.insertBefore(this.dom,svg.childNodes[0])
        // svg.appendChild(this.dom)
    }

    delete(){
        let svg = document.getElementById('board')
        svg.removeChild(this.dom)
    }

    modify(begin, end,operation) {
        if(begin&&end){
            this.dom.setAttribute('x1', begin.x)
            this.dom.setAttribute('y1', begin.y)
            this.dom.setAttribute('x2', end.x)
            this.dom.setAttribute('y2', end.y)
        }

        operation?this.operation=operation:false
    }


}

LineView.id = 0
export {LineView}