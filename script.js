"use strict"

// CHALLENGE: 
// Write a function that takes an exit value (in €) as input and outputs the return for each shareholder. 

// Cap Table and Ownership Distribution figures
let numOfShares = 3000000;

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
// for reference:
// capTable[0] = number of shares
// capTable[1] = amount invested

const ownershipDistribution = {
    'founders' : (capTable[0].commonShares / numOfShares),
    'prefAInvestors' : (capTable[0].prefAInvestorsShares / numOfShares),
    'prefBInvestors' : (capTable[0].prefBInvestorsShares / numOfShares),
    'prefCInvestors' : (capTable[0].prefCInvestorsShares / numOfShares)
};

// liquidation preference calculations
const foundersLiqPref = 0;
const prefAInvestorsLiqPref = capTable[1].prefAInvestorsInvested;
const prefBInvestorsLiqPref = capTable[1].prefBInvestorsInvested;
const prefCInvestorsLiqPref = capTable[1].prefCInvestorsInvested;


// STAGES

// Stage 1: Compute the exit distribution at €60m.
// This is the most basic case. All shares convert to Common shares, liquidation preferences will be ignored and returns would be:
// Founders: €20m
// Preferred A Investors: €4m
// Preferred B Investors: €6m
// Preferred C Investors: €30m

function shareholderReturns1(exitValue) {
    
    // total return calculations
    const foundersReturn = exitValue * ownershipDistribution.founders;
    const prefAInvestorsReturn = exitValue * ownershipDistribution.prefAInvestors;
    const prefBInvestorsReturn = exitValue * ownershipDistribution.prefBInvestors;
    const prefCInvestorsReturn = exitValue * ownershipDistribution.prefCInvestors;
    
    console.log('At an exit value of €' + exitValue + ', the returns are:')

    console.log('Founders return: €', foundersReturn);
    console.log('Preferred A Investors return: €', prefAInvestorsReturn);
    console.log('Preferred B Investors return: €', prefBInvestorsReturn);
    console.log('Preferred C Investors return: €', prefCInvestorsReturn);
    
}

// console.log('------------------');
// console.log('Stage 1');
// console.log('------------------');
// shareholderReturns1(60000000);
// console.log('\n');




// Stage 2: Compute the exit distribution at €25m.
// The investors receive their 1× liquidation preference. The total is €18m, the remaining €7m are distributed pro-rata to all shareholders (that’s participation). So we get:
// Founders: €2,333,333m (33.33% of €7m)
// Preferred A Investors: €0.9m + €0.47m (6.67% of €7m)
// Preferred B Investors: €2.1m + €0.7m
// Preferred C Investors: €15m + €3.5m

function shareholderReturns2(exitValue) {

    let remainder;

    // remainder calculation
    remainder = exitValue - prefAInvestorsLiqPref - prefBInvestorsLiqPref - prefCInvestorsLiqPref;

    // pro rata calculations
    const foundersProRata = remainder * ownershipDistribution.founders;
    const prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
    const prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
    const prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

    // total return calculations
    const foundersTotalReturn = foundersLiqPref + foundersProRata;
    const prefAInvestorsTotalReturn = prefAInvestorsLiqPref + prefAInvestorsProRata;
    const prefBInvestorsTotalReturn = prefBInvestorsLiqPref + prefBInvestorsProRata;
    const prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

    console.log('At an exit value of €' + exitValue + ', the returns are:')

    console.log('Founders return: €', foundersTotalReturn);
    console.log('Preferred A Investors return: €', prefAInvestorsTotalReturn);
    console.log('Preferred B Investors return: €', prefBInvestorsTotalReturn);
    console.log('Preferred C Investors return: €', prefCInvestorsTotalReturn);
    
}

// console.log('------------------');
// console.log('Stage 2');
// console.log('------------------');
// shareholderReturns2(25000000);
// console.log('\n');




// Stage 3: Compute the exit distribution at €35m.
// Now, the cap comes into play. If computed as before, the Series A shares would get €0.9 + €1.14m (6.67% of €17m). That’s too much, the cap is 2× or €1.8m. 
// To solve this, we give €1.8m to the Series A shares and distribute the remaining €16.1m pro-rata to all other shareholders. This gives us:
// Founders: €5.75m (35.71% of €16.1m)
// Preferred A Investors: €0.9m + €0.9m (2× cap)
// Preferred B Investors: €2.1m + €1.725m (10.71% of €16.1m)
// Preferred C Investors: €15m + €8.625m (53.57% of €16.1m)

function shareholderReturns3(exitValue) {

    let remainder;

    // remainder calculation
    remainder = exitValue - prefAInvestorsLiqPref - prefBInvestorsLiqPref - prefCInvestorsLiqPref;

    // pro rata calculations
    let foundersProRata = remainder * ownershipDistribution.founders;
    let prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
    let prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
    let prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

    // total return calculations
    let foundersTotalReturn = foundersLiqPref + foundersProRata;
    let prefAInvestorsTotalReturn = prefAInvestorsLiqPref + prefAInvestorsProRata;
    let prefBInvestorsTotalReturn = prefBInvestorsLiqPref + prefBInvestorsProRata;
    let prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

    // Now, the cap comes into play.
    if (prefCInvestorsTotalReturn > (prefCInvestorsLiqPref * 2)) { // Has Series C reached cap? If so, so have B and A.
        
        console.log('C reached cap');
        console.log('Which means B also reached cap');
        console.log('Which means A also reached cap');

        // give C, B, and A their cap as total return
        prefCInvestorsTotalReturn = (prefCInvestorsLiqPref * 2);
        prefBInvestorsTotalReturn = (prefBInvestorsLiqPref * 2);
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        // calculate new amount of shares
        numOfShares = numOfShares - capTable[0].prefCInvestorsShares - capTable[0].prefBInvestorsShares - capTable[0].prefAInvestorsShares;

        // recalculate ownership distribution based off new amount of shares
        ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
        ownershipDistribution.prefBInvestors = (capTable[0].prefBInvestorsShares / numOfShares);
        ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

        // caluclate the remainder to distribute among the remaining groups pro-rata
        remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsTotalReturn - prefCInvestorsTotalReturn;

        // calculate pro rata amounts for remaining groups
        foundersProRata = remainder * ownershipDistribution.founders;

        // recalculate total return for remaining groups
        foundersTotalReturn = foundersLiqPref + foundersProRata;

            
    } else if (prefBInvestorsTotalReturn > (prefBInvestorsLiqPref * 2)) { // Has Series B reached cap? If so, so has A.

        console.log('C didnt reach cap... but B reached cap');
        console.log('Which means A also reached cap');

        // give B and A their cap as total return
        prefBInvestorsTotalReturn = (prefBInvestorsLiqPref * 2);
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);
 
        // calculate new amount of shares
        numOfShares = numOfShares - capTable[0].prefBInvestorsShares - capTable[0].prefAInvestorsShares;

        // recalculate ownership distribution based off new amount of shares
        ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
        ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

        // caluclate the remainder to distribute among the remaining groups pro-rata
        remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsTotalReturn - prefCInvestorsLiqPref;

        // calculate pro rata amounts for remaining groups
        foundersProRata = remainder * ownershipDistribution.founders;
        prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

        // recalculate total return for remaining groups
        foundersTotalReturn = foundersLiqPref + foundersProRata;
        prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;
    
 
    } else if (prefAInvestorsTotalReturn > (prefAInvestorsLiqPref * 2)) { // Has Series A reached cap?

        console.log('C and B didnt reach cap... Only A reached cap');

        // give A their cap as total return
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        // calculate new amount of shares
        numOfShares = numOfShares - capTable[0].prefAInvestorsShares;

        // recalculate ownership distribution based off new amount of shares
        ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
        ownershipDistribution.prefBInvestors = (capTable[0].prefBInvestorsShares / numOfShares);
        ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

        // caluclate the remainder to distribute among the others pro-rata
        remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsLiqPref - prefCInvestorsLiqPref;

        // calculate pro rata amounts
        foundersProRata = remainder * ownershipDistribution.founders;
        prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
        prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

        // recalculate total return 
        foundersTotalReturn = foundersLiqPref + foundersProRata;
        prefBInvestorsTotalReturn = prefBInvestorsLiqPref + prefBInvestorsProRata;
        prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

    } // else if none have reached cap, the initial calculations from the top of the function will be valid.

    console.log('At an exit value of €' + exitValue + ', the returns are:')

    console.log('Founders return: €', foundersTotalReturn);
    console.log('Preferred A Investors return: €', prefAInvestorsTotalReturn);
    console.log('Preferred B Investors return: €', prefBInvestorsTotalReturn);
    console.log('Preferred C Investors return: €', prefCInvestorsTotalReturn);
    
}

// console.log('------------------');
// console.log('Stage 3');
// console.log('------------------');
// shareholderReturns3(35000000);
// console.log('\n');




// Stage 4: Compute the exit distribution at €45m.
// We observe the first conversion to Common shares. Preferred B has reached the cap and gets a fixed €2.1 + €2.1m. Preferred A could get €1.8m using their liquidation preference. 
// However, if they convert to Common and ignore their preference, they end up with more. The liquidation preferences sum up to €19.2m and distributing the remainder we end up with:
// - **Founders:** €9.56m (37.04% of €25.8m)
// - **Preferred A Investors:** €1.91m (7.41% of €25.8m)
// - **Preferred B Investors:** €2.1m + €2.1m (2× cap)
// - **Preferred C Investors:** €15m + €14.3m (55.56% of €25.8m)

// NOTE: shareholderReturns4 is written with the knowledge that the exit value will be 45m and thus ONLY Preferred A will convert to common. 
// I will consider all possible exit values in shareholderReturns5.
function shareholderReturns4(exitValue) {

    let remainder;

    // remainder calculation
    remainder = exitValue - prefAInvestorsLiqPref - prefBInvestorsLiqPref - prefCInvestorsLiqPref;

    // pro rata calculations
    let foundersProRata = remainder * ownershipDistribution.founders;
    let prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
    let prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
    let prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

    // total return calculations
    let foundersTotalReturn = foundersLiqPref + foundersProRata;
    let prefAInvestorsTotalReturn = prefAInvestorsLiqPref + prefAInvestorsProRata;
    let prefBInvestorsTotalReturn = prefBInvestorsLiqPref + prefBInvestorsProRata;
    let prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;
    // Now, the option to convert to Common shares comes into play.
    if (prefCInvestorsTotalReturn > (prefCInvestorsLiqPref * 2)) { // Has Series C reached cap? If so, so have B and A.
        
        console.log('C reached cap');
        console.log('Which means B also reached cap');
        console.log('Which means A also reached cap');

        // give C, B, and A their cap as total return
        prefCInvestorsTotalReturn = (prefCInvestorsLiqPref * 2);
        prefBInvestorsTotalReturn = (prefBInvestorsLiqPref * 2);
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        if (prefCInvestorsProRata > prefCInvestorsTotalReturn) { // Would C earn more converting to common shares than taking double their preference?
            console.log('C should convert to common shares which is ' , prefCInvestorsProRata);
            prefCInvestorsTotalReturn = prefCInvestorsProRata;
        }

        // calculate new amount of shares
        numOfShares = numOfShares - capTable[0].prefCInvestorsShares - capTable[0].prefBInvestorsShares - capTable[0].prefAInvestorsShares;

        // recalculate ownership distribution based off new amount of shares
        ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
        ownershipDistribution.prefBInvestors = (capTable[0].prefBInvestorsShares / numOfShares);
        ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

        // caluclate the remainder to distribute among the remaining groups pro-rata
        remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsTotalReturn - prefCInvestorsTotalReturn;

        // calculate pro rata amounts for remaining groups
        foundersProRata = remainder * ownershipDistribution.founders;

        // recalculate total return for remaining groups
        foundersTotalReturn = foundersLiqPref + foundersProRata;
            
    } else if (prefBInvestorsTotalReturn > (prefBInvestorsLiqPref * 2)) { // Has Series B reached cap? If so, so has A.

        console.log('C didnt reach cap... but B reached cap');
        console.log('Which means A also reached cap');

        // give B and A their cap as total return
        prefBInvestorsTotalReturn = (prefBInvestorsLiqPref * 2);
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        //////////////
        // CHECK IF COMMON SHARES FOR A ARE WORTH MORE THAN ABOVE 

        // calculate amount of shares without B since they arent included in the pro rata now
        numOfShares = numOfShares - capTable[0].prefBInvestorsShares;

        // caluclate the remainder to distribute among the others pro-rata
        remainder = exitValue - prefBInvestorsTotalReturn - prefCInvestorsLiqPref;

        // recalculate ownership distribution based off new amount of shares
        ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
        ownershipDistribution.prefAInvestors = (capTable[0].prefAInvestorsShares / numOfShares);
        ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

        // calculate pro rata amounts
        foundersProRata = remainder * ownershipDistribution.founders;
        prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
        prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

        // recalculate total return 
        foundersTotalReturn = foundersLiqPref + foundersProRata;
        let prefAInvestorsTotalReturnCommon = prefAInvestorsProRata;
        prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

        ///////////

        if (prefAInvestorsTotalReturnCommon > prefAInvestorsTotalReturn) { // Would A earn more converting to common shares than taking double their preference?
            console.log('Only A will convert to common shares instead of taking their pref which would be ', prefAInvestorsTotalReturn);

            prefAInvestorsTotalReturn = prefAInvestorsTotalReturnCommon;

        } else {
            console.log('A will not convert to common shares');
            // calculate new amount of shares
            numOfShares = numOfShares - capTable[0].prefBInvestorsShares - capTable[0].prefAInvestorsShares;

            // recalculate ownership distribution based off new amount of shares
            ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
            ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

            // caluclate the remainder to distribute among the remaining groups pro-rata
            remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsTotalReturn - prefCInvestorsLiqPref;

            // calculate pro rata amounts for remaining groups
            foundersProRata = remainder * ownershipDistribution.founders;
            prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

            // recalculate total return for remaining groups
            foundersTotalReturn = foundersLiqPref + foundersProRata;
            prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;
        }
    
 
    } else if (prefAInvestorsTotalReturn > (prefAInvestorsLiqPref * 2)) { // Has Series A reached cap?

        console.log('C and B didnt reach cap... Only A reached cap');

        // give A their cap as total return
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        if (prefAInvestorsProRata > prefAInvestorsTotalReturn) { // Would A earn more converting to common shares than taking double their preference?
            console.log('A should convert to common shares which is ' , prefAInvestorsProRata);
        }

        // calculate new amount of shares
        numOfShares = numOfShares - capTable[0].prefAInvestorsShares;

        // recalculate ownership distribution based off new amount of shares
        ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
        ownershipDistribution.prefBInvestors = (capTable[0].prefBInvestorsShares / numOfShares);
        ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

        // caluclate the remainder to distribute among the others pro-rata
        remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsLiqPref - prefCInvestorsLiqPref;

        // calculate pro rata amounts
        foundersProRata = remainder * ownershipDistribution.founders;
        prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
        prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

        // recalculate total return 
        foundersTotalReturn = foundersLiqPref + foundersProRata;
        prefBInvestorsTotalReturn = prefBInvestorsLiqPref + prefBInvestorsProRata;
        prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

    } // else if none have reached cap, the initial calculations from the top of the function will be valid.

    console.log('At an exit value of €' + exitValue + ', the returns are:')

    console.log('Founders return: €', foundersTotalReturn);
    console.log('Preferred A Investors return: €', prefAInvestorsTotalReturn);
    console.log('Preferred B Investors return: €', prefBInvestorsTotalReturn);
    console.log('Preferred C Investors return: €', prefCInvestorsTotalReturn);
    
}

// console.log('------------------');
// console.log('Stage 4');
// console.log('------------------');
// shareholderReturns4(45000000);
// console.log('\n');



// Stage 5: Compute the exit distribution at €40m, €50m, and €70m.
// The distribution at these values follow the same pattern as the examples above. But now it is up to you to convince yourself that your function produces meaningful results. 

function shareholderReturns5(exitValue) {

    let remainder;

    // remainder calculation
    remainder = exitValue - prefAInvestorsLiqPref - prefBInvestorsLiqPref - prefCInvestorsLiqPref;

    // pro rata calculations
    let foundersProRata = remainder * ownershipDistribution.founders;
    let prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
    let prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
    let prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

    // total return calculations
    let foundersTotalReturn = foundersLiqPref + foundersProRata;
    let prefAInvestorsTotalReturn = prefAInvestorsLiqPref + prefAInvestorsProRata;
    let prefBInvestorsTotalReturn = prefBInvestorsLiqPref + prefBInvestorsProRata;
    let prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;
    // Now, the option to convert to Common shares comes into play.
    if (prefCInvestorsTotalReturn >= (prefCInvestorsLiqPref * 2)) { // Has Series C reached cap? If so, so have B and A.
        
        console.log('C reached cap');
        console.log('Which means B also reached cap');
        console.log('Which means A also reached cap');

        // give C, B, and A their cap as total return
        prefCInvestorsTotalReturn = (prefCInvestorsLiqPref * 2);
        prefBInvestorsTotalReturn = (prefBInvestorsLiqPref * 2);
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        //////////////
        // CHECK IF COMMON SHARES ARE WORTH MORE FOR C

        // caluclate the remainder to distribute among the others pro-rata
        remainder = exitValue;

        // calculate pro rata amounts
        prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

        // recalculate total return 
        let prefCInvestorsTotalReturnCommon = prefCInvestorsProRata;

        ///////////

        if (prefCInvestorsTotalReturnCommon >= prefCInvestorsTotalReturn) { // Would C earn more converting to common shares than taking double their preference?
            console.log('C will convert to common shares which is ' , prefCInvestorsTotalReturnCommon);

            prefCInvestorsTotalReturn = prefCInvestorsTotalReturnCommon;

            remainder = exitValue - prefCInvestorsTotalReturn;

            // recalculate new amount of shares without C b/c they converted to common
            numOfShares = numOfShares - capTable[0].prefCInvestorsShares;

            // recalculate ownership distribution based off new amount of shares
            ownershipDistribution.prefBInvestors = (capTable[0].prefBInvestorsShares / numOfShares);

            // calculate pro rata amounts
            prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;

            // recalculate total return 
            let prefBInvestorsTotalReturnCommon = prefBInvestorsProRata;

            if (prefBInvestorsTotalReturnCommon >= prefBInvestorsTotalReturn) { // Would B earn more converting to common shares than taking double their preference?
                console.log('B will convert to common shares');

                prefBInvestorsTotalReturn = prefBInvestorsTotalReturnCommon;

                remainder = remainder - prefBInvestorsTotalReturn;

                // recalculate new amount of shares without C and B b/c they converted to common
                numOfShares = numOfShares - capTable[0].prefBInvestorsShares;

                // recalculate ownership distribution based off new amount of shares
                ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
                ownershipDistribution.prefAInvestors = (capTable[0].prefAInvestorsShares / numOfShares);

                // calculate pro rata amounts
                foundersProRata = remainder * ownershipDistribution.founders;
                prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;

                // recalculate total return 
                let prefAInvestorsTotalReturnCommon = prefAInvestorsProRata;

                if (prefAInvestorsTotalReturnCommon >= prefAInvestorsTotalReturn) { // Would A earn more converting to common shares than taking double their preference?
                    console.log('A will convert to common shares');
    
                    prefAInvestorsTotalReturn = prefAInvestorsTotalReturnCommon;
                    remainder = remainder - prefAInvestorsTotalReturn;
                    
                    foundersTotalReturn = remainder;
                }
            }

        } else {
            console.log('C will stick with 2x their pref since it is more than converting to common and earning ', prefCInvestorsTotalReturnCommon)
            //////////////
            // CHECK IF COMMON SHARES ARE WORTH MORE FOR B
            // caluclate the remainder to distribute among the others pro-rata
            remainder = remainder - prefCInvestorsTotalReturn;

            // calculate pro rata amounts
            prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;

            // recalculate total return 
            let prefBInvestorsTotalReturnCommon = prefBInvestorsProRata;

            ///////////

            if (prefBInvestorsTotalReturnCommon >= prefBInvestorsTotalReturn) { // Would B earn more converting to common shares than taking double their preference?
                console.log('B will convert to common shares');

                prefBInvestorsTotalReturn = prefBInvestorsTotalReturnCommon;

            } else {
                console.log('B will stick with 2x their pref since it is more than converting to common and earning ', prefBInvestorsTotalReturnCommon);
    
                // CHECK IF COMMON SHARES ARE WORTH MORE FOR A
    
                // calculate new amount of shares
                numOfShares = numOfShares - capTable[0].prefBInvestorsShares - capTable[0].prefCInvestorsShares;
    
                // caluclate the remainder to distribute among the others pro-rata
                remainder = remainder - prefBInvestorsTotalReturn;
    
                // recalculate ownership distribution based off new amount of shares
                ownershipDistribution.prefAInvestors = (capTable[0].prefAInvestorsShares / numOfShares);
    
                // calculate pro rata amounts
                prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
    
                // recalculate total return 
                let prefAInvestorsTotalReturnCommon = prefAInvestorsProRata;
    
    
                if (prefAInvestorsTotalReturnCommon >= prefAInvestorsTotalReturn) { // Would A earn more converting to common shares than taking double their preference?
                    console.log('A will convert to common shares');
    
                    prefAInvestorsTotalReturn = prefAInvestorsTotalReturnCommon;
                    foundersTotalReturn = exitValue - prefAInvestorsTotalReturn - prefBInvestorsTotalReturn - prefCInvestorsTotalReturn;
    
                } else {
                    console.log('A will stick with 2x their pref since its more than converting to common and earning ', prefAInvestorsTotalReturnCommon);
                    // calculate new amount of shares
                    numOfShares = numOfShares - capTable[0].prefAInvestorsShares;
    
                    // recalculate ownership distribution based off new amount of shares
                    ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
                    ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);
    
                    // caluclate the remainder to distribute among the remaining groups pro-rata
                    remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsTotalReturn - prefCInvestorsLiqPref;
    
                    // calculate pro rata amounts for remaining groups
                    foundersProRata = remainder * ownershipDistribution.founders;
                    prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;
    
                    // recalculate total return for remaining groups
                    foundersTotalReturn = foundersLiqPref + foundersProRata;
                    prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;
                }
        
            }
        }
            
    } else if (prefBInvestorsTotalReturn >= (prefBInvestorsLiqPref * 2)) { // Has Series B reached cap? If so, so has A.

        console.log('C didnt reach cap... but B reached cap');
        console.log('Which means A also reached cap');

        // give B and A their cap as total return
        prefBInvestorsTotalReturn = (prefBInvestorsLiqPref * 2);
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        //////////////
        // CHECK IF COMMON SHARES ARE WORTH MORE FOR B

        // caluclate the remainder to distribute among the others pro-rata
        remainder = exitValue - prefCInvestorsLiqPref;

        // calculate pro rata amounts
        foundersProRata = remainder * ownershipDistribution.founders;
        prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
        prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

        // recalculate total return 
        foundersTotalReturn = foundersLiqPref + foundersProRata;
        let prefBInvestorsTotalReturnCommon = prefBInvestorsProRata;
        prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

        ///////////

        if (prefBInvestorsTotalReturnCommon >= prefBInvestorsTotalReturn) { // Would B earn more converting to common shares than taking double their preference?
            console.log('B will convert to common shares');

            prefBInvestorsTotalReturn = prefBInvestorsTotalReturnCommon;

        } else {
            console.log('B will stick with 2x their pref since it is more than converting to common and earning ', prefBInvestorsTotalReturnCommon);

            // CHECK IF COMMON SHARES ARE WORTH MORE FOR A

            // calculate new amount of shares
            numOfShares = numOfShares - capTable[0].prefBInvestorsShares;

            // caluclate the remainder to distribute among the others pro-rata
            remainder = remainder - prefBInvestorsTotalReturn;

            // recalculate ownership distribution based off new amount of shares
            ownershipDistribution.prefAInvestors = (capTable[0].prefAInvestorsShares / numOfShares);
            ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);
            ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);

            // calculate pro rata amounts
            prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
            foundersProRata = remainder * ownershipDistribution.founders;
            prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

            // recalculate total return 
            let prefAInvestorsTotalReturnCommon = prefAInvestorsProRata;
            foundersTotalReturn = foundersLiqPref + foundersProRata;
            prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

            if (prefAInvestorsTotalReturnCommon >= prefAInvestorsTotalReturn) { // Would A earn more converting to common shares than taking double their preference?
                console.log('A will convert to common shares');

                prefAInvestorsTotalReturn = prefAInvestorsTotalReturnCommon;

            } else {
                console.log('A will stick with 2x their pref since it is more than converting to common and earning ', prefAInvestorsTotalReturnCommon);
                // calculate new amount of shares
                numOfShares = numOfShares - capTable[0].prefAInvestorsShares;

                // recalculate ownership distribution based off new amount of shares
                ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
                ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

                // calculate pro rata amounts for remaining groups
                foundersProRata = remainder * ownershipDistribution.founders;
                prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

                // recalculate total return for remaining groups
                foundersTotalReturn = foundersLiqPref + foundersProRata;
                prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;
            }
    
        }

    } else if (prefAInvestorsTotalReturn >= (prefAInvestorsLiqPref * 2)) { // Has Series A reached cap?

        console.log('C and B didnt reach cap... Only A reached cap');

        // give A their cap as total return
        prefAInvestorsTotalReturn = (prefAInvestorsLiqPref * 2);

        // calculate new amount of shares
        numOfShares = numOfShares - capTable[0].prefAInvestorsShares;

        // recalculate ownership distribution based off new amount of shares
        ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
        ownershipDistribution.prefBInvestors = (capTable[0].prefBInvestorsShares / numOfShares);
        ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

        // caluclate the remainder to distribute among the others pro-rata
        remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsLiqPref - prefCInvestorsLiqPref;

        // calculate pro rata amounts
        foundersProRata = remainder * ownershipDistribution.founders;
        prefAInvestorsProRata = remainder * ownershipDistribution.prefAInvestors;
        prefBInvestorsProRata = remainder * ownershipDistribution.prefBInvestors;
        prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

        // recalculate total return 
        foundersTotalReturn = foundersLiqPref + foundersProRata;
        prefAInvestorsTotalReturn = prefAInvestorsLiqPref + prefAInvestorsProRata;
        prefBInvestorsTotalReturn = prefBInvestorsLiqPref + prefBInvestorsProRata;
        prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;

        let prefAInvestorsTotalReturnCommon = prefAInvestorsProRata;

            if (prefAInvestorsTotalReturnCommon > prefAInvestorsTotalReturn) { // Would A earn more converting to common shares than taking double their preference?
                console.log(' A will convert to common shares');

                prefAInvestorsTotalReturn = prefAInvestorsTotalReturnCommon;

            } else {
                console.log('A will stick with 2x their pref since its more than converting to common and earning ', prefAInvestorsTotalReturnCommon);
                // calculate new amount of shares
                numOfShares = numOfShares - capTable[0].prefAInvestorsShares;
                console.log(numOfShares, ' should be 2.5m');

                // recalculate ownership distribution based off new amount of shares
                ownershipDistribution.founders = (capTable[0].commonShares / numOfShares);
                ownershipDistribution.prefCInvestors = (capTable[0].prefCInvestorsShares / numOfShares);

                // caluclate the remainder to distribute among the remaining groups pro-rata
                remainder = exitValue - prefAInvestorsTotalReturn - prefBInvestorsTotalReturn - prefCInvestorsLiqPref;

                // calculate pro rata amounts for remaining groups
                foundersProRata = remainder * ownershipDistribution.founders;
                prefCInvestorsProRata = remainder * ownershipDistribution.prefCInvestors;

                // recalculate total return for remaining groups
                foundersTotalReturn = foundersLiqPref + foundersProRata;
                prefCInvestorsTotalReturn = prefCInvestorsLiqPref + prefCInvestorsProRata;
            }

    } // else if none have reached cap, the initial calculations from the top of the function will be valid.

    console.log('At an exit value of €' + exitValue + ', the returns are:')

    console.log('Founders return: €', foundersTotalReturn);
    console.log('Preferred A Investors return: €', prefAInvestorsTotalReturn);
    console.log('Preferred B Investors return: €', prefBInvestorsTotalReturn);
    console.log('Preferred C Investors return: €', prefCInvestorsTotalReturn);
    
}

console.log('------------------');
console.log('Stage 5');
console.log('------------------');
shareholderReturns5(47000000);
// shareholderReturns5(50000000);
// shareholderReturns5(70000000);
console.log('\n');


// Stage 6: Compute the exit distribution at €39m, €44m, and €47m.
// If the company is sold at these valuations, some effects come into play that aren’t intuitive at first. Can you spot them and make your function return correct results?
// It might help to calculate these distributions “by hand” to get a feeling of what’s going on.

// console.log('------------------');
// console.log('Stage 6');
// console.log('------------------');
// shareholderReturns(39000000);
// shareholderReturns(44000000);
// shareholderReturns(47000000);