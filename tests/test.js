const expect = require('chai').expect;
const processInput = require('../src/ProcessInput');
const errors = require('../src/errors/errors.js');

describe('Example test suite', () => {

    it('expect to process an invalid input', (done) => {
        expect(processInput(['arg1', 'arg2'], (text) => {
            console.log(text);
            expect(text).to.be.eql(errors.RIGHT_PARAMETERS_NUMBER);
            done()
        }))
    });

    it('expect to process an invalid input', (done) => {
        expect(processInput(['arg1', 'arg2', '0,0,aaa,2,1,0'], (text) => {
            expect(text).to.be.eql(errors.INPUT_VALUES);
            done()
        }))
    });

    it('expect to process an invalid input', (done) => {
        expect(processInput(['arg1', 'arg2', '0,0,1,'], (text) => {
            expect(text).to.be.eql(errors.INPUT_VALUES);
            done()
        }))
    });

    it('expect to process an invalid input', (done) => {
        expect(processInput(['arg1', 'arg2', '1,1,1,1,1,1,1'], (text) => {
            expect(text).to.be.eql(errors.MISSING_0);
            done()
        }))
    });

    it('expect to process an invalid input', (done) => {
        expect(processInput(['arg1', 'arg2', ','], (text) => {
            expect(text).to.be.eql(errors.INPUT_VALUES);
            done()
        }))
    });

    it('expect to process a valid input', (done) => {
        expect(processInput(['arg1', 'arg2', '1,1,0,1,0,0'], (text) => {
            expect(text).to.be.eql('index 2');
            done()
        }))
    });

    it('expect to process a valid input', (done) => {
        expect(processInput(['arg1', 'arg2', '0'], (text) => {
            expect(text).to.be.eql('index 0');
            done()
        }))
    });

    it('expect to process a valid input', (done) => {
        expect(processInput(['arg1', 'arg2', '0,1'], (text) => {
            expect(text).to.be.eql('index 0');
            done()
        }))
    });

    it('expect to process a valid input', (done) => {
        expect(processInput(['arg1', 'arg2', '1,1,0,1,0,0,1,1,1,1,1,0,1'], (text) => {
            expect(text).to.be.eql('index 11');
            done()
        }))
    });
});
