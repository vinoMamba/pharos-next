import type {ErrorLogInfo} from '/#/store';

import {defineStore} from 'pinia';
import {store} from '/@/store';

import {formatToDateTime} from '/@/utils/date';
import {projectSetting} from '/@/settings/projectSetting';

import {ErrorTypeEnum} from '/@/enums/exceptionEnum';
import type {AxiosError} from 'axios';
import {ref} from 'vue';
import {computed} from 'vue';

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>;
  errorLogListCount: number;
}

export const useErrorLogStore = defineStore('app-error-log', () => {
  const errorLogInfoList = ref<Nullable<ErrorLogInfo[]>>(null);
  const errorLogListCount = ref(0);

  const getErrorLogInfoList = computed(() => errorLogInfoList.value || []);
  const getErrorLogListCount = computed(() => errorLogListCount.value);

  function addErrorLogInfo(info: ErrorLogInfo) {
    const item = {
      ...info,
      time: formatToDateTime(new Date()),
    };
    errorLogInfoList.value = [item, ...(errorLogInfoList.value || [])];
    errorLogListCount.value += 1;
  }

  function setErrorLogListCount(count: number) {
    errorLogListCount.value = count;
  }

  /**
   * Triggered after ajax request error
   * @param error
   * @returns
   */
  function addAjaxErrorInfo(error: AxiosError) {
    const {useErrorHandle} = projectSetting;
    if (!useErrorHandle) {
      return;
    }
    const errInfo: Partial<ErrorLogInfo> = {
      message: error.message,
      type: ErrorTypeEnum.AJAX,
    };
    if (error.response) {
      const {
        config: {url = '', data: params = '', method = 'get', headers = {}} = {},
        data = {},
      } = error.response;
      errInfo.url = url;
      errInfo.name = 'Ajax Error!';
      errInfo.file = '-';
      errInfo.stack = JSON.stringify(data);
      errInfo.detail = JSON.stringify({params, method, headers});
    }
    addErrorLogInfo(errInfo as ErrorLogInfo);
  }

  return {
    getErrorLogInfoList,
    getErrorLogListCount,
    addErrorLogInfo,
    setErrorLogListCount,
    addAjaxErrorInfo,
  }
});


// Need to be used outside the setup
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}

