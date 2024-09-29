import Point from './Point.js';
export class Line {
    constructor() {
        this.start = new Point();
        this.end = new Point();
    }
    getLength() {
        return Math.sqrt(Math.pow(this.start.x - this.end.x, 2) + Math.pow(this.start.y - this.end.y, 2));
    }
}