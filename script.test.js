const shareholderReturns = require('./script');

describe.each([60000000, 25000000, 35000000, 45000000, 40000000, 50000000, 70000000 , 39000000, 44000000, 47000000])('.shareholderReturns(%i)', (i) => {

    test('All four returns added together should equal the exit value', () => {
        const returns = shareholderReturns(i);
        const foundersTotalReturn = returns[0];
        const prefAInvestorsTotalReturn = returns[1];
        const prefBInvestorsTotalReturn = returns[2];
        const prefCInvestorsTotalReturn = returns[3];
        expect(foundersTotalReturn + prefAInvestorsTotalReturn + prefBInvestorsTotalReturn + prefCInvestorsTotalReturn).toBe(i);
    })

})