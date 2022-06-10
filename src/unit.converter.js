const {NotSameBasicUnitException} = require('./exception')
class UnitConverter {

    isValidToConvert(fUnit, sUnit) {
        return fUnit.basicUnit.dimension.name === sUnit.basicUnit.dimension.name
    }

    convert(firstUnit, secondUnit, options = {}) {
        if(!this.isValidToConvert(firstUnit,secondUnit))
            return NotSameBasicUnitException
        secondUnit.basicUnit = firstUnit.convertToBase(firstUnit.value)
        let fixedDigit = 1
        if (options && options.fixedDigit)
            fixedDigit = options.fixedDigit
        secondUnit.convertFromBase({fixedDigit: fixedDigit})
        return secondUnit
    }


}


module.exports = new UnitConverter()