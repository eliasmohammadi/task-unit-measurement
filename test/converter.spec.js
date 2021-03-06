const {describe, it} = require('mocha')
const expect = require('chai').expect
const {CoefficientUnit, BasicUnit, FormulatedUnit, Dimension} = require('../src/model/measurement.model')
const unitConverter = require('../src/unit.converter')
describe('Unit Converter', () => {

    it('should return false when two unit can not convert to each other',(done)=>{
        const dimensionOne = new Dimension('length')
        const dimensionTwo = new Dimension('electric')

        const lengthBasicUnit = new BasicUnit('Meter','m',dimensionOne)
        const electricBasicUnit = new BasicUnit('Ampere','A',dimensionTwo)

        const lengthCoUnit = new CoefficientUnit('Millimeter','mm',lengthBasicUnit,0.001)
        const electricCoUnit = new CoefficientUnit('MilliAmpere','mA',electricBasicUnit,0.001)
        const isValid = unitConverter.isValidToConvert(lengthCoUnit,electricCoUnit)
        expect(isValid).to.be.false
        done()
    })

    it('should return NotSameBasicUnitException',(done)=>{
        const dimensionOne = new Dimension('length')
        const dimensionTwo = new Dimension('electric')

        const lengthBasicUnit = new BasicUnit('Meter','m',dimensionOne)
        const electricBasicUnit = new BasicUnit('Ampere','A',dimensionTwo)

        const lengthCoUnit = new CoefficientUnit('Millimeter','mm',lengthBasicUnit,0.001)
        const electricCoUnit = new CoefficientUnit('MilliAmpere','mA',electricBasicUnit,0.001)

        const convert = unitConverter.convert(lengthCoUnit,electricCoUnit)

        expect(convert.type).to.be.equal('NotSameBasicUnitException')
        done()
    })

    it('should convert CoefficientUnit to another CoefficientUnit', (done) => {
        const dimension = new Dimension('length')
        const basicUnit = new BasicUnit('Meter', 'm', dimension)
        const firstCoUnit = new CoefficientUnit('Centimeter', 'cm', basicUnit, 0.01,2.2)
        const secondCoUnit = new CoefficientUnit('Millimeter', 'mm', basicUnit, 0.001)


        const actualMilliMeter = unitConverter.convert(firstCoUnit, secondCoUnit)
        expect(actualMilliMeter.name).to.be.equal('Millimeter')
        expect(actualMilliMeter.symbol).to.be.equal('mm')
        expect(actualMilliMeter.value).to.be.equal(22)

        secondCoUnit.value = 34

        const actualCentiMeter = unitConverter.convert(secondCoUnit, firstCoUnit)
        expect(actualCentiMeter.name).to.be.equal('Centimeter')
        expect(actualCentiMeter.symbol).to.be.equal('cm')
        expect(actualCentiMeter.value).to.be.equal(3.4)
        done()
    })

    it('should convert FormulatedUnit to another FormulatedUnit', (done) => {
        const dimension = new Dimension('temperature')
        const basicUnit = new BasicUnit('Celsius', 'c', dimension)
        const fahrenheitUnit = new FormulatedUnit('Fahrenheit', 'F', basicUnit,1)
        const kelvinUnit = new FormulatedUnit('Kelvin', 'K', basicUnit)

        fahrenheitUnit.setFormulaToBase('(a-32)*5/9')
        fahrenheitUnit.setFormulaFromBase('(a*9/5)+32')


        kelvinUnit.setFormulaToBase('a-273.15')
        kelvinUnit.setFormulaFromBase('a+273.15')



        const actualKelvin = unitConverter.convert(fahrenheitUnit, kelvinUnit)
        expect(actualKelvin.name).to.be.equal('Kelvin')
        expect(actualKelvin.symbol).to.be.equal('K')
        expect(actualKelvin.value).to.be.equal(255.9)

        kelvinUnit.value = 1
        const actualFahrenheit = unitConverter.convert(kelvinUnit, fahrenheitUnit, {fixedDigit: 2})
        expect(actualFahrenheit.name).to.be.equal('Fahrenheit')
        expect(actualFahrenheit.symbol).to.be.equal('F')
        expect(actualFahrenheit.value).to.be.equal(-457.87)


        done()
    })



})