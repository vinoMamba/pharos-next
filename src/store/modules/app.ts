import {defineStore} from "pinia";
import {ref} from "vue";
import type {ProjectConfig} from "/#/config";
import type {BeforeMiniState} from "/#/store";
import {computed} from "vue";
import {deepMerge} from "/@/utils/common";
import {projectSetting as settingConfig} from "/@/settings/projectSetting";
import {resetRouter} from "/@/router";
import {store} from "..";

let timeId: TimeoutHandle;
export const useAppStore = defineStore("app-config", () => {
  const pageLoading = ref(false)
  const projectConfig = ref<ProjectConfig | null>(null)
  const beforeMiniInfo = ref<BeforeMiniState>({})

  const getPageLoading = computed(() => pageLoading.value)
  const getBeforeMiniInfo = computed(() => beforeMiniInfo.value)
  const getProjectConfig = computed(() => projectConfig.value || {} as ProjectConfig)
  const getTransitionSetting = computed(() => getProjectConfig.value.transitionSetting)
  const getMenuSetting = computed(() => getProjectConfig.value.menuSetting)

  function setPageLoading(loading: boolean) {
    pageLoading.value = loading
  }

  function setBeforeMiniInfo(info: BeforeMiniState) {
    beforeMiniInfo.value = info
  }

  function setProjectConfig(config: Partial<ProjectConfig>) {
    projectConfig.value = deepMerge(settingConfig, config)
  }

  async function resetAllState() {
    resetRouter();
  }

  async function setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId);
      // Prevent flicker
      timeId = setTimeout(() => {
        setPageLoading(loading);
      }, 50);
    } else {
      setPageLoading(loading);
      clearTimeout(timeId);
    }
  }

  return {
    getPageLoading,
    getBeforeMiniInfo,
    getProjectConfig,
    setPageLoading,
    setBeforeMiniInfo,
    setProjectConfig,
    resetAllState,
    setPageLoadingAction,
    getTransitionSetting,
    getMenuSetting
  }
})


// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}

