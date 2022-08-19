export default function typeChecker(c, v) {
    if(c !== v.constructor) {
        switch(v.constructor) {
            case String:
                return c === +v.constructor
            case Number:
                return c === +v.toString().constructor
            default:
                return false
        }
    }
    return c === v.constructor
}
