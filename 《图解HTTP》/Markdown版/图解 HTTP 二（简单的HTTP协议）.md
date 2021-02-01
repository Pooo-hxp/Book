> ## 图解 HTTP 二（简单的 HTTP 协议）

##### 海底月是天上月，眼前人是心上人 —— 夏吉尔硕

## 起步：

#### 本章内容及进度根据《图解 HTTP》图灵系列丛书，加上自己搜索的互联网资料补充总结。

#### **关于客户端和服务端**

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

#### **无状态协议——HTTP**

- HTTP 属于无状态协议，即：不保存请求和响应之间的通信状态。
- 协议对发送过的请求或响应都不做持久化处理。
  - 对于 HTTP 协议来说，当有新请求发送时，就会产生对应的新响应。
  - 协议本身不会保留之前一切的请求和响应信息。
  - 原因：为了更快处理大量事务。
- 棘手的问题
  - 随着业务发展，无状态在实际应用中带来的问题越来越多
  - 为了保留状态信息，解决无状态协议带来的麻烦，引入`Cookie`技术
  - 在后边状态管理里介绍` Cookie`

#### **与服务器交流的 HTTP 方法**

##### GET：获取资源

- `GET` 方法用以请求被 URI 识别的资源
- 指定的资源经服务器端进行解析后返回的响应内容

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6cbc77530964c78bec97d5c7143dd18~tplv-k3u1fbpfcp-watermark.image)

##### POST：传输实体主体

- `GET` 方法也可以进行实体传输，但一般只使用`POST`传输
- `POST` 方法主要也不是为了获取响应的主体内容

  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa6d529fa2c74c2996ec4d899e1db23f~tplv-k3u1fbpfcp-watermark.image)

##### PUT：传输文件

- `PUT `方法，在请求报文的主体中包含文件内容，保存到请求 URI 指定位置
- 由于 HTTP/1.1 的`PUT`方法无验证机制，因此存在安全性问题
- 因此` PUT` 方法一般不开放

##### HEAD：获得报文首部

- `HEAD` 方法用于确认 URI 的有效性及资源更新的日期时间等
- HEAD 方法与 GET 相同，只是不返回报文主体部分

#### **使用 Cookie 的状态管理**

- 由于 HTTP 是无状态协议，不保存之前发送过的请求与响应状态，无法依据之前状态进行本次请求处理
- 因此会出现每次跳转新页面，都需要再次登录这种低效的事件
- 解决方案：

  - 每次请求报文中附加参数，管理登录状态
  - 但管理全部客户端状态又会产生很大的负担

    ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/510b672a9b3f4c60bd19d0716f0f4dca~tplv-k3u1fbpfcp-watermark.image)

- 正是基于上方矛盾的考虑，所以引入了 `Cookie` 技术

  - 它会通过在请求和响应报文中写入 `Cookie` 信息来控制客户端状态
  - 通过发送响应报文中 `Set-Cookie` 的字段信息，通知 **客户端保存 `Cookie`**

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5704fe229dc4e37b0957e32c0a046dd~tplv-k3u1fbpfcp-watermark.image)

  - 下次客户端向服务端发起请求时，自动在请求报文中加入 `Cookie` 值
  - 服务端接收客户端发送的 `Cookie` 后，会与服务器比对，找出之前状态信息

  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f34f55a3a8554f88afc2b535a761cc7c~tplv-k3u1fbpfcp-watermark.image)

  - 上图介绍了理论上的交互场景，具体发送报文如下

  ```JavaScript
  /* 1.请求报文（无cookie信息）*/
  GET /reader/ HTTP/1.1
  Host: hackr.jp

  /* 2. 响应报文（服务器端生成 Cookie 信息）*/
  HTTP/1.1 200 OK
  Date: Thu, 12 Jul 2012 07:12:20 GMT
  Server: Apache
  ＜Set-Cookie: sid=1342077140226724; path=/; expires=Wed,
  10-Oct-12 07:12:20 GMT＞
  Content-Type: text/plain; charset=UTF-8

  /*3. 请求报文（自动发送保存着的 Cookie 信息）*/
  GET /image/ HTTP/1.1
  Host: hackr.jp
  Cookie: sid=1342077140226724
  ```

## 总结：

URI 为标识符，URL 为定位符，两者都可以确定唯一资源，其中 **`通过地址规则实现的 URI 可以被称作 URL ，URL 是 URI 的一种表现，所以 URI 作为更宽泛的定义包含了 URL`**
