> ## 图解 HTTP 二（简单的 HTTP 协议）

##### 海底月是天上月，眼前人是心上人 —— 夏吉尔硕

## 起步：

### 本章内容及进度根据《图解 HTTP》图灵系列丛书，加上自己搜索的互联网资料补充总结。

### **关于客户端和服务端**

#### 服务端与客户端，如下所示：

- 请求访问文本或图像等资源的一端称为客户端，而提供资源响应的一
  端称为服务器端。

  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2bfb19456894fc1a1612c1a48cfd900~tplv-k3u1fbpfcp-watermark.image)

- 在应用 HTTP 协议通信时，在一条通信线路上必定有一端是客户端，另一端则是服务器端。
- 有时，两者的身份可能会互换，则使用 HTTP 协议能够明确区分两端的身份。

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff4b519bd2d45d0b282121868a319ba~tplv-k3u1fbpfcp-watermark.image)

### **TCP/IP 通信传输流**

#### 通信传输流程图，如下所示：

请求访问文本或图像等资源的一端称为客户端，而提供资源响应的一
端称为服务器端。

> 截图来源--《图解 HTTP》丛书

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28ab6a70286c42c2a1aa9c2ed01626a1~tplv-k3u1fbpfcp-watermark.image)

---

- `利用TCP/IP协议族网络通信时，通过分层顺序与对方通信`
  - 发送方：从应用层往下进行
  - 接收方：从下往应用层进行
- 举例 **`HTTP`**,客户端作为发送端，请求某个 `web` 页面数据
  - 首先传输层（`TCP协议`）
    - 把从应用层接受的数据（HTTP 请求报文）分割
    - 在各个报文上打上标记序号（**TCP 具有按序性**）及端口号
    - 转发给网络层
  - 其次到网络层（`IP协议`）
    - 在传输层整理完的数据基础上，增加通信目的地的 `MAC地址`
    - 转发给链路层
  - 然后到接收端的链路层 - 接收数据，按顺序往上层发送 - 传输到服务器端的应用层时，服务器才接收到客户端发送来的 HTTP 请求

客户端发送的请求数据，在`经历层层传输时，势必会被每层所属的首部信息包裹`，这叫做 **封装**。同理，从链路层往服务器端的`应用层向上传输时，每层对应的首部信息也会层层剥去。`

- 如下图所示：

  > 截图来源--《图解 HTTP》丛书。

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e88707d7c9e4c1e8b028b2e7d7c66f8~tplv-k3u1fbpfcp-watermark.image)

### **与 HTTP 密切相关的协议：IP、TCP 和 DNS**

#### IP 协议：

- 负责传输的 IP 协议 概念：

  - 几乎所有的使用网络的系统都会用到 IP 协议，重要性可见一斑
  - TCP/IP 协议族中的 IP 指的是 **网际协议**
  - `IP（Internet Protocol）`网际协议位于 **网络层**

- IP 协议的作用：
  - 把各种数据包传送给对方
  - 保证必须传送到对方那里，需满足各类条件
    - 重要条件之一：**IP 地址**
    - 重要条件之二：MAC 地址（Media Access Control Address）。

IP 地址指明了节点被分配的地址。MAC 地址是指网卡所属的固定地址。IP 地址可以和 MAC 地址进行配对 ` IP 地址可变， MAC地址基本上不会更改。*`

- 使用 ARP 协议凭借 MAC 地址进行通信
  - IP 间的通信依赖 MAC 地址
  - 网络上，通信双方通常经过多台计算机和网络设备中转才连接到对方
  - 中转时，利用下一站中转设备的 MAC 地址搜索下一中转目标
  - 此时会使用 ARP 协议
    - ARP 是用以解析地址的协议，根据通信方的 IP 地址反查出对应的 MAC 地址。
- 如下图所示 ：

  > 截图来源--《图解 HTTP》丛书

  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88b270d337f54f428c5208b55dd77317~tplv-k3u1fbpfcp-watermark.image)

#### TCP 协议：

- 确保可靠的 TCP 协议 概念：

  - 字节流服务：便于传输，把数据分割成以报文段为单位的数据包
  - TCP 协议提供字节流服务，为了便于传送大体系数据
  - TCP 协议能确保数据到达目标
  - `TCP` 协议位于 **传输层**

- 如何确保数据到达目标 ？
  - TCP 协议使用了`三次握手（three-way handshaking）`策略
  - TCP 将数据包传送后，会向对方确认是否成功（ UDP 不会）
- 知晓一些标识符
  - SYN：同步标志
  - ACK：确认标志
  - FIN：结束标志

`'握手'` 中使用`TCP`的标志—— `SYN（synchronize） `和 `ACK（acknowledgement）`

- 1.发送端先发送一个带`SYN 标志`的数据包给对方。
- 2.接收端收到后，回传一个带有`SYN/ACK`标志的数据包以示传达确认信息
- 3.最后，发送端再回传一个带`ACK`标志的数据包，代表“握手”结束。
- 补充：若上述任意过程中断，则重新来过
- 如下图所示：

  > 截图来源--《图解 HTTP》丛书

  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6df715ff994440bdb06f31e2d7af3c8c~tplv-k3u1fbpfcp-watermark.image)

通俗来描述：

- A：客户端`先向服务端发送一个 SYN 包告诉它自己的初始序列号是 X `
- B：服务端收到 SYN 包后`回复给 客户端 一个 ACK 确认包`，表明自己收到了，并且也 `发送一个 SYN 包告诉 客户端 自己的初始序列号是 Y`；
- C：客户端收到这俩包后，会回复服务端 一个 ACK 确认包表明收到。

`'挥手'`：指 TCP 断开连接，停止数据的双向传输，并且回收资源

- 如下图所示：

  > 截图来源--《腾讯技术工程》公众号

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d415134905454a648113ccf6effa42cf~tplv-k3u1fbpfcp-watermark.image)

  通俗来描述：

- A：客户端`发送一个FIN包，告知服务端，没有数据传输了 `
- B：服务端收到后`回ACK确认包，表明知道了`；
- C：然后服务端`发送FIN 包告诉客户端，也没有数据传输了`
- D：客户端`回一个ACK确认包，表明知道了`
- 至此四次挥手完成，TCP 断开连接。

补充：四次挥手可否变成三次呢？若服务端收到 客户端 的 FIN 结束标志包告知没有数据传输时，自己也没数据需要发送给 客户端 ，则对 客户端 的 ACK 确认包和 服务端 自己的 FIN 结束标志包就可以合并成为一个包发送过去，这样四次挥手就可以变成三次了

#### DNS 服务：

- 负责域名解析的 DNS 服务 概念：

  - DNS（Domain Name System）服务：提供域名到 IP 地址之间的解析服务。
  - IP 地址访问不适用于人类记忆，从而通常使用域名访问
  - DNS 将域名和 IP 地址相互映射为一个分布式数据库，便于访问互联网
  - `DNS` 协议和 HTTP 协议一样位于 **应用层**

- 如下图所示 `DNS协议提供通过域名查IP，或逆向从IP反查域名服务`：

  > 截图来源--《图解 HTTP》丛书）

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8487f4959a7a4ee6b09ba320dc7e121d~tplv-k3u1fbpfcp-watermark.image)

#### 各协议与 HTTP 协议的关系及发挥的作用

- 如下图所示各协议之间协同合作，完成通信及数据交换：

  > 截图来源--《图解 HTTP》丛书）

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12b8de53403b4285b3c56c5212a15416~tplv-k3u1fbpfcp-watermark.image)

#### URL 和 URI

- **URL 和 URI 概念**：
  - URL 为统一资源 **定位符** ---URI 为统一资源 **标识符**
  - URI 分为三种，URL or URN or （URL and URI）目前所有的 URI 几乎都是 URL
  - `URL 可以看作是 URI 的子集`。
  - 浏览器访问 web 页面时，需要输入的网页地址认为是 URL（_不是废话_ ）
- 统一资源定位符 `URL`

  - URL 是 `Uniform Resource Locator` 的缩写
    - URL 由三部分组成：资源类型、存放资源的主机域名、资源文件名
    - （也可认为由 4 部分组成：协议、主机、端口、路径）

- 统一资源标识符号 `URI`

  - URI 是 `Uniform Resource Identifier` 的缩写
    - **Uniform** 指统一的格式，便于处理不同类型的资源
    - **Resource** 指可标识的任何东西，大多数都可以作为资源
    - **Identifier** 指可标识的对象，也称为标识符
  - 综述：**`URI 是某个协议方案标识的资源的定位标识符`**
    - 协议方案：访问资源所使用的协议类型名称
    - 比如：使用 HTTP（HTTPS）时，协议方案就是 http(https)
  - 绝对的 URI 格式：
    ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e546d0225a042a6a7775d754dc07553~tplv-k3u1fbpfcp-watermark.image)

- 知乎示例
  - URI：我的身份证号
  - URL：人类协议://中国/河南省/郑州市/光明路/3 栋 4 号/小土豆.人

## 总结：

URI 为标识符，URL 为定位符，两者都可以确定唯一资源，其中 **`通过地址规则实现的 URI 可以被称作 URL ，URL 是 URI 的一种表现，所以 URI 作为更宽泛的定义包含了 URL`**
