> ## JavaScript 语言精粹六（JS 方法集）

##### 年年有风 风吹年年 慢慢即漫漫 —— 夏吉尔硕

## 起步：

### 本章节为上章节补充，上个章节以数组为主题，介绍数组的常用方法集，👉[查看数组](https://juejin.cn/post/6914596406879600647)

本章节用于简单描述 `JavaScript` 中数组以外的数据类型的常用方法集。

### **Number**

#### number.toExponential(fractionDigits)

- `toExponential` 方法是把数字类型转化为**指数形**字符串
- `fractionDigits` 可选 20 以内**小数位数**

- 例如：

```javascript
var nums = 1024;
var trs = nums.toExponential(3);
console.log(trs); // 1.024e+3--->1.024*10的3次方
```

#### number.toFixed(fractionDigits)

- `toFixed` 方法是把数字类型转化为**十进制形**字符串
- `fractionDigits` 可选 20 以内**小数位数**

- 例如：

```javascript
var nums = Math.PI;
var trs = nums.toFixed(3);
console.log(trs); //3.142
```

#### number.toPrecision(precision)

- `toPrecision` 方法是把数字类型转化为十进制数形式的字符串
- `precision` 可选 21 以内**数字总数**
- 例如：

```javascript
var nums = Math.PI;
var trs = nums.toPrecision(3);
console.log(trs); // 3.14
```

#### number.toString(radix)

- `toPrecision` 方法是把数字类型转化为字符串
- `radix`控制基数， 可选 2-36 以内,默认为 10
- 也可简写成 `String(number)`
- 例如：

```javascript
var nums = 1024,
  nums2 = 9,
  nums3 = 125;
var trs = nums.toString(2);
var trs2 = nums2.toString(2);
var trs3 = nums2.toString(5);
console.log(trs); // 10000000000-->1*2的10次方
console.log(trs2); //1001
console.log(trs3); //1000
```

### **Function**

#### function.apply(this.Ary , argArray)

- `apply` 方法是调用 `function`,传递一个会绑定到 `this` 上的对象和一个可选数组作为参数
- `apply` 方法被用在 `apply` 调用模式`（apply invocation pattern）`中

- 例如：

```javascript
Function.prototype.fakeBind = function (that) {
  var method = this,
    slice = Array.prototype.slice,
    args = slice.apply(arguments, [1]);
  return function () {
    return method.apply(that, args.concat(slice.apply(arguments, [0])));
  };
};
var test = function () {
  return this.value;
}.fakeBind({ value: 233 });
console.log(test()); // 233
```

### **Object**

#### object.hasOwnProperty(name)

- `hasOwnProperty` 方法是对调用此方法的对象身上的属性进行检查
- 若 `object` 包含一个名为 `name` 的属性，则此方法返回 **true**
- 注：此方法只会检查当前对象，不会进行原型链上属性检查

```javascript
var list = {
  name: "poo",
  gender: "boy",
};
Object.prototype.list = list;
var test = new Object();
console.log(list.hasOwnProperty("name")); // true
console.log(test.hasOwnProperty("name")); // false
console.log(test.list.name); // poo
```

---

- `array.slice(star,end)`
  - `slice` 方法会对数组中指定的一段进行浅复制；
    - 从 `array[star]` 复制到 `array[end]`
    - `end` 为非必须参数，默认值为当前数组的长度
    - 若两参数有任一负值，则会与数组长度相加，试图回正
    - 若 `star` 值大于数组长度，则回返回一个新的空数组

```javascript
let arr = ["first", "second", "third", "fourth"];
// let revArr = arr.slice(1,2); // [ 'second' ]
// let revArr = arr.slice(1,-2); // [ 'second' ]-- -2+4=2
// let revArr = arr.slice(-3,2); // [ 'second' ]-- -3+4=1
```

- `array.sort(comparefn)`
  - `sort` 方法会对数组中的内容进行排序，但不可用于一组数字排序；
  - 因为它回默认元素是字符串进行比较，所以进行排序时往往结果都是错的。
  - 按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序
    > **引自 ——W3school**

```javascript
let arr1 = ["14", "3", "7", "11"];
let arr2 = ["d", "c", "a", "x"];
arr1.sort();
arr2.sort();
console.log(arr1); // [ '11', '14', '3', '7' ]
console.log(arr2); // [ 'a', 'c', 'd', 'x' ]
```

- 补救的方法就是补增一个比较函数
  - 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
  - 若 a 等于 b，则返回 0。
  - 若 a 大于 b，则返回一个大于 0 的值。
    > **引自 ——W3school**

```javascript
let arr3 = ["14", "3", "7", "11"];
arr3.sort(function (a, b) {
  return a - b;
});
console.log(arr3); // [ '3', '7', '11', '14' ]
```

- 修改后对纯数字的排序是解决了，但不适用于参数为字符串类型
  - 那么在函数中需考虑非纯数字的数组，做以下修正

```javascript
var arr4 = ["b", "r", 14, "a", 3, 7, 11];
arr4.sort(function (a, b) {
  if (a === b) return 0;
  if (typeof a === typeof b) return a - b ? -1 : 1;
  return typeof a < typeof b ? -1 : 1;
});
console.log(arr4); // [ 3, 7, 11, 14, 'a', 'b', 'r' ]
```

- `array.splice(star,deleteCount,item..)`
  - `splice` 方法会从数组中易出一个或多个元素，并将新的 `item` 进行替换。
    - `star` 是指移除元素开始的位置
    - `deleteCount` 是指移除的个数
    - 若有额外的参数，则默认会插入到移除元素的位置

```javascript
var arr4 = ["王花花", "赵光光", "李大脚"];
arr4.splice(1, 1, "孙漂亮");
console.log(arr4); // [ '王花花', '孙漂亮', '李大脚' ]
```

- `array.unshift(item..)`
  - `unshift` 方法会把 `item` 插入到数组的开始部分，并且返回数组的新长度

```javascript
var arr5 = ["王花花", "赵光光", "李大脚"];
arr5.unshift("孙漂亮");
console.log(arr5); //[ '孙漂亮', '王花花', '赵光光', '李大脚' ]
```

- - `unshift` 方法可以用如下方式实现

```javascript
var arr6 = ["王花花", "赵光光", "李大脚"];
Array.prototype.fakeunshift = function () {
  this.splice.apply(
    this,
    [0, 0].concat(Array.prototype.slice.apply(arguments))
  );
  return this.length;
};
arr6.fakeunshift("孙漂亮");
console.log(arr6); //[ '孙漂亮', '王花花', '赵光光', '李大脚' ]
```

---

## 总结：

> 本章节描述的是在`JavaScript`语言中的数组的一些核心且常用的知识点，我手写了一些例子加个人总结，同时移除一些正则相关知识点（因为它的时间投入/收获比实在太低了），数组因为内容多单独分一个章节，下个章节总结，`Function、Number、String、Object` 等特性。

```

```
