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

    convertToBase(value, basicUnit) {
        return new Error('not implemented')
    }

    convertFromBase(basicUnit) {
        return new Error('not implemented')
    }

    convertTo(measurementUnit) {
        return new Error('not implemented')
    }

}

class BasicUnit {
    constructor(name, symbol, dimension) {
        this.name = name
        this.symbol = symbol
        this.dimension = dimension
    }

    setValue(value) {
        this.value = value
    }
}

class CoefficientUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, basicUnit, factor) {
        super(name, symbol, basicUnit);
        this.factor = factor
        this.basicUnit = basicUnit
        this.value = undefined
    }


    convertToBase(value) {
        const bu = this.basicUnit
        bu.setValue(this.factor * value)
        return bu
    }

    convertFromBase() {
        this.value = (this.basicUnit.value / this.factor)
    }
}

class FormulatedUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, basicUnit) {
        super(name, symbol, basicUnit);
        this.value = undefined
    }

    setFormulaToBase(formula) {
        this.formulatedToBase = formula
    }

    setFormulaFromBase(formula) {
        this.formulatedFromBase = formula
    }


    convertToBase(value) {
        const formula = this.formulatedToBase.replace(/a/gi, value)
        const bu = this.basicUnit
        bu.setValue(eval(formula))
        return bu
    }

    convertFromBase() {
        const f = this.formulatedFromBase.replace(/a/gi, this.basicUnit.value)
        this.value = (eval(f))
    }


}


module.exports = {
    CoefficientUnit,
    FormulatedUnit,
    BasicUnit,
    Dimension
}