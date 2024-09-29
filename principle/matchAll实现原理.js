
function matchAll(str, reg) {
    let matchs = [];
    let match = reg.exec(str);
    while (match) {
        matchs.push(match);
        match = reg.exec(str);
    }
    return matchs;
}

let h = '<h1>标题1</h1><h1>标题2</h1>';
let reg = /<h1>(.+?)<\/h1>/g;
let matchs = h.matchAll(reg);
// 输出1：['<h1>标题1</h1>', '标题1', index: 0, input: '<h1>标题1</h1><h1>标题2</h1>', groups: undefined]
// 输出2：['<h1>标题2</h1>', '标题2', index: 12, input: '<h1>标题1</h1><h1>标题2</h1>', groups: undefined]
for (let match of matchs) {
    console.log(match);
}