import moment from "moment";
import SecureLS from "secure-ls";
import axios from "axios";

const convertTime = (time: string) => {
  const lastStr = time.slice(time.length - 1, time.length);
  const timeNumber = time.replace(lastStr, "");
  let timeCount = 0;
  switch (lastStr) {
    case "y":
      timeCount = Number(timeNumber) * 60 * 60 * 24 * 365 * 1000; // x years
      break;
    case "d":
      timeCount = Number(timeNumber) * 60 * 60 * 24 * 1000; // x days
      break;
    case "h":
      timeCount = Number(timeNumber) * 60 * 60 * 1000; // x hours
      break;
    case "m":
      timeCount = Number(timeNumber) * 60 * 1000; // x months
      break;
    case "s":
      timeCount = Number(timeNumber) * 1000; // x seconds
      break;
    default:
      break;
  }

  return timeCount;
};

const fetchWithCache = async (
  cacheName: string,
  cacheParams: any,
  expire: string,
  fetchAPI: Function
) => {
  const ls = new SecureLS({
    encodingType: "rc4",
    isCompression: false,
    encryptionSecret: "MySt@ys@123"
  });
  const cacheItem = ls.get(cacheName);
  const cacheParse = cacheItem ? JSON.parse(cacheItem) : {};
  const currentTime = new Date().getTime();
  const expireNumber = convertTime(expire);

  if (cacheParse && cacheParse.expireTime < currentTime) {
    ls.remove(cacheName);
  }

  if (
    !ls.get(cacheName) ||
    JSON.stringify(cacheParse.cacheParams) !== JSON.stringify(cacheParams)
  ) {
    const response = await fetchAPI(cacheParams);
    const expireTime = new Date().getTime() + expireNumber;
    const cacheObj = {
      cacheParams,
      expireTime,
      expireTimeFormat: moment(expireTime).format("MM/DD/YYYY, h:mm:ss"),
      response
    };
    ls.set(cacheName, JSON.stringify(cacheObj));
  }

  const jsonObj = ls.get(cacheName);
  return jsonObj ? JSON.parse(jsonObj).response : {};
};

export default fetchWithCache;
