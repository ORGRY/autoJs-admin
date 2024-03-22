import { BaseRequest, BaseResponse } from '/@/api/model/baseModel';
export interface UserAccount extends BaseRequest {
  /**
   * 主键ID
   */
  accountId?: string;

  userAccount?: string;

  cdKeyFlag?: string;

  maxDevices?: string;
 
  useFlag?: string;
}
