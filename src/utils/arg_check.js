import typeChecker from './typeChecker';
const methods = new Set([checkRequireArgs, checkTypeArgs])
export function checkRequireArgs(f = () => {}, requireArgs = []) {
    return function(...arg) {
        return requireArgs.every((i) => {
            return arg[i - 1]
        }) ? f(...arg) : new Error('Required arguments must be provided')
    }
}
export function checkTypeArgs(f = () => {}, argTypes = []) {
    return function(...arg) {
        return argTypes.every((v, i) => {
            return v ? typeChecker(v, arg[i]) : true
        }) ? f(...arg) : new Error('A Type of given arguments is not a type the function expect')
    }
}
export function applyMultipleCheck(f = () => {}, ...checkers) {
    return checkers.reduce((prev, cur) => {
        if(!methods.has(cur[0])) throw new Error('Checkers of argument must be a function "arg_check" exports')
        return cur[0](prev, cur[1])
    }, f)
}
