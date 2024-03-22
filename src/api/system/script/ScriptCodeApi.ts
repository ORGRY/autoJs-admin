import { defHttp } from '/@/utils/http/axios';

export class ScriptCodeApi {

  static batchCreate(params) {
    return defHttp.post({ url: '/registrationCode/batchCreate', params }, { isTransformResponse: false });
  }

  static del(params) {
    return defHttp.post({ url: '/registrationCode/delete', params }, { isTransformResponse: false });
  }


  static findPage(params) {
    return defHttp.get({ url: '/registrationCode/page', params });
  }

  

  static list(params) {
    return defHttp.get({ url: '/userAccount/list', params });
  }

  

  static export(params) {
    return defHttp.get({ url: '/registrationCode/export', params });
  }
}
