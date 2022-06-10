class Dimension {
    constructor(name) {
        this.name = name
    }
}

class AbstractMeasurementUnit {

    constructor(name, symbol, dimension) {
        this.name = name
        this.symbol = symbol
        this.dimension = dimension
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

class BasicUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, dimension) {
        super(name, symbol, dimension);
    }

    setValue(value) {
        this.value = value
    }
}

class CoefficientUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, dimension, factor) {
        super(name, symbol, dimension);
        this.factor = factor
    }

    setValue(value) {
        this.value = value
    }

    convertToBase(value, basicUnit) {
        basicUnit.setValue(this.factor * value)
        return basicUnit
    }

    convertFromBase(basicUnit) {
        const nc = new CoefficientUnit(this.name, this.symbol, this.dimension, this.factor)
        nc.setValue(basicUnit.value / this.factor)
        return nc
    }
}

class FormulatedUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, dimension) {
        super(name, symbol, dimension);
    }

    setFormulaToBase(formula) {
        this.formulatedToBase = formula
    }
    setFormulaFromBase(formula){
        this.formulatedFromBase = formula
    }

    setValue(value){
        this.value = value
    }


    convertToBase(value, basicUnit) {
        const formula = this.formulatedToBase.replace(/a/gi, value)
        basicUnit.setValue(eval(formula))
        return basicUnit
    }

    convertFromBase(basicUnit) {
        const nf = new FormulatedUnit(this.name,this.symbol,this.dimension)
        nf.setFormulaFromBase(this.formulatedFromBase)
        const f = this.formulatedFromBase.replace(/a/gi,basicUnit.value)
        nf.setValue(eval(f))
        return nf
    }


}


module.exports = {
    CoefficientUnit,
    FormulatedUnit,
    BasicUnit,
    Dimension
}