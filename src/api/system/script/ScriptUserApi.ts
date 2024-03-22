import { defHttp } from '/@/utils/http/axios';

export class ScriptUserApi {

  static add(params) {
    return defHttp.post({ url: '/userAccount/add', params }, { isTransformResponse: false });
  }

  static batchCreate() {
    return defHttp.post({ url: '/userAccount/batchCreate',  }, { isTransformResponse: false });
  }

  static edit(params) {
    return defHttp.post({ url: '/userAccount/edit', params }, { isTransformResponse: false });
  }


  static del(params) {
    return defHttp.post({ url: '/userAccount/delete', params }, { isTransformResponse: false });
  }

  static renewal(params) {
    return defHttp.post({ url: '/userAccount/renewal', params }, { isTransformResponse: false });
  }
  

  static findPage(params) {
    return defHttp.get({ url: '/userAccount/page', params });
  }

  static updateUserAccountStatus(params) {
    return defHttp.post(
      { url: '/userAccount/enable', params },
      { isTransformResponse: false },
    );
  }

}
