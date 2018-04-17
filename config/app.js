/**
 * 小程序配置文件
 */
// 接口URL配置文件

var ENV = "prod";

// 静态图片url domain
var imgMap = {
  'prod': 'cximg',
  'pre': 'chexiangpre',
  'sit': 'chexiangsit'
};
// ajaxurl domain
var domainMap = {
  'prod': 'chexiang',
  'pre': 'chexiangpre',
  'sit': 'chexiangsit'
};
// 支付 templateId
var payTemplateIdMap = {
  'prod': 'nItsmIDSGRdzmVFunWRr6CIcehX2uWcr-OasykliWyg',
  'pre': 'YxfMshipx_ZPk8SLALr4Fp9JUvTnyrBaBUKXFm4g2Ow',
  'sit': '-1wqNhiS3y7p7hpA0t02Xgtlure0qqIp5E1uMsx3ba4'
};
// 预约 templateId
var remindTemplateIdMap = {
  'prod': 'LAxC4VoD-O58qk36ukbY4pF70KFiwxG8ysFkiFCGU4c',
  'pre': 'ttfuHxBejLP3JS_Q8KgPcq_9dO0zzDu-7VJ837tJskw',
  'sit': 'xXtXQaHgEm5M48u9i1ouQd9uqwgXDJlBA7St7OluFjc'
};

var domain = domainMap[ENV];
var imgUrl = imgMap[ENV];
var host = "";

var config = {
    imgUrl,
    domain,
    host,
    debug: false,
    // 消息模板Id
    templateId: {
      pay: payTemplateIdMap[ENV],
      remind: remindTemplateIdMap[ENV]
    },
    // 消息模板点击详情去的页面
    toPage:{
        pay: 'page/coupon/ucenter/ucenter',
        remind: 'page/coupon/product/product?mdseCode='
    },
    //
    // 是否登陆微信
    isWxLoginUrl: `https://mgo.${domain}.com/wxAppLogin/isWxLogin`,
    //
    wxLoginUrl: `https://mgo.${domain}.com/wxAppLogin/wxLogin`,
    // 首页接口
    indexUrl: `https://mgo.${domain}.com/taolibao/index.htm`
};

module.exports = config;