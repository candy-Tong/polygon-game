import {BaseView} from './BaseView.js'

class PointView extends BaseView {
    constructor({x, y, r = 25}) {
        super()


        this.init({x, y, r})

    }

    init({x, y, r}) {
        let svg = document.getElementById('board')
        this.dom = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        this.dom.setAttribute('id', PointView.id++)
        this.dom.setAttribute('cx', x)
        this.dom.setAttribute('cy', y)
        this.dom.setAttribute('r', r)

        svg.appendChild(this.dom)

    }

    modify({x, y, r}) {
        x ? this.dom.setAttribute('cx', x) : false
        y ? this.dom.setAttribute('cy', y) : false
        r ? this.dom.setAttribute('r', r) : false
    }

}

PointView.id = 0
export {PointView}