> ## 图解 HTTP 三（确保 web 安全的 HTTPS）

#### 情不敢至深，恐大梦一场。 —— 夏吉尔硕

## 起步：

#### HTTP 协议会存在消息劫持和身份伪装等安全问题，而使用 HTTPS 则可以有效防止这些问题。

### **HTTP 的缺点**

- 通信使用明文（不加密），内容有可能被窃听
- 不验证通信方身份，因此可能遭遇伪装。
- 无法证明报文完整，所以有可能被篡改

#### 通信使用明文，可能被窃听

- 通信不加密
  - 因为按 TCP/IP 协议族工作机制，通信内容在所有通信线路都可能被窥视。
- 通信加密
  - 加密处理的通信也会被窥视通信内容，只是可能无法被破解报文信息含义。

注：`互联网上的任何角落都存在通信内容被窃听的风险`

#### 通信加密

- `HTTP` 协议本身没有加密机制，但可以与 SSL（Secure Socket Layer）组合使用
- SSL 建立安全通信线路，然后进行 HTTP 通信
- 这种与 SSL 组合的 HTTP 被称之为 HTTPS（HTTP Secure，超文本传输安全协议）

  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59dc58bec5c041a7ab9682ac73707fac~tplv-k3u1fbpfcp-watermark.image)

#### 验证通信方身份

- `HTTP` 协议通信时，不会确认通信方
- 而服务器对请求者也是来者不拒，都会返回响应

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40b106d97c7149d2b629bdc9a425137f~tplv-k3u1fbpfcp-watermark.image)

- 不确认通信方则会存在以下隐患
  - 有可能遭遇伪装的 web 服务器
  - 有可能遭遇伪装的客户端
  - 无法确定通信的对方是否具备访问权限
  - 重点：因无意义请求也会接收，容易遭遇 DoS 攻击（拒绝服务攻击）
- 查明对方证书

  - 以上可知用 HTTP 协议无法确定通信方
  - 使用 SSL 可用于确定对方身份
  - 证书有可信任第三方颁发，可证明客户端或服务端实际存在

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c25ceb57c04a4100b96140c3423b7489~tplv-k3u1fbpfcp-watermark.image)

#### 无法确认报文完整性，则容易被篡改

- HTTP 协议无法证明通信的报文完整性，所以具有风险性
- 比如：发出请求，从某服务器接收到的网页文件，有可能是篡改过的
- 遭攻击者拦截并篡改内容的攻击称为中间人攻击

### **使用 Cookie 的状态管理**

- 上图介绍了理论上的交互场景，具体发送报文如下

```JavaScript

```

### **报文中的 HTTP 信息**

#### HTTP 报文

- `HTTP`协议交互的信息称为 `HTTP` 报文
  - 客户端：称为请求报文
  - 服务端：称为相应报文
- `HTTP` 报文内容分为，报文首部和报文主体（非必须）
- 请求报文与响应报文结构如下

  - 请求行：包含请求方法，请求 URI 和 HTTP 版本。
  - 状态行：包含响应结果的状态码，原因短语和 HTTP 版本。
  - 首部字段：包含请求和响应的各种条件和属性的各类首部。
    - 一般有：通用，请求，响应，实体四种首部。

  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e60e2e9bce9841a2b7ea7e76ad8287a2~tplv-k3u1fbpfcp-watermark.image)

---

#### HTTP 状态码

- 状态码表示客户端 HTTP 请求的结果、标记服务器端的处理是否正常、通知出现的错误等。

### ** HTTP 首部字段**

#### 4 种 HTTP 首部字段类型

- 通用首部字段（General Header Fields）
  - 请求报文和响应报文两方都会使用的首部。
- 请求首部字段（Request Header Fields）

#### `首部字段表`

- 通用首部字段表

#### `HTTP缓存——Cache-Control`

- 通过指定首部字段 Cache-Control 的指令，操作缓存的工作机制。
- 指令的参数是可选的，多个指令之间通过“,”分隔。
- 缓存请求指令表

- 当使用 `public` 指令时，则明确表明其他用户也可利用缓存。
  > Cache-Control: public
- 当使用 `private` 指令 响应只以特定的用户作为对象，与 `public` 指令行为相反。

  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2e6b76ba80b4f3fae2da2f25572f3f8~tplv-k3u1fbpfcp-watermark.image)

## 总结：

**HTTP 协议的请求和响应报文中必定包含 HTTP 首部，虽然普通人在实际使用中根本感受不到它，但对于开发者来说，掌握这些信息，不仅能学会请求报文发送时的各种配置，更便于提升在实际生产中 debug 的效率**
