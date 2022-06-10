const {InvalidFormulaFormatException} = require('../exception')

class Dimension {
    constructor(name) {
        this.name = name
    }
}


class AbstractMeasurementUnit {

    constructor(name, symbol, basicUnit) {
        this.name = name
        this.symbol = symbol
        this.basicUnit = basicUnit
    }

    convertToBase(basicUnit) {
        return new Error('not implemented')
    }

    convertFromBase(options = {}) {
        return new Error('not implemented')
    }

}

class BasicUnit {
    constructor(name, symbol, dimension, value = 1) {
        this.name = name
        this.symbol = symbol
        this.dimension = dimension
        this.value = value
    }
}

class CoefficientUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, basicUnit, factor, value) {
        super(name, symbol, basicUnit);
        this.factor = factor
        this.basicUnit = basicUnit
        this.value = value || 1
        this.formulatedToBase = undefined
        this.formulatedFromBase = undefined
    }

    convertToBase(value) {
        const bu = this.basicUnit
        bu.value = this.factor * value
        return bu
    }

    convertFromBase(options = {}) {
        this.value = (this.basicUnit.value / this.factor)
        if (options && options.fixedDigit)
            this.value = parseFloat(this.value.toFixed(options.fixedDigit))
    }
}

class FormulatedUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, basicUnit, value) {
        super(name, symbol, basicUnit);
        this.value = value || 1
    }

    setFormulaToBase(formula) {
        if (!this.isValidFormula(formula)) {
            return InvalidFormulaFormatException
        }
        this.formulatedToBase = formula
    }

    setFormulaFromBase(formula) {
        if (!this.isValidFormula(formula)) {
            return InvalidFormulaFormatException
        }
        this.formulatedFromBase = formula
    }

    isValidFormula(formula) {
        try {
            const f = this._replaceValue(formula, 1)
            eval(f);
            return true
        } catch (e) {
            return false
        }
    }

    convertToBase(value) {
        if (!this.formulatedToBase)
            return InvalidFormulaFormatException
        const formula = this._replaceValue(this.formulatedToBase, value)
        const bu = this.basicUnit
        bu.value = eval(formula)
        return bu
    }

    convertFromBase(options) {
        if (!this.formulatedFromBase)
            return InvalidFormulaFormatException

        const f = this._replaceValue(this.formulatedFromBase, this.basicUnit.value)
        this.value = (eval(f))
        if (options && options.fixedDigit)
            this.value = parseFloat(this.value.toFixed(options.fixedDigit))
    }


    _replaceValue(formula, value) {
        return formula.replace(/a/gi, value)
    }


}


module.exports = {
    CoefficientUnit,
    FormulatedUnit,
    BasicUnit,
    Dimension
}