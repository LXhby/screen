/* eslint-disable */
import store from "@/store/index";
import OSS from "ali-oss";
export function getpicUrl(urlpic, type) {
  return new Promise((resolve, reject) => {
    const client = new OSS({
      accessKeyId: store.getters.AccessKeyId,
      accessKeySecret: store.getters.AccessKeySecret,
      stsToken: store.getters.SecurityToken,
      endpoint: "https://oss-cn-beijing.aliyuncs.com",
      bucket: "yyc-css"
    });
    var datapic;
    if (urlpic) {
      console.log("type", type.indexOf("image"));
      if (type.indexOf("image") != -1) {
        datapic = client.signatureUrl(urlpic, {
          expires: 600
          // process: "style/q_50"
        });
        console.log("datapic", datapic);
        resolve(datapic);
      } else {
        datapic = client.signatureUrl(urlpic, {
          expires: 600
        });
        resolve(datapic);
      }
    }
  });
}

export function UploadOss(info) {
  return new Promise((resolve, reject) => {
    var getinfo = uploadfile(info);
    console.log("getinfo", getinfo);
    resolve(getinfo);
  });
}

export async function uploadfile(info) {
  const client = new OSS({
    accessKeyId: store.getters.AccessKeyId,
    accessKeySecret: store.getters.AccessKeySecret,
    stsToken: store.getters.SecurityToken,
    endpoint: "https://oss-cn-beijing.aliyuncs.com",
    bucket: "yyc-css"
  });
  await client
    .multipartUpload(info.storeAs, info.file)
    .then(function(result) {
      console.log("oss上传", result);
      if (result.res.status === 200) {
        return result;
      } else {
        return "";
      }
    })
    .catch(function(err) {
      return "";
    });
}
