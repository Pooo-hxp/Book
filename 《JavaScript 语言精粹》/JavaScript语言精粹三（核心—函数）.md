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

- 调用一个函数会暂停当前函数的执行，传递执行权和参数给新函数。
- 除了声明时定义的形参，每个函数还另外接受两个特殊参数`this`和`arguments`
- 在`JavaScript`中，一共有四种调用模式
  - 方法调用
  - 函数调用
  - 构造器调用
  - apply 调用
  - 这些模式在初始化关键参数`this`上存在很大的差异
- 调用运算符是跟在函数表达式后的一对圆括号，括号内可包含零或多个表达式，每个表达式产生一个参数值
- 实参与形参个数不匹配时不会出错，会忽略超出的参数值，会替换缺少的值为`undefined`。

#### 方法调用模式

- 当一个函数被保存为对象的某一属性时，称它为一个方法，当该方法被调用时，this 就绑定到了该对象，若调用表达式包含 `.` 或者 `[ ]` 时，它被当做一个方法调用。
- 例如：

```javascript
var myObj = {
  val: 233,
  getVal: function (par) {
    this.val += typeof par === "number" ? par : 1;
  },
};
myObj.getVal();
console.log(myObj.val); //234
/*-------------------*/
myObj.getVal(433);
console.log(myObj.val); //666
```

- 对象身上的方法可以通过 this 访问该对象身上的属性，因此也能进行取值和修改。
- 通过 this 取得它所属对象的上下文的方法，称之为公共方法。

#### 构造器调用模式

- `JavaScript`是基于原型继承的语言，对象可直接从其他对象继承属性
- 如果在一个函数前面加上 `new` 关键字调用，那么底层是会创建一个连接到该函数 `prototype` 成员的新对象，同时绑定 `this` 至新对象
- 例如：

```JavaScript
var Poo=function(city){
  this.citys=city;
}
Poo.prototype.getCity=function(){
  return this.citys;
}
var goWhere=new Poo('ZhengZhou');
console.log(goWhere.getCity());// ZhengZhou
```

- 函数若通常使用 `new` 来结合调用，那么它就被称之为构造器函数
- 约定俗成，这类函数要首字母大写用以区分

#### Apply 调用模式

- `apply` 方法可以构建一个参数数组传递给调用函数，并且可自由选择 `this` 的指向
- `apply` 中通常第一个参数为 `this` 绑定的值，第二个为参数数组

```JavaScript


var add = function (par1, par2) {
  return par1 + par2;
};
var arrs=[1,2];
var count=add.apply(null,arrs) //3
//-构造一个包含type成员的对象,types并没有getRtx方法，但通过apply，仍可使用
var Poo=function(city){
  this.type=type;
}
Poo.prototype.getRtx=function(){
  return this.type;
}
var types={
  type:'RTX3080'
}
var getRtx=Poo.prototype.getRtx.apply(types);//RTX3080
```

#### 参数

- 当函数被调用时，都会拥有一个 `arguments`数组，它里面包含了所有被调用时，传递给它的参数

```javascript
var count = function () {
  var i = 0;
  sum = 0;
  for (i; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
};
console.log(count(1, 3, 4, 6, 7, 12)); //33
```

- 因为设计上的失误，导致 `arguments` 并不是一个真正的数组，而是一个类数组对象`（array-like）`
- `arguments`是一个拥有 length 属性的特殊对象，但它不具备任何数组方法
  - 数组对象的类型是 `Array`， `arguments`的类型是 Object；
  - `arguments` 不能直接调用数组 `API`（不具备任何数组方法）；
  - 数组遍历可以用 for in 和 for 循环，`arguments` 只能用 for 循环遍历；

```javascript
//把函数中的arguments转为数组
var newArr = Array.prototype.slice.call(arguments);
console.log(Array.isArray(arguments)); //false
console.log(Array.isArray(newArr)); //true
```

-

```javascript

```

#### 枚举

-

```javascript

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

#### 全局变量污染

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
