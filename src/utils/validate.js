/**
 * Created by PanJiaChen on 16/11/18.
 */
/* eslint-disable */
/**
 * @param {string} path
 * @returns {Boolean}
 */
import CryptoJS from "crypto-js";
import { getOss } from "@/api/oss";
import { resolve } from "url";
import { reject } from "q";
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

export function validatePass(str) {
  return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{8,}$/.test(str);
}
/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^\w+([.]\w+)?[@]\w+[.]\w+([.]\w+)?$/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}
// 解析excel
export function getOssUrl(url) {
  return new Promise((resolve, reject) => {
    getOss().then(res => {
      const data = res.data.data;
      const client = new OSS({
        accessKeyId: data.AccessKeyId,
        accessKeySecret: data.AccessKeySecret,
        stsToken: data.SecurityToken,
        endpoint: "https://oss-cn-beijing.aliyuncs.com",
        bucket: "yyc-css"
      });
      if (url) {
        console.log("url", url);
        var dataUrl = client.signatureUrl(url);
        console.log("dataUrl", dataUrl);
        resolve(dataUrl);
      } else {
        reject("");
      }
    });
  });
}

// 得到excel文件
export function getExcel(url) {
  return new Promise((resolve, reject) => {
    getOss().then(res => {
      const data = res.data.data;

      const OssClient = require("ali-oss");
      // var client = new OssClient('https://oss-cn-beijing.aliyuncs.com', data.AccessKeyId, data.AccessKeySecret);
      const client = new OssClient({
        accessKeyId: data.AccessKeyId,
        accessKeySecret: data.AccessKeySecret,
        stsToken: data.SecurityToken,
        endpoint: "https://oss-cn-beijing.aliyuncs.com",
        bucket: "yyc-css"
      });
      console.log("client", client);
      async function getBuffer() {
        try {
          let result = await client.get(url);
          console.log(result.content);
          resolve(result.content);
        } catch (e) {
          console.log(e);
        }
      }

      getBuffer();
    });
  });
}
// 加密
export function encrypt(word, keyStr) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, keyStr);
  return encrypted.toString();
}
//解密
export function decrypt(word, keyStr) {
  var decrypt = CryptoJS.AES.decrypt(word, keyStr);
  return decrypt.toString(CryptoJS.enc.Utf8);
}
