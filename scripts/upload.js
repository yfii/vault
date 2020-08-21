const path = require('path');

const fs = require('fs');

const qiniu = require('qiniu');

// qiniu config
const qiniuConfig ={ accessKey: "qURlPdO9gFCrm-0ngE1wVUy6tKNCG0WAqXxtlP7o", secretKey: "Z3vGQTM_-hBv3d2rP5VCButG6ytirP9lGe1cj71d", bucket: "52kantu"};

// 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac
const mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey);

const doUpload = (key, file) => {
  // 创建上传凭证token
  const options = {scope: qiniuConfig.bucket};
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  // 服务端直传
  /*
  * 七牛存储支持空间创建在不同的机房，
  * 在使用七牛的 Node.js SDK 中的FormUploader和ResumeUploader上传文件之前，
  * 必须要构建一个上传用的config对象，在该对象中，可以指定空间对应的zone以及其他的一些影响上传的参数
  * */
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0 //z0代表 华东机房
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject()
      }
      if (info.statusCode === 200) {
        // console.log(body)
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

// webpack打包后生成的 build 目录下的文件
const root = path.join(__dirname, '../build/static');
// const files = fs.readdirSync(path.join(__dirname, '../build/static'));
// 不需要上传的文件
const noNeedUploadFileList = ['asset-manifest.json', 'robots.txt', 'index.html'];

// 上传需要上传的文件至 七牛云 CDN

async function readDirSync(pt, dic) {
  var pa = fs.readdirSync(pt);
  Promise.all(
    pa.map(ele => {
      var info = fs.statSync(pt+"/"+ele)	
      if(info.isDirectory()){
        readDirSync(pt+"/"+ele, dic+ele);
        return Promise.resolve()
      }else{
        if (noNeedUploadFileList.indexOf(info) === -1) {
          return doUpload( path.join(dic, ele), path.join(pt+"/"+ele))
        } else {
          return Promise.resolve('no need upload file ' + file)
        }
      }	
    })
  ).then(resps => {
    console.log(`${pt} upload success:`, resps)
  }).catch(errs => {
    console.log(`${pt} upload fail:`, errs)
    // process.exit(0)
  })
}

readDirSync(root, 'static/')