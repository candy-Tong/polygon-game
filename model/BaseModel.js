class BaseModel {
    modify(){
        throw new Error(arguments.callee.name+' function must be overloaded')
    }
    remove() {
        this.redraw('delete')
    }
    redraw(){
        throw new Error(arguments.callee.name+' function must be overloaded')
    }
}
export {BaseModel}