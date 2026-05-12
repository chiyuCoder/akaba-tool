import { callFunc } from "./func-helper";
import { getStringKeyListFrom } from "./type-helper";

/**
 * @since 1.4.17
 */
export interface EnvOneConfig<AbilityId extends string = string> {
  abilityIdList: Array<AbilityId>,
}

/**
 * @since 1.4.17
 */
export type EnvConfigMap<
  EnvId extends string = string,
  AbilityId extends string = string
> = Map<EnvId, EnvOneConfig<AbilityId>>;

/**
 * @since 1.4.17
 */
export class EnvHelper<
  EnvId extends string = string,
  AbilityId extends string = string
> {
  private envId: string = "";
  private currentEnvConfig: EnvOneConfig<AbilityId> | null = null;
  private envConfigMap: EnvConfigMap<EnvId, AbilityId> = new Map();

  public constructor(
    envConfig?: Record<EnvId, Partial<EnvOneConfig<AbilityId>>> | Map<EnvId, Partial<EnvOneConfig<AbilityId>>>,
    envId?: EnvId
  ) {
    if (envConfig) {
      this.setEnvConfig(envConfig);
    }
    if (envId) {
      this.updateEnvId(envId);
    }
  }

  public updateEnvId(envId: EnvId) {
    this.envId = envId;
    this.currentEnvConfig = this.envConfigMap.get(envId) || null;
  }

  public getCurrentEnvConfig() {
    return this.currentEnvConfig;
  }

  public getCurrentEnvConfigSure() {
    return this.currentEnvConfig!;
  }

  public getCurrentIsAbleTo(abilityId: AbilityId) {
    const currentEnvConfig = this.getCurrentEnvConfig();
    if (currentEnvConfig) {
      return currentEnvConfig.abilityIdList.indexOf(abilityId) >= 0;
    }
    return false;
  }

  public getEnvIsAbleTo(envId: EnvId, abilityId: AbilityId) {
    const envConfig = this.envConfigMap.get(envId);
    if (envConfig) {
      return envConfig.abilityIdList.indexOf(abilityId) >= 0;
    }
    return false;
  }

  public addEnvInfo(envId: EnvId, envConfig?: Partial<EnvOneConfig<AbilityId>>): this {
    const targetConfig: EnvOneConfig<AbilityId> = callFunc(() => {
      const  configOne = envConfig || {};
      if (!Array.isArray(configOne.abilityIdList)) {
        configOne.abilityIdList = [];
      }
      return configOne as EnvOneConfig<AbilityId>;
    });
    this.envConfigMap.set(envId, targetConfig);
    if (envId === this.envId) {
      this.currentEnvConfig = targetConfig;
    }
    return this;
  }

  public setEnvConfig(envConfig?: Record<EnvId, Partial<EnvOneConfig<AbilityId>>> | Map<EnvId, Partial<EnvOneConfig<AbilityId>>>): this {
    this.envConfigMap = new Map();
    if (envConfig instanceof Map) {
      Array.from(envConfig.entries()).forEach(([mapKey, mapVal]) => {
        this.addEnvInfo(mapKey, mapVal);
      });
    } else if (envConfig) {
      getStringKeyListFrom(envConfig).forEach((envId) => {
        this.addEnvInfo(envId, envConfig[envId]);
      });
    }
    return this;
  }

  public getEnvId(envId: string): boolean {
    return this.envId === envId;
  }

  public getConfigOnEnv(envId: EnvId) {
    return this.envConfigMap.get(envId);
  }

  public addAbilityOnEnv(envId: EnvId, abilityId: AbilityId) {
    const targetConfig = this.getConfigOnEnv(envId);
    if (targetConfig) {
      if (targetConfig.abilityIdList.indexOf(abilityId) >= 0) {
        return this;
      }
      targetConfig.abilityIdList.push(abilityId);
      return this;
    }
    this.envConfigMap.set(envId, {
      abilityIdList: [
        abilityId,
      ],
    });
    return this;
  }
}

let globalEnvHelper = new EnvHelper<"production" | "development", "printIt">({
  production: {
    abilityIdList: [],
  },
  development: {
    abilityIdList: [],
  },
}, "production");

export function getGlobalEnvHelper<
  EnvId extends string,
  AbilityId extends string
>() {
  return globalEnvHelper as EnvHelper<EnvId, AbilityId>;
}
