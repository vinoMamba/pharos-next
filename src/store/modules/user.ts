import {defineStore} from "pinia";
import {ref} from "vue";
import type {UserInfo} from "/#/store";
import type {RoleEnum} from "/@/enums/roleEnum";
import {computed} from "vue";
import type {ErrorMessageMode} from "/#/axios";
import {router} from "/@/router";
import {PageEnum} from "/@/enums/pageEnum";
import {isArray} from "/@/utils/is";
import {usePermissionStore} from "./permission";
import type {RouteRecordRaw} from "vue-router";
import {PAGE_NOT_FOUND_ROUTE} from "/@/router/routes/basic";
import {store} from "..";

export const useUserStore = defineStore("app-user", () => {
  const userInfo = ref<Nullable<UserInfo>>(null)
  const token = ref<string | undefined>(undefined)
  const roleList = ref<RoleEnum[]>([])
  const sessionTimeout = ref(false)
  const lastUpdateTime = ref(0)

  const getUserInfo = computed<UserInfo>(() => userInfo.value || {} as UserInfo)
  const getToken = computed(() => token.value || "")
  const getRoleList = computed(() => roleList.value || [])
  const getSessionTimeout = computed(() => sessionTimeout.value)
  const getLastUpdateTime = computed(() => lastUpdateTime.value)

  function setToken(info?: string) {
    token.value = info
    //TODO: save token to local storage
  }

  function setRoleList(role: RoleEnum[]) {
    roleList.value = role
  }

  function setUserInfo(info: UserInfo | null) {
    userInfo.value = info
    lastUpdateTime.value = new Date().getTime()
  }

  function setSessionTimeout(flag: boolean) {
    sessionTimeout.value = flag
  }

  function resetState() {
    userInfo.value = null
    token.value = ''
    roleList.value = []
    sessionTimeout.value = false
    lastUpdateTime.value = 0
  }

  /**
 * @description: login
 */
  async function login(
    params: {
      goHome?: boolean;
      mode?: ErrorMessageMode;
    },
  ): Promise<any | null> {
    try {
      const {goHome = true} = params;
      //TODO login API
      const data = {token: "123456789"}
      const {token} = data;

      // save token
      setToken(token);
      return afterLoginAction(goHome);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function afterLoginAction(goHome?: boolean): Promise<any | null> {
    if (!getToken.value) return null;
    // get user info
    const userInfo = await getUserInfoAction();
    const sessionTimeout = getSessionTimeout
    if (sessionTimeout.value) {
      setSessionTimeout(false);
    } else {
      const permissionStore = usePermissionStore();
      if (!permissionStore.getIsDynamicAddedRoute) {
        console.log('动态路由未添加');
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
        permissionStore.setDynamicAddedRoute(true);
      }
      goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
    }
    return userInfo;
  }

  async function getUserInfoAction(): Promise<UserInfo | null> {
    if (!getToken.value) return null;
    //TODO: get user info API
    const userInfo = {
      userId: "1",
      username: "admin",
      realName: "admin",
      desc: "manager",
      roles: [],
      homePath: "/dashboard/analysis",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=123456&s=640",
    } as UserInfo
    const {roles = []} = userInfo;
    if (isArray(roles)) {
      const roleList = roles.map((item) => item.value) as RoleEnum[];
      setRoleList(roleList);
    } else {
      userInfo.roles = [];
      setRoleList([]);
    }
    setUserInfo(userInfo);
    return userInfo;
  }


  async function logout(goLogin = false) {
    if (getToken.value) {
      try {
        //TODO: logout API
      } catch {
        console.log('注销Token失败');
      }
    }
    setToken(undefined);
    setSessionTimeout(false);
    setUserInfo(null);
    goLogin && router.push(PageEnum.BASE_LOGIN);
  }


  return {
    getUserInfo,
    getToken,
    getRoleList,
    getSessionTimeout,
    getLastUpdateTime,
    setToken,
    setRoleList,
    setUserInfo,
    setSessionTimeout,
    resetState,
    login,
    logout
  }
})


// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}

