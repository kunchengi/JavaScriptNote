// 迭代器接口
interface Iterator1 {
    // 判断是否还有下一个元素
    hasNext(): boolean;
    // 返回下一个元素
    next(): any;
}

// 具体迭代器类
class ConcreteIterator implements Iterator1 {
    // 当前元素索引
    private index: number = 0;

    // 待迭代的集合
    private list: any[];

    constructor(list: any[]) {
        this.list = list;
    }

    public hasNext(): boolean {
        return this.index < this.list.length;
    }

    public next(): any {
        // 如果没有下一个元素，返回{ done: true }
        if (!this.hasNext()) {
            return { done: true }
        }
        // 返回下一个元素
        return { done: false, value: this.list[this.index++] }
    }
}

// 聚合接口
interface Aggregate {
    // 迭代器方法
    [Symbol.iterator](): Iterator1;
}

// 具体聚合类
class ConcreteAggregate implements Aggregate {
    // 待迭代的集合
    private list: any[];

    constructor(list: any[]) {
        this.list = list;
    }

    public [Symbol.iterator]() {
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