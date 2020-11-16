> > `
> >
> > > > ## JavaScript 语言精粹四

##### ...往往会把一件完整的东西化成无数的形象，如凹凸镜一般，正面望去，一片模糊 - 威廉·莎士比亚《理查二世》

## 起步：

- 多数编程语言中，继承都是一个重要的主题
- 基于类的语言中（如`JAVA`）,继承提供两个重要的服务
  - 代码复用，显著减少软件开发成本
  - 类继承可以引入一套类型系统规范，减轻工作量
- `JavaScript` 是一门弱类型语言，不需类型转换，无需关注对象继承关系
- `JavaScript` 提供一套更丰富的代码复用模式，可模拟基于类的模式
- `JavaScript` 是一门基于原型的语言，意味着对象直接从其他对象继承
  ***

### 伪类

- `javascript` 中某些复杂语法看起来像那些基于类的语言，它不直接让对象从其它对象继承，反而是使用构造器函数产生对象

  - 当函数对象被创建时，`Function` 构造器产生的函数对象会运行：

  ```javascript
  this.prototype = { constructor: this };
  ```

  - 新对象被赋予 `prototype` 属性，（值是包含`constructor`属性，且属性值为该新函数的对象）
  - `prototype` 用以存放继承特征`javascript` 中每个函数都包含 `prototype` 属性
  - 当采用构造器调用模式时，（使用 `new`调用），函数的执行方式会改变

- 定义一个构造器，并扩充它的原型

  ```JavaScript
  var Man = function (name) {
    this.name = name;
  };
  Man.prototype.getName = function () {
    return this.name;
  };
  Man.prototype.says = function () {
    return this.saying || "";
  };
  ```

- 构造实例

  ```JavaScript
  var myName=new Man('poo');
  var name=myName.getName();
  console.log(name);// poo
  ```

- 还可以构造另一个伪类继承 Man,

  ```JavaScript
  var Dog=function(name){
    this.name=name;
    this.saying='aHa';
  }
  Dog.prototype=new Man();//替换它的prototype
  Dog.prototype.wangwang=function(n){
    var i,txt='';
    for(i=0;i<n;i++){
      s=s?s+='~':'汪'
    }
    return txt;
  }
  var yourDog=new Dog('花花')
  var says=yourDog.says();// aHa
  var wangwang=yourDog.wangwang(3);//汪~~
  ```

- 使用构造器有一个严重的危害，调用构造器函数时，若没在前面加上 `new`,则**this 不会绑定到新对象上**，反而绑定到了全局，破坏了全局变量环境
- 为了降低这个风险，构造器函数约定俗成首字母大写。

### 对象说明符

- 通常构造器要接受一些参数，为避免记错顺序引起的问题
- 一般都会使用一个简单的对象说明符来描述
- 这样就不必在意它的顺序了，而且也更易于阅读使用。例如:

```JavaScript
var myObj=maker(a,b,c,d);
//---以上可写为
var myObj=maker({
  isa:a,
  isb:b,
  isc:c,
  isd:d
})
```

### 原型

- 基于原型的继承相比基于类的继承概念上更简单——即：新对象可以继承旧对象的属性
- 例如，使用对象字面量构造一个对象

```javascript
var man = {
  name: "poo",
  getName: function () {
    return this.name;
  },
  says: function () {
    return this.saying || "";
  },
};
```

- 再利用`Object.create`方法构造出其他实例

```javascript
var myFriends = Object.create(man);
myFriends.name = "tomato";
myFriends.says = "Hi~  potato";
myFriends.getName = function () {
  return this.name + " " + this.says;
};
```

- 通过定制新对象，来指定与基于的基本对象区别的方式，叫做差异化继承。

### 函数化

- 继承模式缺点在于数据私密性不强，因为对象中的属性都是可见的
- 若想构造私有属性，那么可以使用 应用模块模式
- 从构造一个可以生成对象的函数（它并不需要使用 new 操作符，因此命名不需大写）
  1. 创建新对象。使用`Object.create`方法
  2. 定义私有实例变量和方法，是函数中通过`var`语句定义的普通变量
  3. 给当前新对象扩充方法，使这个方法拥有访问参数及(2)中`var`声明的普通变量的特权
  4. 返回当前新对象。

例如：

```javascript
var constructor=function(spec,my){
  var that,//-其他的私有实例变量
  my=my||{};
  //共享变量和函数添加到my中
  that=//一个新对象
  //添加给that的特权方法
  return that;
}

```

#### 函数的调用

- 调用一个函数
  - 方法
- 调用
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

#### 返回

- 当函数被调用时，从起始语句执行到遇到函数体 `}` 时结束，然后移交控制权至调用该函数的程序。
- `retrun` 语句可使函数结束执行提前返回，若无指定返回值，则返回 `undefined`。
- js 中大部分函数在未设置 `return` 值时都会默认返回一个 `underfined`。
- `getReturn` 不加执行体`（）`时，只是单纯的是一个指向函数的指针而已。
- `getReturn()` 则是表示执行函数，并且获取函数执行的结果。

```javascript
var getReturn = function () {
  return "hi~ Poo";
};
getReturn; //ƒ (){ return 'hi~ Poo'}
getReturn(); //hi~ Poo
```

#### 扩充类型的功能

- `JavaScript` 可以扩充语言的基本类型，比如避免每次添加方法时都写入 `prototype` 名称

```javascript
Function.prototype.method = function (name, fun) {
  this.prototype[name] = fun;
  return this;
};
```

- 可以通过给 Number.prototype 绑定自定义方法来简化我们的工作
- 当参数为负时向上取整，为正时向下取整

```javascript
Number.methods('getInteger',function(){
  return Math[this<0?'ceil':'floor'>](this);
})
console.log((5/3).getInteger())//1
```

- 这种方法虽然方便，但是有很大的隐患，比如可能会覆盖类库中原有的方法
- 所以上方的代码优化后如下：

```javascript
Function.prototype.method = function (name, fun) {
  if (!this.prototype[name]) {
    this.prototype[name] = fun;
  }
  return this;
};
```

> 注意：通常避免混淆，可以利用 `hasOwnProperty` 来判断是否是自身属性（非继承）来的

- 例如：

```javascript
var Poo=function(){
  this.name='poo'
  this.getName=function(){
    console.log(`hi~ `${this.name})
  }
}
let aHa=new Poo()
console.log(aHa.hasOwnProperty('name')) //true
console.log(aHa.hasOwnProperty('getName')) //true
console.log(aHa.hasOwnProperty('toNumber'))//false
```

#### 递归

- 简单来说：递归就是直接或间接调用自身的一种函数,基本概念分为
  - 递归条件：递归函数调用自己的条件
  - 基线条件：递归函数结束调用自己的条件
- such as:

```javascript
function Recursive(num) {
  if (num > 1) {
    return num + Recursive(num - 1);
  } else return num;
}
Recursive(233); // 求233+222+...+2+1
```

> 总结：不考虑复杂的尾递归时，递归只是让解决方案更清晰，并没有任何性能上的优势，<br>
> 甚至劣势于传统的 for 循环，还会有内存崩溃隐患。<br>
>
> 至于递归底层涉及内存的压栈和弹出，你可以通过点击<br>
> 👉 [GitHub](https://github.com/Pooo-hxp/Book/blob/master/%E3%80%8A%E7%AE%97%E6%B3%95%E5%9B%BE%E8%A7%A3%E3%80%8B/%E7%AE%97%E6%B3%95%E5%9B%BE%E8%A7%A3%E4%BA%8C%EF%BC%88%E9%80%92%E5%BD%92%E5%8F%8A%E5%86%85%E5%AD%98%E5%AD%98%E5%82%A8%E5%8E%9F%E7%90%86%EF%BC%89.md) 查看详情 或者掘金里的 👉[递归](https://juejin.im/post/6870823876591517704)

#### 作用域

- 作用域控制着参数与变量的生命周期 ，例如：

```javascript
var poo = function () {
  var a = 1,
    b = 2;
  var pooTx = function () {
    var b = 3,
      c = 4;
    //--此时这里可读取外部值，但b被就近覆盖，所以a=1,b=3,c=4
    a += b + c;
    //--经过运算影响后，a=8,b=3,c=4
    /* 补充 +优先级高于+=,所以上方相当于a+=(b+c) 或 a=a+(b+c)*/
  };
  //这里因在pooTx外，所以不受影响a=1,b=2[ 无法读取c ]
  pooTX();
  //-执行过了，因此a=8,b=2
};
```

- 但是令人头疼的是 `JavaScript` 有着函数作用域，意味着函数中的参数变量，内部任何地方都可见。
- （ `ES6` 中的 `let` 块级作用域声明符解决了这个痛点）

```javascript
function testPar() {
  var flag = "poo";
  var update = (function () {
    flag = "aHaHa";
  })();
  var getpar = (function () {
    console.log(flag);
  })();
}
testPar(); //被别的函数篡改了， "aHaHa"
```

#### 闭包

- 作用域的好处是，可以使父级函数内部的子级函数访问父级函数里的参数和变量
- 有趣的是，内部函数往往拥有着比它外部函数更长的生命周期。
- 该函数返回一个包含两个方法的对象，并且这两个方法可以继续访问该函数中的变量 `val`

```javascript
var myObj = function () {
  var val = 1;
  return {
    increment: function (par) {
      val += typeof par === "number" ? par : 2;
    },
    getval: function () {
      return val;
    },
  };
};
myObj();
```

- 下方这个经典示例中：
  - 回调函数都会在循环结束以后才会执行，因此才会每次输出一个 6 出来。
  - 试图在循环中每次运行都捕获一个副本 i,但是根据作用域的工作原理
  - 它们五个函数都会被封印在一个共享的全局作用域中，才会只有同一个 i。
  - 等价于把延迟函数重复定义五次，不使用循环。

```javascript
function star() {
  for (var j = 1; j <= 5; j++) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  }
}
/*结果为每隔一秒输出一个数字6总共五个*/
```

- 解决方案
  - 改用 `ES6` 中 `let` 关键字形成块级作用域(推荐)
  - 使用 `IIFE` 形成单独的函数作用域

```javascript
for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}
/*因为在各自的作用域中保留了各自所得到的i值这样结果就与自己预期相符了*/
```

#### 模块

- 模块：是提供接口缺隐藏状态与函数的对象（函数）-使用闭包和函数来进行构造
- 通过使用函数产生模块，可以大幅度减少全局变量的使用
- 比如说给 `String` 添加一个自定义的 `pooMethods`方法，功能：
  - 检测到字符串中的 `HTML` 字符并转换为对应汉字

```JavaScript
String.method('pooMethods',function(){
var transform={
  '>':'大于',
  '<':'小于',
  '=':'等于'
}
return function(){
  //‘#’开头和‘;’结尾内字符进行替换
  return this.replace(/#([^#;]+);/g,
  function(a,b){
    var r=transform[b];
    return typeof r==='String'?r:a;
  })
}
}());
console.log('123#<;213'.pooMethods())//123小于213
```

- 模块一般是：
  - 一个定义私有变量和函数的函数
  - 利用闭包创建可访问私有变量和函数的**特权函数**
  - 最后把这个函数保存到公共可访问的地方
- 好处：
  - 摒弃大量全局变量使用
  - 便于应用程序的封装和构造
  - 模块模式可以更改的来创建安全的对象

```javascript
/**根据书中的示例创建*/
var serial_maker = function () {
  var prefix = "";
  var seq = 0;
  return {
    set_pre: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function () {
      var result = prefix + seq;
      seq += 1;
      return result;
    },
  };
};
var seqer = serial_maker();
seqer.set_pre("poo");
seqer.set_seq("12345");
var unique = seqer.gensym(); // 'poo12345'
```

- 如上方示例用来产生一个无法影响内部 `prefix` 和 `seq` 安全的序列号

#### 柯里化

> 柯里化(Currying)指的是将原来接受两个参数的函数变成新的接受一个参数的函数的过程。新的函数返回一个以原有第二个参数为参数的函数。

- 柯里化的作用：是函数式编程的一个重要概念。它既能减少代码冗余，也能增加可读性。
- 柯里化的定义：在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术
- 简单应用如下：

```typescript
/**
 * 解析：
 *  若函数以cc(xxx)(yyy)形式可以调用
 *  则sum(xxx)的返回值必然为一个函数，因为后方还要以(yyy)调用
 *  实现一个add方法，使计算结果能够满足如下预期：
 *  add(1)(2)(3) = 6;
 *  add(1, 2, 3)(4) = 10;
 *  add(1)(2)(3)(4)(5) = 15;
 */
function add() {
  // arguments类数组对象转化为数组对象备份
  var _args = Array.prototype.slice.call(arguments);
  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function () {
    _args.push(...arguments);
    return _adder;
  };
  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  return _adder;
}
multi(1, 3, 5); //9
multi(1, 3)(5); //9
```

#### 记忆

- 函数可将之前操作的结果记录在某对象中，从而避免无谓的重复运算（记忆）
- 这是一种很棒的优化方式，`JavaScript` 的对象和数组实现很简单

```javascript
/**
 * flag 为想查询数列中第几项
 * curr为一项 next为二项 二者相加为第三项
 * 这是比较简便的方法
 */
function fbnq(flag) {
  function fn(flag, curr = 1, next = 1) {
    if (flag == 1) return curr;
    else return fn(flag - 1, next, curr + next);
  }
  return fn(flag);
}
console.log("斐波那契数列中第六项为", fbnq(6));
// ---这种方法比较更容易理解
function fb(n) {
  return n - 2 > 0 ? fb(n - 2) + fb(n - 1) : 1;
}
console.log("斐波那契数列中第六项为", fb(6));
//---输出一个指定长度的斐波那契数列
function arrs(num) {
  let arr = [];
  if (num - 2 > 0) {
    arr[0] = 1;
    arr[1] = 1;
    for (let i = 1; i <= num - 2; i++) {
      arr.push(arr[i - 1] + arr[i]);
    }
  } else {
    while (num > 0) {
      arr.push(1);
      num--;
    }
  }
  console.log(arr);
}
arrs(14);
```

---

## 总结：

> 本章节描述的是在`JavaScript`语言中的函数的一些核心知识点，但是因为本书定位是精粹系列，所以描述的较为简洁，虽然我补充了一些函数示例，但是先掌握这些知识点还是要自己多多练习。
