> > `
> >
> > > > ## JavaScript 语言精粹三

##### 所有过失在未犯以前，都已定下应处的惩罚 - 威廉·莎士比亚《一报还一报》

## 起步：

- `JavaScript` 中极具特色的设计就是其函数的实现了
- 函数：即一组语句，它们是 JS 的基础模块单元，用于代码复用，信息隐藏和组合调用。
- 编程：什么为编程？即把一组需求分解成一组函数和数据结构的技能。
  ***

### 函数对象

- `javascript`中的函数就是对象，对象是‘键值对’的集合，并且隐形的连接到原型对象
  - 对象字面量产生的对象连接到 Object.prototype
  - 函数对象连接到 Function.prototype（此原型对象本身连接到 Object.prototype）
- 函数对象在创建时，都配有一个**prototype** 属性`[Foo.prototype]`，它的值是一个拥有**constructor**属性，且属性值为该函数的对象`[Foo.prototype.constructor==Foo]`
  - 书中的这句话有些拗口且不容易理解，所以我觉得用代码会直观一些

```javascript
/**
 *  Foo() 构造函数
 * Foo.prototype 是构造函数Foo的原型/ 是poo的原型对象
 * poo.__prototype__ 也是指向原型对象
 */
function Foo() {} //构造函数
var poo = new Foo(); //实例化一个对象
console.log(poo.__proto__ === Foo.prototype); //true ,说明是指向同一个原型对象
console.log(poo.__proto__.constructor); //Foo()
console.log(Foo.prototype.constructor); //Foo()
```

### 函数字面量

- 函数对象可通过函数字面量来创建，比如：

```javascript
var add = function (par1, par2) {
  return par1 + par2;
};
```

- 函数字面量分为四个部分
  - 第 1 部分是保留字`function`
  - 第 2 部分是函数名（可省略--匿名函数），函数可通过函数名递归调用自身
  - 第 3 部分是在调用（圆括号）中的一组参数，多个以逗号分隔。这些参数称之为函数中的变量
  - 第 4 部分是在执行（大括号）中的一组语句，它们是函数的主题，在函数调用时依次执行

注：函数字面量可出现在任何允许表达式执行的地方，函数可以定义在另一个函数中，并非**函数除了可以访问自身的参数和变量外，还可以自由访问把它嵌套在自身函数体的复函中的参数和变量**这称之为**闭包**。

- 书中未举例，为便于理解我编写一个简单闭包函数：

```javascript
/**
 * JS的特点就是函数内容可以读取全局/父级里变量
 * 函数外部无法读取函数内部定义的变量（内部声明要加let或var，否则默认声明的是全局变量）
 * 下方parent中的所有变量都是对getname可见的，反之则不成立
 */
function parent() {
  var name = "poo";
  function getname() {
    return name;
  }
  return getname;
}
var Aha = parent();
Aha(); //'poo'
```

#### 函数的调用

> 调用一个函数会暂停当前函数的执行

#### 函数的方法调用模式

- 对象中的值可以通过赋值来进行更新，若属性名已经存在，那么这个属性会被覆盖掉。

```javascript
var father = {
  name: "Potato",
  age: "22",
  son: {
    first: "Tomato",
    second: "cucumber",
  },
};
console.log(father.age); //22
father.age = 23;
console.log(father.age); //23
```

- 若该对象之前没有拥有该属性名，则会被扩充到此对象中。

```javascript
  father.city='HangZhou';
{name: "Potato", age: 23, son: {…}, city: "HangZhou"}
    age: 23
    city: "HangZhou"
    name: "Potato"
    son: {first: "Tomato", second: "cucumber"}
```

#### 引用

- 对象可通过引用来传递，但它们永远不会被复制
  - 无论 refBox 还是 getBox 它们都指向同一个对象引用，因此共享属性

```JavaScript
  var box={
    check:'book',
  }
  var refBox=box;
  box.price='25元';
  var getBox=box.price;//'25元'
```

- x、y、z 它们每个都引用了不同的对象，因此也各不影响

```javascript
var x = {},
  y = {},
  z = {};
x == y; //false
var a = (b = c = {});
a === b; //true
```

#### 原型

- 每个对象都关联到一个原型对象，并可从中继承相应属性。所有通过对象字面量创建的对象都连接到 Object.prototype,它也是 JavaScript 中的终点对象。
- 当创建一个新对象时，可以选择某个对象为其原型，可以尝试给 Object 添加一个 create 方法，它可以创建一个使用**原对象**作为其**原型**的新对象。

```JavaScript
  var box={
    check:'book',
    checkbox:{
      check:'pencil',
      price:'30元'
    },
    getPrice:function(){
      return '25元'
    }
  }
if(typeof Object.beget!=='function'){
  Object.create=function(o){
    var F=function(){};
    F.prototype=o;//使其原型改为传进来的对象
    return new F();
  }
}
var goodsInfo=Object.create(box)
console.log(goodsInfo.check)//'book'
console.log(goodsInfo.getPrice())//'25元'
```

> 注意：原型链只有检索值时才用到，若尝试回去对象中某属性值时，它不存在此属性名，则`javascript`会试着从原型对象中获取属性值，若原型对象中也没有，则从原型中寻找，以此类推至`Object.prototype`,无则返回`undefined`。

#### 反射

- 检查并确定对象具有的属性，只有进行检索并验证即可，通常使用`typeof`

```javascript
typeof box.check; //"string"
typeof box.checkbox; //"object"
typeof box.getPrice; //"function"
```

- 原型链
- 但原型链中的任何属性还会产生同一个值`constructor`，例如：

```javascript
typeof box.toString; //'function'
typeof box.constructor; //'function'
```

- 为了处理掉这些不需要的属性，可以换种方法来验证，比如利用`hasOwnProperty`
- 它用来检验是否是对象独有的属性，它将返回对应的布尔值，它不会检查原型链

```javascript
box.hasOwnProperty("check"); //true
box.hasOwnProperty("getcheck"); //false
```

#### 枚举

- for in 语句用来遍历对象中的所有属性名。该枚举过程会列出所有的属性（包括函数和原型链中的属性）
- 同时一般利用 typeof 来排除不想要的函数

```javascript
var box = {
  check: "book",
  checkbox: {
    check: "pencil",
    price: "30元",
  },
  getPrice: function () {
    return "25元";
  },
};

for (name in box) {
  if (typeof box[name] !== "function") {
    console.log(name + ":" + box[name]);
    //check:book
    //checkbox:[object Object]
  }
}
```

- 因为属性名出现的顺序具有不确定性，因此要对可能出现的顺序有所准备
- 若想避免这种不确定性出现，那么应避免出现`for in`语句，转而换为数组循环

```javascript
var box = ["book", "pencil", "30元"];

for (let i = 0; i < box.length; i++) {
  console.log(box[i]);
}
```

#### 删除

- delete 运算符可以用来删除某对象的属性，若此对象含有该属性，则移除（不会对原型链中的对象产生影响）
- 删除某对象的属性，可能会让它原型链中的此属性表现出来
- 若原型链 object 上有 a 属性，而对象 A 身上也有 a 属性，则 A 使用时以自身为准
- （这也是为什么，删除 A 身上的 a 属性时，A 身上的 object 的 a 属性生效的原因）如下：

```javascript
function Pro() {}
Pro.prototype = {
  constructor: Pro,
  name: "proto",
  sex: "boy",
  hobby: "coding",
};
var fakePro = new Pro();
fakePro.hobby = "钓鱼🎣";
console.log(fakePro.hobby); //'钓鱼🎣'
delete fakePro.hobby;
console.log(fakePro.hobby); //'coding'
```

#### 减少全局变量污染

- `JavaScript`可以随意定义全局变量（当然，这在方便的同时带来很多隐患）
- 为降低这些隐患，一般为其应用创建唯一全局变量容器
- 把全局资源都归纳至一个名称空间下，则会显著降低命名冲突。

```javascript
var box = {};
box.content = {
  first_box: "tomato",
  second_box: "cucumber",
  third_box: "potato",
};
box.price = {
  tomato: "25",
  cucumber: "15",
  potato: "10",
};
```

---

总结：本章节描述的是在`JavaScript`语言中的对象的基本概念，更加多元化的使用方法及重要知识点将在函数章节中记录。
