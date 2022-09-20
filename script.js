"use strict"
const fs = require('fs')

// Challenge: 
// Write a function that takes an exit value (in €) as input and outputs the return for each shareholder. 

const ownershipDistribution = {
    'founders' : .3333,
    'prefAInvestors' : .0667,
    'prefBInvestors' : .1,
    'prefCInvestors' : .5
};

const capTable = [

    {'commonShares' : 1000000,
    'prefAInvestorsShares' : 200000,
    'prefBInvestorsShares' : 300000,
    'prefCInvestorsShares' : 1500000}, 

    {'commonInvested' : 0,
    'prefAInvestorsInvested' : 900000,
    'prefBInvestorsInvested' : 2100000,
    'prefCInvestorsInvested' : 15000000}
    
]

function shareholderReturns(exitValue) {

    let remainder = exitValue;
    // pro rata calculations
    let foundersReturn = remainder * ownershipDistribution.founders;
    let prefAInvestorsReturn = remainder * ownershipDistribution.prefAInvestors;
    let prefBInvestorsReturn = remainder * ownershipDistribution.prefBInvestors;
    let prefCInvestorsReturn = remainder * ownershipDistribution.prefCInvestors;

    console.log('At an exit value of ' + exitValue + ', the returns are:')
    console.log('Founders return: €', foundersReturn);
    console.log('Preferred A Investors return: €', prefAInvestorsReturn);
    console.log('Preferred B Investors return: €', prefBInvestorsReturn);
    console.log('Preferred C Investors return: €', prefCInvestorsReturn);
    
}

// STAGES

// Stage 1: Compute the exit distribution at €60m.
// This is the most basic case. All shares convert to Common shares, liquidation preferences will be ignored and returns would be:
// Founders: €20m
// Preferred A Investors: €4m
// Preferred B Investors: €6m
// Preferred C Investors: €30m

console.log('------------------');
console.log('Stage 1');
console.log('------------------');
shareholderReturns(60000000);
console.log('\n');


// Stage 2: Compute the exit distribution at €25m.
// The investors receive their 1× liquidation preference. The total is €18m, the remaining €7m are distributed pro-rata to all shareholders (that’s participation). So we get:
// Founders: €2,333,333m (33.33% of €7m)
// Preferred A Investors: €0.9m + €0.47m (6.67% of €7m)
// Preferred B Investors: €2.1m + €0.7m
// Preferred C Investors: €15m + €3.5m

// console.log('------------------');
// console.log('Stage 2');
// console.log('------------------');
// shareholderReturns(25000000);
// console.log('\n');


// Stage 3: Compute the exit distribution at €35m.
// Now, the cap comes into play. If computed as before, the Series A shares would get €0.9 + €1.14m (6.67% of €17m). That’s too much, the cap is 2× or €1.8m. 
// To solve this, we give €1.8m to the Series A shares and distribute the remaining €16.1m pro-rata to all other shareholders. This gives us:
// Founders: €5.75m (35.71% of €16.1m)
// Preferred A Investors: €0.9m + €0.9m (2× cap)
// Preferred B Investors: €2.1m + €1.725m (10.71% of €16.1m)
// Preferred C Investors: €15m + €8.625m (53.57% of €16.1m)

// console.log('------------------');
// console.log('Stage 3');
// console.log('------------------');
// shareholderReturns(35000000);
// console.log('\n');


// Stage 4: Compute the exit distribution at €45m.
// We observe the first conversion to Common shares. Preferred B has reached the cap and gets a fixed €2.1 + €2.1m. Preferred A could get €1.8m using their liquidation preference. 
// However, if they convert to Common and ignore their preference, they end up with more. The liquidation preferences sum up to €19.2m and distributing the remainder we end up with:
// - **Founders:** €9.56m (37.04% of €25.8m)
// - **Preferred A Investors:** €1.91m (7.41% of €25.8m)
// - **Preferred B Investors:** €2.1m + €2.1m (2× cap)
// - **Preferred C Investors:** €15m + €14.3m (55.56% of €25.8m)

// As these examples demonstrate, liquidation preferences can get really messy. And that’s why lawyers charge a lot of money to compute these in Excel.

// console.log('------------------');
// console.log('Stage 4');
// console.log('------------------');
// shareholderReturns(45000000);
// console.log('\n');


// Stage 5: Compute the exit distribution at €40m, €50m, and €70m.
// The distribution at these values follow the same pattern as the examples above. But now it is up to you to convince yourself that your function produces meaningful results. 

// console.log('------------------');
// console.log('Stage 5');
// console.log('------------------');
// shareholderReturns(40000000);
// shareholderReturns(50000000);
// shareholderReturns(70000000);
// console.log('\n');


// Stage 6: Compute the exit distribution at €39m, €44m, and €47m.
// If the company is sold at these valuations, some effects come into play that aren’t intuitive at first. Can you spot them and make your function return correct results?
// It might help to calculate these distributions “by hand” to get a feeling of what’s going on.

// console.log('------------------');
// console.log('Stage 6');
// console.log('------------------');
// shareholderReturns(39000000);
// shareholderReturns(44000000);
// shareholderReturns(47000000);