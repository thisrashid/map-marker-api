export const only = (obj: any = {}, keys: string[]) => keys.reduce((ret: any, key: string) => {
  if (!obj[key]) return ret;
  ret[key] = obj[key];
  return ret;
}, {});