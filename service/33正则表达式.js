/**
 * 元字符（特殊字符）：
 * .表示除了换行符之外的任意字符
 * \d表示数字
 * \D表示非数字
 * \s表示空白字符,包括空格、制表符、换页符、换行符和其他Unicode空格
 * \S表示非空白字符
 * \w表示单词字符，包括字母、数字、下划线
 * \W表示非单词字符
 * 开始边界 ^ ，检测字符串是否以某个条件开始
 * 结束边界 $ ，检测字符串是否以某个条件结束
 * 或者 | ，只要满足 | 两边的任意一个表达式即可
 * 匹配所有字符，包括换行符:/[\s\S]/
 * 
 * 转义字符：
 * 在//里用\转义，如：/\./;
 * RegExp里需要使用\\进行转义，因为字符串里也需要转义，如：new RegExp('\\.')
 * 
 * 量词，表示重复次数：
 * {n} 表示重复n次
 * {n,} 表示重复n次或者更多次
 * {n,m} 表示重复n到m次
 * * 表示重复0次或者更多次，等价于{0,}
 * ? 表示重复0次或者1次，等价于{0,1}
 * + 表示重复1次或者更多次，等价于{1,}
 * 禁止贪婪模式，量词后面加上?表示禁止贪婪模式，尽可能少的匹配
 * 
 * 可以使用正则的方法：
 *  字符串对象的方法：
 *      match方法，返回匹配的字符串
 *          如果没有g模式则只返回第一个匹配的字符串，返回的数组里有index和input属性
 *          如果有g模式则以数组的形式返回所有匹配的字符串         
 *          如果没有匹配的字符串则返回null
 *      matchAll全局匹配方法，返回一个迭代器，可以遍历所有匹配的字符串
 *      replace方法，替换匹配到字符串
 *      search方法，返回第一个匹配的索引位置
 *      split方法，根据正则表达式分割字符串
 *  正则表达式对象的方法：
 *      test方法，检测字符串是否满足正则表达式
 *      exec方法，返回匹配的字符串，并更新正则表达式对象的一些属性。
 *          如果没有匹配的字符串则返回null
 *          如果有g/y模式则每次exec后会更新lastIndex，下次执行exec会从lastIndex开始匹配
 *          可以设置lastIndex属性，下一次匹配的起始位置
 * 
 * 模式：
 * i模式，忽略大小写
 * g模式，全局匹配，会查找整个字符串中所有匹配的子串
 * 模式可以组合使用
 * m模式，多行匹配
 * u模式，Unicode模式
 * y模式，粘连模式
 *  从上一个 lastIndex 属性指定的索引位置开始匹配，且必须从指定位置开始匹配成功才算匹配成功。
 * g模式和y模式的区别：
 *  g模式是全局匹配，会查找整个字符串中所有匹配的子串
 *  y模式是粘连匹配，从上一个 lastIndex 属性指定的索引位置开始匹配，且必须从指定位置开始匹配成功才算匹配成功。
 * 
 * 原子表和原子组：
 * 原子表[]，匹配方括号中的任意一个字符
 *  原子表里的^表示非，匹配除了方括号中的字符之外的任意字符
 *  原子表里的 - 表示范围
 *  原子表里不解析元字符，除了^，-，\，]，^表示非，-表示范围，\转义，]表示结束
 * 原子组()，将括号中的内容当做一个整体
 *  正则里可以直接使用编号的组，\1表示第一个组，\2表示第二个组
 *      如：/<(h1)>(.+)<\/\1>/
 *  在replace方法中可以用$引用对应组匹配的信息
 *      $1表示第一个组，$2表示第二个组
 *          如：'<h1>标题</h1>'.replace(reg, '<p>$2</p>')
 *      $&表示整个匹配的字符串
 *      $`表示匹配结果之前的字符串
 *      $'表示匹配结果之后的字符串
 *      也可以用函数返回替换的内容，第一个参数是匹配的字符串，后面的参数是组匹配的内容
 *          如：'<h1>标题</h1>'.replace(reg, (match, ...args) => `<p>${args[1]}</p>`)
 *  组里可以嵌套组
 *  ?: 不记录组，不会在匹配的结果里返回这个组，且不能使用编号引用这个组
 *  别名组，可以给组起一个名字。?<name>，获取匹配结果的时候可以通过groups.name获取这个组的内容
 * 
 * 断言：
 * ?= 断言后面的字符
 * ?! 断言后面不是的字符
 * ?<= 断言前面的字符
 * ?<! 断言前面不是的字符
 */

// 或者 | ，只要满足 | 两边的任意一个表达式即可
// 检测字符串是否有txt或者jpg
let reg = /txt|jpg/;
// 也可以new RegExp
// reg = new RegExp('txt|jpg');
// test方法检测字符串是否满足正则表达式
console.log(reg.test('a.txt')); // true
console.log(reg.test('a.jpg')); // true
console.log(reg.test('a.txt.jpg')); // true
console.log(reg.test('a.png')); // false

console.log("元字符（特殊字符）：");
// .表示除了换行符之外的任意字符
// 检测字符串是否有任意字符
reg = /./;
console.log(reg.test('a')); // true
console.log(reg.test(' ')); // true
console.log(reg.test('\n')); // false

// \d表示数字
// 检测字符串是否有数字
reg = /\d/;
console.log(reg.test('a')); // false
console.log(reg.test('1')); // true

// \D表示非数字
// 检测字符串是否有非数字
reg = /\D/;
console.log(reg.test('a')); // true
console.log(reg.test('1')); // false

// \s表示空白字符,包括空格、制表符、换页符、换行符和其他Unicode空格
// 检测字符串是否有空白字符
reg = /\s/;
console.log(reg.test('a')); // false
console.log(reg.test(' ')); // true
console.log(reg.test('\n')); // true

// \S表示非空白字符
// 检测字符串是否有非空白字符
reg = /\S/;
console.log(reg.test('a')); // true
console.log(reg.test(' ')); // false

// \w表示单词字符，包括字母、数字、下划线
// 检测字符串是否有单词字符
reg = /\w/;
console.log(reg.test('a')); // true
console.log(reg.test('1')); // true
console.log(reg.test('_')); // true
console.log(reg.test(' ')); // false

// \W表示非单词字符
// 检测字符串是否有非单词字符
reg = /\W/;
console.log(reg.test('a')); // false
console.log(reg.test(' ')); // true

// 开始边界 ^ ，检测字符串是否以某个条件开始
// 检测字符串是否以a开始
reg = /^a/;
console.log(reg.test('ab')); // true
console.log(reg.test('ba')); // false

// 结束边界 $ ，检测字符串是否以某个条件结束
// 检测字符串是否以a结束
reg = /a$/;
console.log(reg.test('ab')); // false
console.log(reg.test('ba')); // true

// 匹配所有字符，包括换行符
reg = /[\s\S]/;// 或者 /[\d\D]/ /[\w\W] /[^] /[\s\S] /[\d\D] /[\w\W]
console.log(reg.test('a')); // true
console.log(reg.test(' ')); // true
console.log(reg.test('\n')); // true

console.log("转义字符：");
// 转义字符\
// 检测字符串是否有.
reg = /\./;
console.log(reg.test('a')); // false
console.log(reg.test('.')); // true

// RegExp里需要使用\\进行转义，因为字符串里也需要转义，比如'\d' == 'd'
console.log('\d' == 'd'); // true
console.log('\\.');// \.
reg = new RegExp('\\.');
console.log(reg.test('a')); // false
console.log(reg.test('.')); // true

console.log("量词：");
// 量词，表示重复次数
// {n} 表示重复n次
// 获取字符串中的第一个单词字符
reg = /\w{1}/;
console.log('hello world'.match(reg)); // ['h', index: 0, input: 'hello world', groups: undefined]

// {n,} 表示重复n次或者更多次
// 获取字符串中的第一个单词
reg = /\w{1,}/;
console.log('hello world'.match(reg)); // ['hello', index: 0, input: 'hello world', groups: undefined]

// {n,m} 表示重复n到m次
// 获取字符串中长度为3到5的单词
reg = /\w{4,5}/g;
console.log('hello world you are right'.match(reg)); // ['hello', 'world', 'right']

// * 表示重复0次或者更多次，等价于{0,}
// 获取字符串中的http或者https或者httpss
reg = /https*/;
console.log('http://www.baidu.com'.match(reg)); // ['http', index: 0, input: 'http://www.baidu.com', groups: undefined]
console.log('https://www.baidu.com'.match(reg)); // ['https', index: 0, input: 'https://www.baidu.com', groups: undefined]
console.log('httpss://www.baidu.com'.match(reg)); // ['httpss', index: 0, input: 'httpss://www.baidu.com', groups: undefined]

// ? 表示重复0次或者1次，等价于{0,1}
// 获取字符串中的http或者https
reg = /https?/;
console.log('http://www.baidu.com'.match(reg)); // ['http', index: 0, input: 'http://www.baidu.com', groups: undefined]
console.log('https://www.baidu.com'.match(reg)); // ['https', index: 0, input: 'https://www.baidu.com', groups: undefined]
console.log('httpss://www.baidu.com'.match(reg)); // ['https', index: 0, input: 'httpss://www.baidu.com', groups: undefined]

// + 表示重复1次或者更多次，等价于{1,}
// 获取字符串中的第一个单词
reg = /\w+/;
console.log('hello world'.match(reg)); // ['hello', index: 0, input: 'hello world', groups: undefined]

// 禁止贪婪模式，量词后面加上?表示禁止贪婪模式，尽可能少的匹配
// 获取字符串中的第一个字符
reg = /\w+?/;
console.log('hello world'.match(reg)); // ['h', index: 0, input: 'hello world', groups: undefined]
// 禁止贪婪的使用
let h = '<h1>标题1</h1><h1>标题2</h1>';
// 没禁止贪婪模式，会匹配<h1>标题1</h1><h1>标题2</h1>
reg = /<h1>.+<\/h1>/g;
console.log(h.match(reg)); // ['<h1>标题1</h1><h1>标题2</h1>']
// 禁止贪婪，尽可能的少匹配，会匹配<h1>标题1</h1>
reg = /<h1>.+?<\/h1>/g;
console.log(h.match(reg)); // ['<h1>标题1</h1>', '<h1>标题2</h1>']

console.log("可以使用正则的方法：");
// 字符串对象的方法
// match方法，返回匹配的字符串
reg = /\d/;
// 如果没有g模式则只返回第一个匹配的字符串，返回的数组里有index和input属性
console.log('a1b2c3'.match(reg)); // [ '1', index: 1, input: 'a1b2c3', groups: undefined ]
// 如果没有匹配的字符串则返回null
console.log('abc'.match(reg)); // null
// 如果有g模式则以数组的形式返回所有匹配的字符串
// g模式，全局匹配，会查找整个字符串中所有匹配的子串
// 获取字符串中所有的数字
reg = /\d/g;
console.log('a1b2c3'.match(reg)); // [ '1', '2', '3' ]

// matchAll全局匹配方法，返回一个迭代器，可以遍历所有匹配的字符串
h = '<h1>标题1</h1><h1>标题2</h1>';
reg = /<h1>(.+?)<\/h1>/g;
let matchs = h.matchAll(reg);
// 输出1：['<h1>标题1</h1>', '标题1', index: 0, input: '<h1>标题1</h1><h1>标题2</h1>', groups: undefined]
// 输出2：['<h1>标题2</h1>', '标题2', index: 12, input: '<h1>标题1</h1><h1>标题2</h1>', groups: undefined]
for (let match of matchs) {
    console.log(match);
}

// replace方法，替换字符串
// 将所有的-替换成/
reg = /-/g;
console.log('2021-01-01'.replace(reg, '/')); // 2021/01/01

// search方法，返回第一个匹配的索引位置
reg = /\d/;
console.log('a1b2c3'.search(reg)); // 1
console.log('abc'.search(reg)); // -1

// split方法，根据正则表达式分割字符串
// 拆分-或者/
reg = /[-\/]/;
console.log('2021-01/01'.split(reg)); // [ '2021', '01', '01' ]

// 正则表达式对象的方法
// test方法，检测字符串是否满足正则表达式
// 检测字符串是否有数字
reg = /\d/;
console.log(reg.test('a')); // false
console.log(reg.test('11')); // true

// exec方法，返回匹配的字符串，并更新正则表达式对象的一些属性。
reg = /\d/;
console.log(reg.exec('a1b2c3')); // [ '1', index: 1, input: 'a1b2c3', groups: undefined ]
// 如果没有匹配的字符串则返回null
console.log(reg.exec('abc')); // null
// 正则表达式有lastIndex属性，表示下一次匹配的起始位置
// 如果有g/y模式则每次exec后会更新lastIndex，下次执行exec会从lastIndex开始匹配
console.log(reg.lastIndex);// 0
reg = /\d/g;
console.log(reg.exec('a1b2c3')); // [ '1', index: 1, input: 'a1b2c3', groups: undefined ]
console.log(reg.lastIndex);// 2
// 可以设置lastIndex属性，下一次匹配的起始位置
reg.lastIndex = 4;
console.log(reg.exec('a1b2c3')); // ['3', index: 5, input: 'a1b2c3', groups: undefined]

console.log("模式：");
// i模式，忽略大小写
// 检测字符串是否有a或者A
reg = /a/i;
console.log(reg.test('a')); // true
console.log(reg.test('A')); // true
console.log(reg.test('b')); // false

// g模式，全局匹配，会查找整个字符串中所有匹配的子串
// match方法返回匹配的字符串
reg = /\d/;
// 如果没有g模式则只返回第一个匹配的字符串，返回的数组里有index和input属性
console.log('a1b2c3'.match(reg)); // [ '1', index: 1, input: 'a1b2c3', groups: undefined ]
// 如果没有匹配的字符串则返回null
console.log('abc'.match(reg)); // null
// 如果有g模式则以数组的形式返回所有匹配的字符串
// 获取字符串中所有的数字
reg = /\d/g;
console.log('a1b2c3'.match(reg)); // [ '1', '2', '3' ]

// 模式可以组合使用
// 获取字符串中所有的数字和a字符，i模式忽略大小写
reg = /[a\d]/gi;// 无顺序，也可以写成/[a\d]/ig
console.log('a1b2c3'.match(reg)); // ['a', '1', '2', '3']

// m模式，多行匹配
// 匹配每一行的第一个单词
reg = /^\w+/gm;
let str = `
Hello world
This is a test
Goodbye world
`;
console.log(str.match(reg)); // [ 'Hello', 'This', 'Goodbye' ]

// u模式，Unicode模式
// 匹配中文
reg = /\p{sc=Han}/gu;
console.log('你好,hello'.match(reg)); // [ '你', '好' ]
reg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
str = '这是一个测试𠀀';
console.log(str.match(reg)); // [ '𠀀' ]

// y模式，粘连模式
// 从上一个 lastIndex 属性指定的索引位置开始匹配，且必须从指定位置开始匹配成功才算匹配成功。
reg = /\d+/y;
str = 'a1b2c3';
// 如果从lastIndex开始匹配不到满足条件的子串则返回null，并且lastIndex属性会重置为0
console.log(reg.exec(str));
// 如果匹配到则返回匹配的字符串
str = '11b22c33';
console.log(reg.exec(str)); // [ '1', index: 0, input: '1b2c3', groups: undefined ]
console.log(reg.lastIndex);// 2
console.log(reg.exec(str)); // null
console.log(reg.lastIndex);// 0

console.log("原子表和原子组：");
// 原子表[]，匹配方括号中的任意一个字符
// 检测字符串是否有a或者b或者c
reg = /[abc]/;
console.log(reg.test('a')); // true
console.log(reg.test('b')); // true
console.log(reg.test('d')); // false

// 原子表里的^表示非，匹配除了方括号中的字符之外的任意字符
// 检测字符串是否有非a或者b或者c
reg = /[^abc]/;
console.log(reg.test('a')); // false
console.log(reg.test('b')); // false
console.log(reg.test('d')); // true

// 原子表里的 - 表示范围，[a-z]表示a到z的任意字符
// 检测字符串是否有a到z的任意字符
reg = /[a-z]/;
console.log(reg.test('a')); // true
console.log(reg.test('1')); // false

// 原子表里不解析元字符，除了^，-，\，]，^表示非，-表示范围，\转义，]表示结束
// 检测字符串是否有.或者+
reg = /[.+]/;
console.log(reg.test('.')); // true
console.log(reg.test('+')); // true
console.log(reg.test('a')); // false

// 原子组()，将括号中的内容当做一个整体
// 检测字符串是否有abe或者cde
reg = /(ab|cd)e/;
console.log(reg.test('abe')); // true
console.log(reg.test('cde')); // true
console.log(reg.test('ade')); // false

// 正则里可以直接使用编号的组，\1表示第一个组，\2表示第二个组
// 获取h1标签里的内容
reg = /<(h1)>(.+)<\/\1>/;
let h1 = '<h1>标题</h1><span>内容</span>';
console.log(h1.match(reg)); // [ '<h1>标题</h1>', 'h1', '标题', index: 0, input: '<h1>标题</h1><span>内容</span>', groups: undefined ]
// 将h1标签里的内容替换为p标签

// 在replace方法中可以用$引用对应组匹配的信息，$1表示第一个组，$2表示第二个组
// 将<h1>标题</h1>替换成<p>标题</p>
console.log(h1.replace(reg, '<p>$2</p>')); // <p>标题</p><span>内容</span>

// $&表示整个匹配的字符串
console.log(h1.replace(reg, '<p>$&</p>')); // <p><h1>标题</h1></p><span>内容</span>

// $`表示匹配结果之前的字符串
h1 = 'aaa<h1>标题</h1><span>内容</span>';
console.log(h1.replace(reg, '<h1>$`</h1>')); // aaa<h1>aaa</h1><span>内容</span>

// $'表示匹配结果之后的字符串
h1 = '<h1>标题</h1><span>内容</span>';
console.log(h1.replace(reg, '$\'')); // <span>内容</span><span>内容</span>

// 也可以用函数返回替换的内容
console.log(h1.replace(reg, (match, ...args) => `<p>${args[1]}</p>`)); // <p>标题</p><span>内容</span>

// 嵌套组
let div = '<div><h1>标题</h1></div>';
// 获取div里的h1标签里的内容
reg = /<div>(<(h1)>.+<\/\2>)<\/div>/;
console.log(div.match(reg)); // ['<div><h1>标题</h1></div>', '<h1>标题</h1>', 'h1', index: 0, input: '<div><h1>标题</h1></div>', groups: undefined]

// ?: 不记录组，不会在匹配的结果里返回这个组，且不能使用编号引用这个组
reg = /<div>(<(?:h1)>.+<\/h1>)<\/div>/;
console.log(div.match(reg));// ['<div><h1>标题</h1></div>', '<h1>标题</h1>', index: 0, input: '<div><h1>标题</h1></div>', groups: undefined]

// 别名组，可以给组起一个名字。?<name>，获取匹配结果的时候可以通过groups.name获取这个组的内容
reg = /<div>(?<h1><h1>.+<\/h1>)<\/div>/;
let match = div.match(reg);
console.log(match.groups);// {h1: '<h1>标题</h1>'}

console.log("断言：");
// ?= 断言后面的字符
// 匹配bug且后面是.txt的字符串
reg = /bug(?=\.txt)/;
console.log('bug.txt'.match(reg)); // ['bug', index: 0, input: 'bug.txt', groups: undefined]
console.log('bug.doc'.match(reg)); // null

// ?! 断言后面不是的字符
// 匹配bug且后面不是.txt的字符串
reg = /bug(?!\.txt)/;
console.log('bug.txt'.match(reg)); // null
console.log('bug.doc'.match(reg)); // ['bug', index: 0, input: 'bug.doc', groups: undefined]

// ?<= 断言前面的字符
// 匹配.txt且前面是bug的字符串
reg = /(?<=bug)\.txt/;
console.log('bug.txt'.match(reg)); // ['.txt', index: 3, input: 'bug.txt', groups: undefined]
console.log('aaa.txt'.match(reg)); // null

// ?<! 断言前面不是的字符
// 匹配.txt且前面不是bug的字符串
reg = /(?<!bug)\.txt/;
console.log('bug.txt'.match(reg)); // null
console.log('aaa.txt'.match(reg)); // ['.txt', index: 3, input: 'aaa.txt', groups: undefined]

