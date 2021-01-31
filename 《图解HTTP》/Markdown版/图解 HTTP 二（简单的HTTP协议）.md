> ## 图解 HTTP 二（简单的 HTTP 协议）

##### 海底月是天上月，眼前人是心上人 —— 夏吉尔硕

## 起步：

### 本章内容及进度根据《图解 HTTP》图灵系列丛书，加上自己搜索的互联网资料补充总结。

### **关于客户端和服务端**

#### 服务端与客户端，如下所示：

- 请求访问文本或图像等资源的一端称为客户端，而提供资源响应的一
  端称为服务器端。

  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2bfb19456894fc1a1612c1a48cfd900~tplv-k3u1fbpfcp-watermark.image)

- 在应用 HTTP 协议通信时，在通信线路上必定一端是客户端，另一端是服务器端。
- 有时，两者的身份可能会互换，则使用 HTTP 协议能够明确区分两端的身份。

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff4b519bd2d45d0b282121868a319ba~tplv-k3u1fbpfcp-watermark.image)

- **`请求必定是客户端，相应的必定为服务端`，如下图：**

  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a56483b3e8754777a6c39f30b9595c7f~tplv-k3u1fbpfcp-watermark.image)

- 相应报文构成

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c755dbfa219043d6b46e59be23df2957~tplv-k3u1fbpfcp-watermark.image)

### **TCP/IP 通信传输流**

#### 通信传输流程图，如下所示：

### **与 HTTP 密切相关的协议：IP、TCP 和 DNS**

#### IP 协议：

## 总结：

URI 为标识符，URL 为定位符，两者都可以确定唯一资源，其中 **`通过地址规则实现的 URI 可以被称作 URL ，URL 是 URI 的一种表现，所以 URI 作为更宽泛的定义包含了 URL`**
