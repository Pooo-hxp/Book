## `# 业务场景`
目前我司关于H5的业务一般是APP中功能入口为APP原生，然后点击入口后跳转加载H5资源，目前我接手的部分业务，为保证功能完整性，入口也需要使用H5实现，记录自己遇到的适配问题及解决方案。
##### 场景一：APP原生无法动态撑起H5组件高度，窗口大小只能用固定值。（会造成留白或显示不全）
   - 背景： APP原生功能页中，预留空白窗口，然后窗口中加载H5入口资源。
   - 解决方案：
        - H5在组件加载完毕后，offsetHeight 获取当前组件高度，与APP通信告知H5入口组件的高度
        - APP拿到此高度后，设定适宜的窗口大小以容纳内嵌的H5入口组件
- 实际操作：
    - 预知条件：H5调用方法时`Android与iOS`不同
        - H5 调用 Android： 
            - `window.app.funName(data)`
        - H5 调用 iOS： 
            - `window.webkit.messageHandlers.app.postMessage({cmd: 'funName',data:data});`
    ```javascript
    /**
     * updateViewSize 为H5调用与APP协商的方法名
     * entranceHeight 为H5的入口组件高度
     */ 
     <template>
        <div class="entrance" ref="appHeight"></div>
    </template>
    <script>
            // 当前组件的高度
            this.entranceHeight= this.$refs.appHeight.offsetHeight;
            //通知APP，当前组件的高度
            this.isAndroid ? window.app.updateViewSize(this.entranceHeight) : window.webkit.messageHandlers.app.postMessage({
                cmd: 'updateViewSize',
                data: this.entranceHeight});
             });
   </script>
    ```
##### 场景二：当组件内容可变或动态获取，造成组件高度首次获取不准确
   - 背景： 文案为后端返回，且有时切换语言造成换行，导致高度变化  
   - 解决方案：
        - H5与APP通信告知高度的时机，添加在mounted即可
        - 为了准确，最好watch服务端返回的文案数据，数据变化则等DOM更新完就通信
   ```javascript
           watch: {
            /**
             * 监听数据变化，DOM更新后及时通知APP最新高度，调整窗口
             * 接口返回数据后，文案可能换行导致窗口高度发生改变
             */
            someData() {
                this.$nextTick(()=>{
                // 当前组件的高度
                this.entranceHeight= this.$refs.appHeight.offsetHeight;
                //通知APP，当前组件的高度
                this.isAndroid ? window.app.updateViewSize(this.entranceHeight) : window.webkit.messageHandlers.app.postMessage({
                cmd: 'updateViewSize',
                data: this.entranceHeight});
             });
            }
        },
   ```
 ##### 补充APP向H5传输数据
 - 判断浏览器版本，从而决定使用哪种方式调取APP方法
 - 调用完毕，等待APP的回调及传输数据
     - 判断浏览器版本
     ```javascript
     // H5判断当前使用环境
     var browser = {
        versions: (function () {
            var u = navigator.userAgent;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') === -1 //是否web应用程序，没有头部与底部
            };
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    ```
     
   - 调用原生APP方法
   ```javascript
     export const getAuth = ()=> {
        if (browser.versions.android) {
            window.app.getAppXXXInfo();
        } else if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
          if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.app.postMessage({ cmd: 'getAppXXXInfo' });
          }
        }
    };
    ```
   - 调用APP后，准备APP的回调并接收传输数据
    ```javascript
        // H5 接受APP的回调和返参
        window.getAppXXXInfoCallback = ((par)=>{
            // par为APP传输的数据  do something
        });
    ```
     ##### 再再补充，H5向APP传输数据
     - H5中区分IOS或Android后，直接调用APP方法
     - 注意：**Android不支持接收JSON**，硬送拿到的是`undefined`
    ```javascript
     export const logEvent = (data)=> {
        if (browser.versions.android) {
        // * Android不支持json需送字符串
          let jsonStr = JSON.stringify(data);
          window.statistics.appFun(jsonStr);
        } else if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
          if (window.webkit && window.webkit.messageHandlers) {
                  window.webkit.messageHandlers.statistics.postMessage({
                  'cmd': 'appFun',
                  'data': data
                  });
              }
            }
        };
  
