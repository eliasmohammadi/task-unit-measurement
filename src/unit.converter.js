class UnitConverter {

    convert(firstUnit, secondUnit, options = {}) {
        secondUnit.basicUnit = firstUnit.convertToBase(firstUnit.value)
        let fixedDigit = 1
        if (options && options.fixedDigit)
            fixedDigit = options.fixedDigit
        secondUnit.convertFromBase({fixedDigit: fixedDigit})
        return secondUnit
    }

}

module.exports = new UnitConverter()