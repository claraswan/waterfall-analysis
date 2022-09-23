const shareholderReturns = require('./script');

// This test checks to make sure that at the end of the returns calculation, the final four results actualy add up to the exit value.
// The values I passed into it are the values from the assignment sheet as well as some other (arbitrary) values, just to be safe.
// I am hoping this gives me a greater chance of having a correct output for the input values that I didn't receive the answers for.

describe.each([60000000, 25000000, 35000000, 45000000, 40000000, 50000000, 70000000 , 39000000, 44000000, 47000000, 43000000, 32000000, 57000000])('.shareholderReturns(%i)', (i) => {

    test('All four returns added together should equal the exit value', () => {
        const returns = shareholderReturns(i);
        const foundersTotalReturn = returns[0];
        const prefAInvestorsTotalReturn = returns[1];
        const prefBInvestorsTotalReturn = returns[2];
        const prefCInvestorsTotalReturn = returns[3];
        expect(foundersTotalReturn + prefAInvestorsTotalReturn + prefBInvestorsTotalReturn + prefCInvestorsTotalReturn).toBe(i);
    })

})