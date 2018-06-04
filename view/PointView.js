import {BaseView} from './BaseView.js'

class PointView extends BaseView {
    constructor({x, y, r = 5}) {
        super()


        this.init({x, y, r})

    }

    init({x, y, r}) {
        let svg = document.getElementById('board')
        this.dom = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        this.dom.setAttribute('id', PointView.id++)
        this.dom.setAttribute('cx', x)
        this.dom.setAttribute('cy', y)
        let R = Math.sqrt(r / 3) * 8
        R < 20 ? R = 20 : false
        R > 60 ? R = 60 : false

        this.dom.setAttribute('r', R)
        this.dom.setAttribute('fill', '#3498db')
        this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        this.text.setAttribute('x', x)
        this.text.setAttribute('y', y)
        this.text.setAttribute('font-size', 20)
        this.text.setAttribute('dy', 8)
        this.text.setAttribute('fill', 'white')
        this.text.setAttribute('text-anchor', 'middle')
        this.text.setAttribute('class', 'point')
        this.text.innerHTML = r
        svg.appendChild(this.dom)
        svg.appendChild(this.text)
    }

    modify({x, y, r}) {
        if (x || x === 0) {
            // if(x-presentR<0){
            //     x=presentR
            // }else if(x+presentR>conf.width){
            //     x=conf.width-presentR
            // }
            this.dom.setAttribute('cx', x)
            this.text.setAttribute('x', x)
        }
        if (y || y === 0) {
            // if(y-presentR<0){
            //     y=presentR
            // }else if(y+presentR>conf.height){
            //     y=conf.height-presentR
            // }
            this.dom.setAttribute('cy', y)
            this.text.setAttribute('y', y)
        }
        if (r || r === 0) {

            let R = Math.sqrt(r / 3) * 8
            this.text.innerHTML = r
            R < 20 ? R = 20 : false
            R > 60 ? R = 60 : false
            this.dom.setAttribute('r', R)
        }
    }

    delete() {
        let svg = document.getElementById('board')
        svg.removeChild(this.dom)
        svg.removeChild(this.text)

    }

    select() {
        this.dom.setAttribute('fill', '#ff4757')
    }

    clearSelect() {
        this.dom.removeAttribute('fill')
        this.dom.setAttribute('fill', '#3498db')
    }
    static import(obj){
        return new PointView(obj)
    }

}

PointView.id = 0
export {PointView}