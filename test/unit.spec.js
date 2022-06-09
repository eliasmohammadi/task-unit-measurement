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
        const actualBasicUnit = coUnit.convertFromBase(basicUnit)
        expect(actualBasicUnit.value).to.be.equal(1000)
        expect(actualBasicUnit.name).to.be.equal('MilliMeter')
        expect(actualBasicUnit.symbol).to.be.equal('mm')
        expect(actualBasicUnit.dimension.name).to.be.equal('length')
        done()
    })


})
