const {describe, it} = require('mocha')
const expect = require('chai').expect

const {CoefficientUnit, BasicUnit, FormulatedUnit, Dimension} = require('../src/model/measurement.model')
describe('MeasurementUnit', () => {


    it('should convert CoefficientUnit to BasicUnit', (done) => {
        const dimension = new Dimension('length')
        const basicUnit = new BasicUnit('Meter', 'm', dimension)
        const coUnit = new CoefficientUnit('MilliMeter', 'mm', dimension, 0.001)
        const actualBasicUnit = coUnit.convertToBase(1,basicUnit)
        expect(actualBasicUnit.value).to.be.equal(0.001)
        expect(actualBasicUnit.name).to.be.equal('Meter')
        expect(actualBasicUnit.symbol).to.be.equal('m')
        expect(actualBasicUnit.dimension.name).to.be.equal('length')
        done()
    })
    it("should convert BasicUnit from CoefficientUnit",(done)=>{
        const dimension = new Dimension('length')
        const basicUnit = new BasicUnit('Meter', 'm', dimension)
        basicUnit.setValue(1)
        const coUnit = new CoefficientUnit('MilliMeter', 'mm', dimension, 0.001)
        const actualCoUnit = coUnit.convertFromBase(basicUnit)
        expect(actualCoUnit.value).to.be.equal(1000)
        expect(actualCoUnit.name).to.be.equal('MilliMeter')
        expect(actualCoUnit.symbol).to.be.equal('mm')
        expect(actualCoUnit.dimension.name).to.be.equal('length')
        done()
    })

    it('should convert FormulatedUnit to BasicUnit',(done)=>{
        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('celsius','c',dimension)
        const formulatedUnit = new FormulatedUnit('fahrenheit','F',dimension)
        formulatedUnit.setFormulaToBase('((a-32) * 5)/9')
        const actualBasicUnit = formulatedUnit.convertToBase(41,basicUnit)
        expect(actualBasicUnit.name).to.be.equal('celsius')
        expect(actualBasicUnit.value).to.be.equal(5)
        expect(actualBasicUnit.symbol).to.be.equal('c')
        expect(actualBasicUnit.dimension.name).to.be.equal('temperature')
        done()
    })

    it('should convert BasicUnit to FormulatedUnit',(done)=>{
        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('celsius','c',dimension)
        basicUnit.setValue(1)
        const formulatedUnit = new FormulatedUnit('fahrenheit','F',dimension)
        formulatedUnit.setFormulaFromBase('((a*9/5)+32)')
        const actualFoUnit = formulatedUnit.convertFromBase(basicUnit)
        expect(actualFoUnit.name).to.be.equal('fahrenheit')
        expect(actualFoUnit.value).to.be.equal(33.8)
        expect(actualFoUnit.symbol).to.be.equal('F')
        expect(actualFoUnit.dimension.name).to.be.equal('temperature')
        expect(actualFoUnit.formulatedFromBase).to.be.equal('((a*9/5)+32)')
        done()
    })
})
