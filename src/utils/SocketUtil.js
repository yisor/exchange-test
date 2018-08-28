let lockReconnect = false;  // 避免ws重复连接
let closeSign = false;
let ws = null;
const wsUrl = 'ws://192.168.1.149:8082/exchange/appapi/ws';

export const createWebSocket = (params, onCallback = () => { }) => {
  try {
    ws = new WebSocket(wsUrl);
    initEventHandle(wsUrl, params, onCallback);
  } catch (err) {
    reconnect(wsUrl, params, onCallback);
    console.error(err);
  }
};

export const closeWebSocket = () => {
  try {
    closeSign = true;
    console.log('主动关闭');
    ws.close();
  } catch (err) {
    console.error(err);
  }
};

const initEventHandle = (wsUrl, params, onCallback) => {
  ws.onopen = () => {
    // 心跳检测重置
    heartCheck.reset().start();
    console.log('连接成功!' + new Date().toUTCString());
    ws.send(JSON.stringify(params));
  };
  ws.onmessage = (event) => {
    // 如果获取到消息，心跳检测重置
    heartCheck.reset().start();
    // 拿到任何消息都说明当前连接是正常的
    onCallback(event.data);
  };
  ws.onclose = () => {
    console.log('连接关闭!' + new Date().toUTCString());
    if (closeSign) {
      closeSign = false;
    }
  };
  ws.onerror = () => {
    reconnect(wsUrl, params, onCallback);
    console.log('连接错误!');
  };
};

const reconnect = (url, params, onCallback) => {
  if (lockReconnect) return;
  lockReconnect = true;
  // 没连接上会一直重连，设置延迟避免请求过多
  setTimeout(() => {
    createWebSocket(url, params, onCallback);
    lockReconnect = false;
  }, 3000);
};

// 心跳检测
const heartCheck = {
  timeout: 60 * 1000, // 60秒发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function () {
    let self = this;
    this.timeoutObj = setTimeout(() => {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      ws.send('ping');
      self.serverTimeoutObj = setTimeout(() => { // 如果超过一定时间还没重置，说明后端主动断开了
        ws.close();     // 如果直接执行reconnect 会触发onclose导致重连两次
      }, self.timeout);
    }, this.timeout);
  }
};
