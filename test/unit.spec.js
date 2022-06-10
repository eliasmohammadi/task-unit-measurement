const {describe, it} = require('mocha')
const expect = require('chai').expect

const {CoefficientUnit, BasicUnit, FormulatedUnit, Dimension} = require('../src/model/measurement.model')
describe('MeasurementUnit', () => {


    it('should convert CoefficientUnit to BasicUnit', (done) => {
        const dimension = new Dimension('length')
        const basicUnit = new BasicUnit('Meter', 'm', dimension)
        const coUnit = new CoefficientUnit('MilliMeter', 'mm', basicUnit, 0.001)
        const actualBasicUnit = coUnit.convertToBase(1)
        expect(actualBasicUnit.value).to.be.equal(0.001)
        expect(actualBasicUnit.name).to.be.equal('Meter')
        expect(actualBasicUnit.symbol).to.be.equal('m')
        expect(actualBasicUnit.dimension.name).to.be.equal('length')
        done()
    })
    it("should convert BasicUnit from CoefficientUnit", (done) => {
        const dimension = new Dimension('length')
        const basicUnit = new BasicUnit('Meter', 'm', dimension)
        basicUnit.setValue(1)
        const coUnit = new CoefficientUnit('MilliMeter', 'mm', basicUnit, 0.001)
        coUnit.convertFromBase()
        expect(coUnit.value).to.be.equal(1000)
        done()
    })

    it('should check formula validation ', (done) => {

        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('Celsius', 'c', dimension)
        const fu = new FormulatedUnit('kelvin', 'K', basicUnit)
        expect(fu.isValidFormula('(a-2')).to.be.false
        expect(fu.isValidFormula('(a*b-2)')).to.be.false
        expect(fu.isValidFormula('(a*2)')).to.be.true
        done()
    })

    it('should return InvalidFormulaFormatException ', (done) => {

        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('Celsius', 'c', dimension)
        const fu = new FormulatedUnit('kelvin', 'K', basicUnit)
        expect(fu.setFormulaFromBase('(a-2').type).to.be.equal('InvalidFormulaFormatException')
        expect(fu.setFormulaFromBase('(a-2').type).to.be.equal('InvalidFormulaFormatException')
        done()
    })

    it('should convert FormulatedUnit to BasicUnit', (done) => {
        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('celsius', 'c', dimension)
        const formulatedUnit = new FormulatedUnit('fahrenheit', 'F', basicUnit)
        formulatedUnit.setFormulaToBase('((a-32) * 5)/9')
        const actualBasicUnit = formulatedUnit.convertToBase(41, basicUnit)
        expect(actualBasicUnit.name).to.be.equal('celsius')
        expect(actualBasicUnit.value).to.be.equal(5)
        expect(actualBasicUnit.symbol).to.be.equal('c')
        expect(actualBasicUnit.dimension.name).to.be.equal('temperature')
        done()
    })

    it('should convert BasicUnit to FormulatedUnit', (done) => {
        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('celsius', 'c', dimension)
        basicUnit.setValue(1)
        const formulatedUnit = new FormulatedUnit('fahrenheit', 'F', basicUnit)
        formulatedUnit.setFormulaFromBase('((a*9/5)+32)')
        formulatedUnit.convertFromBase()
        expect(formulatedUnit.value).to.be.equal(33.8)
        done()
    })

})
