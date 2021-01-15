> ## 图解 HTTP 一（了解 TCP/IP）

##### 享受着爱和荣誉的人，才会感到生活的乐趣。 —— 夏吉尔硕

## 起步：

### 关于 HTTP 的背景及从 1.0 开始的演变历史就不过多阐述，有兴趣的可以自行了解，直接进入正题。

### **TCP/IP 的分层**

#### TCP/IP 协议族里重要的一点就是分层。TCP/IP 协议族按层次分别分为 4 层：

- `应用层`
  - 应用层决定了向用户提供应用服务时通信的活动。
  - 比如，**FTP**（文件传输协议）和 **DNS**（域名系统）服务及 **HTTP** 协议
- `传输层`
  - 传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。
  - 传输层有两个性质不同的协议：**TCP**（传输控制协议）和 **UDP**（用户数据报协议）
    - 二者具有很大的区别，需重点掌握
      - 连接方面：
        - TCP 面向连接，即必须先建立安全连接（三次握手）才能发送数据
        - UDP 无连接，发送数据前不需要建立连接
      - 安全方面：
        - TCP 安全可靠，无差错，不丢失，不重复且按序。
        - UDP 无连接不可靠，尽力进行数据发送，但丢包风险高，不保证数据 顺序
      - 连接对象数量方面
        - TCP 仅支持一对一通信
        - UDP 支持一对一，一对多，多对多通信对象
      - 性能方面：
        - TCP 信息包较长，有 20-60 个字节，开销较大
        - UDP 信息包标题短，只有 8 个字节
      - 使用场景：
        - TCP 适用于要求可靠传高的传输，例如文件传输
        - UDP 适用于实时应用（IP 电话、视频会议、直播等）

#### string.slice(start,end)

- `slice` 方法复制 `string` 的一部分来构造一个新字符串
- 若 `start` 参数为负数，它将**与 `string.length` 相加**
- `end` 为要取的**最后一个字符的位置+1**

```javascript
let str = "0123456789"; //length=10
let newStr = str.slice(0, 6); // 012345
let erroStr = str.slice(-3); // 789
```

#### string.split(separator,limit)

- `split` 方法把这个 `string`分隔成片段创建一个数组
- `separator` 允许是字符串或正则表达式，若为空则返回单字符数组
- `limit` 会限制被分割的片段数量
- 注：**此方法的使用频率挺高的**

```javascript
let str = "abcde";
let newArr1 = str.split(); // [ 'abcde' ]
let newArr2 = str.split(""); // [ 'a', 'b', 'c', 'd', 'e']
let flagArr = str.split("", 3); // [ 'a', 'b', 'c' ]
let pickArr = str.split("b"); // [ 'a', 'cde' ]
```

#### string.substring(start,end)

- `substring` 方法与 `slice` 作用相同，只是它不接受负数
- 注：**因此平时使用 `slice` 更好一些**

#### string.toLocaleLowerCase()& string.toLocaleUpperCase()

- `toLocaleLowerCase` 方法返回一个全新全**小写字符串**
- `toLocaleUpperCase` 方法返回一个全新全**大写字符串**
- 冷知识：`**toLocaleUpperCase**` 是用来处理土耳其语
- 注： `i` 大写是-->`İ` 而不是 ` I`

```javascript
let str = "abCdE";
let upStr = str.toLocaleUpperCase(); // ABCDE
let lowerStr = str.toLocaleLowerCase(); // abcde
```

#### string.fromCharCode()

- `fromCharCode` 方法是通过字符编码找到对应字符并拼接
- 注： 该方法返回一个字符串

```javascript
let char = String.fromCharCode(67, 97, 116); //Cat
console.log(typeof char); // string
```

---

## 总结：

> 本章节描述的是`Function、Number、String、Object` 等常用方法集，并且为便于理解，模拟出了官方 API 实现的原理（_大概思路是_ 我不保证一定是，但能用，emm）。
