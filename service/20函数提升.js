/**
 * js会自动提升函数声明，但不会提升函数表达式
 */
foo(); // foo1，在函数声明前可以调用函数
function foo() {
    console.log('foo1');
}
// bar(); // TypeError: bar is not a function，在函数表达式前调用函数会报错
let bar = function() {
    console.log('bar1');
}