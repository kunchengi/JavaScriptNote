/**
 * @description 数组差集
 * @param {Array} arr1 数组1
 * @param {Array} arr2 数组2
 * @return void
 * @status public
 */
function difference(arr1, arr2) 
{
  return arr1.filter(item => !arr2.includes(item));
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];

console.log(difference(arr1, arr2));// [1, 2, 3]