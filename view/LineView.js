import {BaseView} from './BaseView.js'

class LineView extends BaseView {
    constructor(point1 = {}, point2 = {}, operation = '+') {
        super()
        this.init(point1, point2, operation)
    }

    init(point1, point2, operation) {
        let svg = document.getElementById('board')
        this.dom = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        this.dom.setAttribute('id', LineView.id++)
        this.dom.setAttribute('x1', point1.x)
        this.dom.setAttribute('y1', point1.y)
        this.dom.setAttribute('x2', point1.x)
        this.dom.setAttribute('y2', point1.y)
        if (operation === '+') {
            this.dom.setAttribute('stroke', '#10ac84')
        } else if (operation === '×') {
            this.dom.setAttribute('stroke', '#2c3e50')
        }
        // this.dom.setAttribute('opacity', 0.5)
        this.dom.setAttribute('style', 'stroke-width: 5px')
        this.operationDom = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        this.operationDom.setAttribute('x', point1.x)
        this.operationDom.setAttribute('y', point1.y)
        this.operationDom.setAttribute('font-size', 30)
        this.operationDom.setAttribute('font-weight', 900)
        this.operationDom.setAttribute('dy', 8)
        if (operation === '+') {
            this.operationDom.setAttribute('fill', '#ffa502')
        } else if (operation === '×') {
            this.operationDom.setAttribute('fill', '#a4b0be')
        }
        this.operationDom.setAttribute('class', 'operation')
        this.operationDom.setAttribute('text-anchor', 'middle')
        this.operationDom.innerHTML = operation

        svg.insertBefore(this.operationDom, svg.childNodes[0])
        svg.insertBefore(this.dom, svg.childNodes[0])
        // svg.appendChild(this.dom)
    }

    select() {
        this.dom.setAttribute('stroke', '#ff4757')
        this.operationDom.setAttribute('fill', '#ff4757')
    }

    clearSelect() {
        let operation = this.operationDom.innerHTML
        if (operation === '+') {
            this.operationDom.setAttribute('fill', '#ffa502')
            this.dom.setAttribute('stroke', '#10ac84')
        } else if (operation === '×') {
            this.operationDom.setAttribute('fill', '#a4b0be')
            this.dom.setAttribute('stroke', '#70a1ff')
        }
    }

    delete() {
        let svg = document.getElementById('board')
        svg.removeChild(this.dom)
        svg.removeChild(this.operationDom)
    }

    modify(begin, end, operation) {
        if (begin && end) {
            this.dom.setAttribute('x1', begin.x)
            this.dom.setAttribute('y1', begin.y)
            this.dom.setAttribute('x2', end.x)
            this.dom.setAttribute('y2', end.y)
            let offsetX = 0, offsetY = 0
            if (Math.abs(begin.x - end.x) > Math.abs(begin.y - end.y)) {
                offsetY = 30
            } else {
                offsetX = 30
            }

            this.operationDom.setAttribute('x', (begin.x + end.x - offsetX) / 2)
            this.operationDom.setAttribute('y', (begin.y + end.y - offsetY) / 2)
        }
        if (this.dom.getAttribute('stroke') !== '#ff4757') {
            if (operation === '+') {
                this.operationDom.setAttribute('fill', '#eccc68')
                this.dom.setAttribute('stroke', '#10ac84')
            } else if (operation === '×') {
                this.operationDom.setAttribute('fill', '#2c3e50')
                this.dom.setAttribute('stroke', '#70a1ff')
            }
        }
        operation ? this.operationDom.innerHTML = operation : false
        operation ? this.operation = operation : false
    }


}

LineView.id = 0
export {LineView}