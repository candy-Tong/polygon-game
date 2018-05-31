import {BaseModel} from './BaseModel.js'

class LineModel extends BaseModel {
    constructor(begin={}, end={}, operation = '+') {
        super()
        this.begin={
            x:parseInt(begin.x),
            y:parseInt((begin.y))
        }
        this.end={
            x:parseInt(end.x),
            y:parseInt((end.y))
        }
        this.operation = operation
        this.isSelected=false
    }

    select(){
        this.isSelected=true
    }
    clearSelect(){
        this.isSelected=false
    }

    modify(begin={}, end={}, operation) {
        begin?this.begin={
            x:parseInt(begin.x),
            y:parseInt((begin.y))
        }:false
        end?this.end={
            x:parseInt(end.x),
            y:parseInt((end.y))
        }:false
        operation?this.operation=operation:false
    }

    getAnotherPosition({x,y}){
        x=parseInt(x)
        y=parseInt(y)
        if(this.begin.x===x&&this.begin.y===y){
            return this.end
        }else if(this.end.x===x&&this.end.y===y){
            return this.begin
        }else{
            throw new Error('can not find another position in '+arguments.callee().name)
        }
    }

    mergePoint() {

    }

}

export {LineModel}