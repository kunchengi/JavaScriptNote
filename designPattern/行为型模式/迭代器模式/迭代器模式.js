// 具体迭代器类
class ConcreteIterator {
    constructor(list) {
        // 当前元素索引
        this.index = 0;
        this.list = list;
    }
    hasNext() {
        return this.index < this.list.length;
    }
    next() {
        // 如果没有下一个元素，返回{ done: true }
        if (!this.hasNext()) {
            return { done: true };
        }
        // 返回下一个元素
        return { done: false, value: this.list[this.index++] };
    }
}
// 具体聚合类
class ConcreteAggregate {
    constructor(list) {
        this.list = list;
    }
    [Symbol.iterator]() {
        // 返回当前集合的迭代器
        return new ConcreteIterator(this.list);
    }
}
const aggregate = new ConcreteAggregate([1, 2, 3, 4, 5]);
// 可以通过for of 迭代对象
for (let item of aggregate) {
    console.log(item);
}
/**
 * 输出：
 * 1
 * 2
 * 3
 * 4
 * 5
 */ 
