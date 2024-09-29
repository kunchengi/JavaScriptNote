// 合并导出多个模块，可能会有重名模块问题
// import AgeNumber, { NumberHelper } from "./NumberHelper.js";
// import { pointHelper } from "./PointHelper.js";
// import Point from "./data/Point.js";
// import * as Enums from "./data/DataEnum.js";
// export {AgeNumber, NumberHelper, pointHelper, Point, Enums}

// 用以下方式防止导出重名模块
import * as NumberHelper from "./NumberHelper.js";
import * as pointHelper from "./PointHelper.js";
import * as Point from "./data/Point.js";
import * as Enums from "./data/DataEnum.js";
export {NumberHelper, pointHelper, Point, Enums}