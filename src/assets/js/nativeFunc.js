class ReactNative {
  static postMsg(msg) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView?.postMessage(msg);
    } else {
      console.log("send '" + msg + "' to react app");
    }
  }
}
class haptic {
  static vibrate = () => {
    ReactNative.postMsg("vibrate");
  };
  static select = () => {
    ReactNative.postMsg("select");
  };
  static success = () => {
    ReactNative.postMsg("success");
  };
  static error = () => {
    ReactNative.postMsg("error");
  };
  static warning = () => {
    ReactNative.postMsg("warning");
  };
  static light = () => {
    ReactNative.postMsg("light");
  };
  static medium = () => {
    ReactNative.postMsg("medium");
  };
  static heavy = () => {
    ReactNative.postMsg("heavy");
  };
}
class dialog {
  static alert = (msg = "alert") => {
    ReactNative.postMsg(msg);
  };
}

export { haptic, dialog };
