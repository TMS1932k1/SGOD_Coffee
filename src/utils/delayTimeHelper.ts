const delayTime = (duration: number) =>
  new Promise(f => setTimeout(f, duration));

export default {delayTime};
