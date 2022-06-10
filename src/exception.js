class BaseException{
    constructor(type) {
        this.type = type
    }
}
class NotSameBasicUnitException extends BaseException{
    constructor() {
        super('NotSameBasicUnitException');
    }
}

class InvalidFormulaFormatException extends BaseException{
    constructor() {
        super('InvalidFormulaFormatException')
    }
}

module.exports = {
    NotSameBasicUnitException : new NotSameBasicUnitException(),
    InvalidFormulaFormatException : new InvalidFormulaFormatException()
}