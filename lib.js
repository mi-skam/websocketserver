/*
 * generate a number in the range of 0..current index
 * pick a random card from the shuffled ones and put it at the next free slot shuffled[i]
 * put the current card at the new empty slot (shuffle[rand])
 */

function shuffle(xs) {
  let shuffled = [];

  xs.forEach((value, i) => {
    let rand = Math.floor(Math.random() * (i + 1));
    shuffled[i] = shuffled[rand];
    shuffled[rand] = value;
  });

  return shuffled;
}

/*
 * take n-length samples of a shuffled list
 */
function randomSample(xs, n) {
    let shuffledList = shuffle(xs);
    return shuffledList.slice(0, n)
}

function takeSamples(xs, n) {
    let samples = [];
    while (samples.length < n) {
        samples.push(shuffle(xs));
    }
    return samples;
}
/*
 * example usage: pick(THINGS)(5) creates a list of 5 things with a star in front
 */
function pick(xs) {
    return (amount) => {
        return randomSample(xs, amount)
            .forEach((elem) => console.log(`* ${elem}`))
    }
}

module.exports = {
    shuffle,
    randomSample,
    takeSamples,
    pick
}