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

    convertToBase() {
        return new Error('not implemented')
    }

    convertFromBase() {
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
        const nc =  new CoefficientUnit(this.name,this.symbol,this.dimension,this.factor)
        nc.setValue(basicUnit.value / this.factor)
        return nc
    }
}

class FormulatedUnit extends AbstractMeasurementUnit {
    constructor(name, symbol, dimension) {
        super(name, symbol, dimension);
    }

    setFormula(formula) {
        this.formula = formula
    }
}


module.exports = {
    CoefficientUnit,
    FormulatedUnit,
    BasicUnit,
    Dimension
}