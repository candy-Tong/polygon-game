class BaseListModel {
    find() {
        throw new Error(arguments.callee.name+' function must be overloaded')
    }
    getList(){
        throw new Error(arguments.callee.name+' function must be overloaded')
    }
}
export {BaseListModel}