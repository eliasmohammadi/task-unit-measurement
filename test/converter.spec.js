const {describe, it} = require('mocha')
const expect = require('chai').expect
const {CoefficientUnit, BasicUnit, FormulatedUnit, Dimension} = require('../src/model/measurement.model')
const unitConverter = require('../src/unit.converter')
describe.only('Unit Converter', () => {


    it('should convert CoefficientUnit to another CoefficientUnit', (done) => {
        const dimension = new Dimension('length')
        const basicUnit = new BasicUnit('Meter', 'm', dimension)
        const firstCoUnit = new CoefficientUnit('Centimeter', 'cm', basicUnit, 0.01)
        const secondCoUnit = new CoefficientUnit('Millimeter', 'mm', basicUnit, 0.001)

        firstCoUnit.setValue(2.2)

        const actualMilliMeter = unitConverter.convert(firstCoUnit, secondCoUnit)
        expect(actualMilliMeter.name).to.be.equal('Millimeter')
        expect(actualMilliMeter.symbol).to.be.equal('mm')
        expect(actualMilliMeter.value).to.be.equal(22)

        secondCoUnit.setValue(34)

        const actualCentiMeter = unitConverter.convert(secondCoUnit, firstCoUnit)
        expect(actualCentiMeter.name).to.be.equal('Centimeter')
        expect(actualCentiMeter.symbol).to.be.equal('cm')
        expect(actualCentiMeter.value).to.be.equal(3.4)
        done()
    })

    it('should convert FormulatedUnit to another FormulatedUnit', (done) => {
        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('Celsius', 'c', dimension)
        const fahrenheitUnit = new FormulatedUnit('Fahrenheit', 'F', basicUnit)
        const kelvinUnit = new FormulatedUnit('Kelvin', 'K', basicUnit)

        fahrenheitUnit.setFormulaToBase('(a-32)*5/9')
        fahrenheitUnit.setFormulaFromBase('(a*9/5)+32')


        kelvinUnit.setFormulaToBase('a-273.15')
        kelvinUnit.setFormulaFromBase('a+273.15')

        fahrenheitUnit.setValue(1)

        const actualKelvin = unitConverter.convert(fahrenheitUnit, kelvinUnit)
        expect(actualKelvin.name).to.be.equal('Kelvin')
        expect(actualKelvin.symbol).to.be.equal('K')
        expect(actualKelvin.value).to.be.equal(255.9)

        kelvinUnit.setValue(1)
        const actualFahrenheit = unitConverter.convert(kelvinUnit, fahrenheitUnit, {fixedDigit: 2})
        expect(actualFahrenheit.name).to.be.equal('Fahrenheit')
        expect(actualFahrenheit.symbol).to.be.equal('F')
        expect(actualFahrenheit.value).to.be.equal(-457.87)


        done()
    })

})