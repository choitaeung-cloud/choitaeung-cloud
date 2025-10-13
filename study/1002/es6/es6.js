const nums = [1, 2, 3, 4];

const squares = nums.map(n => n ** 2);
console.log(`squares: ${squares}`);

const evens = nums.filter((n => n % 2 === 0));
console.log(`evens :${evens}`);

const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(`nums :${sum}`);

const found = nums.find((n) => n > 2);
console.log(`found :${found}`);

const hasNegative = nums.some(n => n < 0);
console.log(`hasNegative :${hasNegative}`);

const allPositive = nums.every(n => n >0);
console.log(`allPositive :${allPositive}`);

const nested = [1, 2, 3];
const duplicated = nested.flatMap((n) => [n, n]);
console.log(`duplicated :${duplicated}`);


