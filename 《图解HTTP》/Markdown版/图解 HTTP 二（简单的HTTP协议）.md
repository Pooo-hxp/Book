> ## 图解 HTTP 二（简单的 HTTP 协议）

#### 海底月是天上月，眼前人是心上人 —— 夏吉尔硕

## 起步：

#### 本章内容及进度根据《图解 HTTP》图灵系列丛书，加上自己搜索的互联网资料补充总结。

### **关于客户端和服务端**

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

### **无状态协议——HTTP**

- HTTP 属于无状态协议，即：不保存请求和响应之间的通信状态。
- 协议对发送过的请求或响应都不做持久化处理。
  - 对于 HTTP 协议来说，当有新请求发送时，就会产生对应的新响应。
  - 协议本身不会保留之前一切的请求和响应信息。
  - 原因：为了更快处理大量事务。
- 棘手的问题
  - 随着业务发展，无状态在实际应用中带来的问题越来越多
  - 为了保留状态信息，解决无状态协议带来的麻烦，引入`Cookie`技术
  - 在后边状态管理里介绍` Cookie`

### **与服务器交流的 HTTP 方法**

#### GET：获取资源

- `GET` 方法用以请求被 URI 识别的资源
- 指定的资源经服务器端进行解析后返回的响应内容

  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6cbc77530964c78bec97d5c7143dd18~tplv-k3u1fbpfcp-watermark.image)

#### POST：传输实体主体

- `GET` 方法也可以进行实体传输，但一般只使用`POST`传输
- `POST` 方法主要也不是为了获取响应的主体内容

  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa6d529fa2c74c2996ec4d899e1db23f~tplv-k3u1fbpfcp-watermark.image)

#### PUT：传输文件

- `PUT `方法，在请求报文的主体中包含文件内容，保存到请求 URI 指定位置
- 由于 HTTP/1.1 的`PUT`方法无验证机制，因此存在安全性问题
- 因此` PUT` 方法一般不开放

#### HEAD：获得报文首部

- `HEAD` 方法用于确认 URI 的有效性及资源更新的日期时间等
- HEAD 方法与 GET 相同，只是不返回报文主体部分

### **使用 Cookie 的状态管理**

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

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dd0e8abef884583b0696cb2ee5a8bca~tplv-k3u1fbpfcp-watermark.image)

- 状态码的类别

  |     | 类别                             | 原因短语                   |
  | --- | -------------------------------- | -------------------------- |
  | 1XX | Informational（信息性状态码）    | 接收的请求正在处理         |
  | 2XX | Success（成功状态码）            | 请求正常处理完毕           |
  | 3XX | Redirection（重定向状态码）      | 需要进行附加操作以完成请求 |
  | 4XX | Client Error（客户端错误状态码） | 服务器无法处理请求         |
  | 5XX | Server Error（服务器错误状态码） | 服务器处理请求出错         |

- 常用的状态码解析为

  - 200 OK ：表示客户端请求在服务器端正常处理。
  - 204 No Content：
    - 表服务端对请求成功处理，但在返回的响应报文中不含实体的主体部分
    - 在只需客户端往服务器发送信息，而对客户端无需发送新信息下使用。
  - 206 Partial Content
    - 该状态码表示客户端进行了范围请求
    - 响应报文中包含由 Content-Range 指定范围的实体内容
      ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7178a479da6848d39994a524b7fc9fe6~tplv-k3u1fbpfcp-watermark.image)
  - 3XX 重定向：表明浏览器需要执行某些特殊的处理以正确处理请求。
  - 301 Moved Permanently（永久性重定向）
    - 表示请求的资源已被分配了新的 URI
    - 若把资源对应的 URI 保存为书签，则应按 Location 首部字段提示的 URI 重新保存
  - 302 Found（临时重定向）
    - 与 301 类似，只不过它表示临时重定向
    - 此时不会像 301 那样，去更新书签
  - 303 See Other
    - 表示请求对应的资源存在另一个 URI，应使用 GET 方法定向获取请求的资源。

```!
当 301、302、303 响应状态码返回时，几乎所有的浏览器都会把 POST 改成 GET，并删除请求报文内的主体，之后请求会自动再次发送。
```

- 304 Not Modified

  - 表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。

    ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cadeee58d034dd3aee269361140f41d~tplv-k3u1fbpfcp-watermark.image)

- 4XX 客户端错误

  > 4XX 的响应结果表明客户端是发生错误的原因所在。

- 400 Bad Request：该状态码表示请求报文中存在语法错误
- 401 Unauthorized（未经授权）
  - 表示发送的请求需要有通过 HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息
  - 若之前已进行过 1 次请求，则表示用户认证失败
- 403 Forbidden（禁止的）
  - 表明对请求资源的访问被服务器拒绝
- 404 Not Found（未找到）
  - 表明服务器上无法找到请求的资源
-

## 总结：

URI 为标识符，URL 为定位符，两者都可以确定唯一资源，其中 **`通过地址规则实现的 URI 可以被称作 URL ，URL 是 URI 的一种表现，所以 URI 作为更宽泛的定义包含了 URL`**
