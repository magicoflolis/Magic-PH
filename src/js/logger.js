const t = performance.now(),
  log = (message, alert) => {
    console.groupCollapsed(`[MagicPH] Time: ${t}ms ${alert === "err" ? "ERROR" : ""}`);
    return console.log(message), console.trace(message),console.groupEnd();
  };

export default log;