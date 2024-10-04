/**
 * @description 将目标对象合并到源对象
 * @param target 目标对象
 * @return void
 * @status public
 */
function assign(target, ...sourceArr) {
    for(var source of sourceArr)
    {
        for (var key in source) {
            if(source.hasOwnProperty(key))
            {
                target[key] = source[key];
            }
        }
    }
    return target;
}

const obj1 = { a: 1 , b: [5] };
const obj2 = { b: 2 , c: 3 };
const obj3 = { c: 4, d: 5};

const result = assign(obj1, obj2, obj3);

console.log(result);// { a: 1, b: 2, c: 4, d: 5 }
console.log(obj1);// { a: 1, b: 2, c: 4, d: 5 }
