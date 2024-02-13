/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as HelpersContractJson } from "../math/Helpers.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace HelpersTypes {
  export type State = Omit<ContractState<any>, "fields">;

  export interface CallMethodTable {
    getSqrtPriceScale: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getLiquidityScale: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getFeeGrowthScale: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getFixedPointScale: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getPercentageScale: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTokenAmountScale: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getMaxTick: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getMinTick: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getMaxSqrtPrice: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getMinSqrtPrice: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTickSearchRange: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    mulToValueUp: {
      params: CallContractParams<{ l: bigint; r: bigint; rScale: bigint }>;
      result: CallContractResult<bigint>;
    };
    mulToValue: {
      params: CallContractParams<{ l: bigint; r: bigint; rScale: bigint }>;
      result: CallContractResult<bigint>;
    };
    divValuesToTokenUp: {
      params: CallContractParams<{ l: bigint; r: bigint }>;
      result: CallContractResult<bigint>;
    };
    divValuesToToken: {
      params: CallContractParams<{ l: bigint; r: bigint }>;
      result: CallContractResult<bigint>;
    };
    fromDecimalToValue: {
      params: CallContractParams<{ l: bigint; lScale: bigint; rScale: bigint }>;
      result: CallContractResult<bigint>;
    };
    divValuesUp: {
      params: CallContractParams<{ l: bigint; r: bigint }>;
      result: CallContractResult<bigint>;
    };
    divValues: {
      params: CallContractParams<{ l: bigint; r: bigint }>;
      result: CallContractResult<bigint>;
    };
    mulUp: {
      params: CallContractParams<{ l: bigint; r: bigint; rScale: bigint }>;
      result: CallContractResult<bigint>;
    };
    almostOne: {
      params: CallContractParams<{ scale: bigint }>;
      result: CallContractResult<bigint>;
    };
    one: {
      params: CallContractParams<{ scale: bigint }>;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
}

class Factory extends ContractFactory<HelpersInstance, {}> {
  at(address: string): HelpersInstance {
    return new HelpersInstance(address);
  }

  tests = {
    getSqrtPriceScale: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getSqrtPriceScale",
        params === undefined ? {} : params
      );
    },
    getLiquidityScale: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getLiquidityScale",
        params === undefined ? {} : params
      );
    },
    getFeeGrowthScale: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getFeeGrowthScale",
        params === undefined ? {} : params
      );
    },
    getFixedPointScale: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getFixedPointScale",
        params === undefined ? {} : params
      );
    },
    getPercentageScale: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getPercentageScale",
        params === undefined ? {} : params
      );
    },
    getTokenAmountScale: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getTokenAmountScale",
        params === undefined ? {} : params
      );
    },
    getMaxTick: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getMaxTick", params === undefined ? {} : params);
    },
    getMinTick: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getMinTick", params === undefined ? {} : params);
    },
    getMaxSqrtPrice: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getMaxSqrtPrice",
        params === undefined ? {} : params
      );
    },
    getMinSqrtPrice: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getMinSqrtPrice",
        params === undefined ? {} : params
      );
    },
    getTickSearchRange: async (
      params?: Omit<
        TestContractParams<never, never>,
        "testArgs" | "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(
        this,
        "getTickSearchRange",
        params === undefined ? {} : params
      );
    },
    mulToValueUp: async (
      params: Omit<
        TestContractParams<never, { l: bigint; r: bigint; rScale: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "mulToValueUp", params);
    },
    mulToValue: async (
      params: Omit<
        TestContractParams<never, { l: bigint; r: bigint; rScale: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "mulToValue", params);
    },
    divValuesToTokenUp: async (
      params: Omit<
        TestContractParams<never, { l: bigint; r: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "divValuesToTokenUp", params);
    },
    divValuesToToken: async (
      params: Omit<
        TestContractParams<never, { l: bigint; r: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "divValuesToToken", params);
    },
    fromDecimalToValue: async (
      params: Omit<
        TestContractParams<
          never,
          { l: bigint; lScale: bigint; rScale: bigint }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "fromDecimalToValue", params);
    },
    divValuesUp: async (
      params: Omit<
        TestContractParams<never, { l: bigint; r: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "divValuesUp", params);
    },
    divValues: async (
      params: Omit<
        TestContractParams<never, { l: bigint; r: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "divValues", params);
    },
    mulUp: async (
      params: Omit<
        TestContractParams<never, { l: bigint; r: bigint; rScale: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "mulUp", params);
    },
    almostOne: async (
      params: Omit<
        TestContractParams<never, { scale: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "almostOne", params);
    },
    one: async (
      params: Omit<
        TestContractParams<never, { scale: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "one", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Helpers = new Factory(
  Contract.fromJson(
    HelpersContractJson,
    "",
    "7659d8ae0e8c8ca7d7e5d0d00fe7655eb1ad0d506bfea5292e0fd0cf56779c83"
  )
);

// Use this class to interact with the blockchain
export class HelpersInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<HelpersTypes.State> {
    return fetchContractState(Helpers, this);
  }

  methods = {
    getSqrtPriceScale: async (
      params?: HelpersTypes.CallMethodParams<"getSqrtPriceScale">
    ): Promise<HelpersTypes.CallMethodResult<"getSqrtPriceScale">> => {
      return callMethod(
        Helpers,
        this,
        "getSqrtPriceScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getLiquidityScale: async (
      params?: HelpersTypes.CallMethodParams<"getLiquidityScale">
    ): Promise<HelpersTypes.CallMethodResult<"getLiquidityScale">> => {
      return callMethod(
        Helpers,
        this,
        "getLiquidityScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getFeeGrowthScale: async (
      params?: HelpersTypes.CallMethodParams<"getFeeGrowthScale">
    ): Promise<HelpersTypes.CallMethodResult<"getFeeGrowthScale">> => {
      return callMethod(
        Helpers,
        this,
        "getFeeGrowthScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getFixedPointScale: async (
      params?: HelpersTypes.CallMethodParams<"getFixedPointScale">
    ): Promise<HelpersTypes.CallMethodResult<"getFixedPointScale">> => {
      return callMethod(
        Helpers,
        this,
        "getFixedPointScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPercentageScale: async (
      params?: HelpersTypes.CallMethodParams<"getPercentageScale">
    ): Promise<HelpersTypes.CallMethodResult<"getPercentageScale">> => {
      return callMethod(
        Helpers,
        this,
        "getPercentageScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTokenAmountScale: async (
      params?: HelpersTypes.CallMethodParams<"getTokenAmountScale">
    ): Promise<HelpersTypes.CallMethodResult<"getTokenAmountScale">> => {
      return callMethod(
        Helpers,
        this,
        "getTokenAmountScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMaxTick: async (
      params?: HelpersTypes.CallMethodParams<"getMaxTick">
    ): Promise<HelpersTypes.CallMethodResult<"getMaxTick">> => {
      return callMethod(
        Helpers,
        this,
        "getMaxTick",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMinTick: async (
      params?: HelpersTypes.CallMethodParams<"getMinTick">
    ): Promise<HelpersTypes.CallMethodResult<"getMinTick">> => {
      return callMethod(
        Helpers,
        this,
        "getMinTick",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMaxSqrtPrice: async (
      params?: HelpersTypes.CallMethodParams<"getMaxSqrtPrice">
    ): Promise<HelpersTypes.CallMethodResult<"getMaxSqrtPrice">> => {
      return callMethod(
        Helpers,
        this,
        "getMaxSqrtPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMinSqrtPrice: async (
      params?: HelpersTypes.CallMethodParams<"getMinSqrtPrice">
    ): Promise<HelpersTypes.CallMethodResult<"getMinSqrtPrice">> => {
      return callMethod(
        Helpers,
        this,
        "getMinSqrtPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTickSearchRange: async (
      params?: HelpersTypes.CallMethodParams<"getTickSearchRange">
    ): Promise<HelpersTypes.CallMethodResult<"getTickSearchRange">> => {
      return callMethod(
        Helpers,
        this,
        "getTickSearchRange",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    mulToValueUp: async (
      params: HelpersTypes.CallMethodParams<"mulToValueUp">
    ): Promise<HelpersTypes.CallMethodResult<"mulToValueUp">> => {
      return callMethod(
        Helpers,
        this,
        "mulToValueUp",
        params,
        getContractByCodeHash
      );
    },
    mulToValue: async (
      params: HelpersTypes.CallMethodParams<"mulToValue">
    ): Promise<HelpersTypes.CallMethodResult<"mulToValue">> => {
      return callMethod(
        Helpers,
        this,
        "mulToValue",
        params,
        getContractByCodeHash
      );
    },
    divValuesToTokenUp: async (
      params: HelpersTypes.CallMethodParams<"divValuesToTokenUp">
    ): Promise<HelpersTypes.CallMethodResult<"divValuesToTokenUp">> => {
      return callMethod(
        Helpers,
        this,
        "divValuesToTokenUp",
        params,
        getContractByCodeHash
      );
    },
    divValuesToToken: async (
      params: HelpersTypes.CallMethodParams<"divValuesToToken">
    ): Promise<HelpersTypes.CallMethodResult<"divValuesToToken">> => {
      return callMethod(
        Helpers,
        this,
        "divValuesToToken",
        params,
        getContractByCodeHash
      );
    },
    fromDecimalToValue: async (
      params: HelpersTypes.CallMethodParams<"fromDecimalToValue">
    ): Promise<HelpersTypes.CallMethodResult<"fromDecimalToValue">> => {
      return callMethod(
        Helpers,
        this,
        "fromDecimalToValue",
        params,
        getContractByCodeHash
      );
    },
    divValuesUp: async (
      params: HelpersTypes.CallMethodParams<"divValuesUp">
    ): Promise<HelpersTypes.CallMethodResult<"divValuesUp">> => {
      return callMethod(
        Helpers,
        this,
        "divValuesUp",
        params,
        getContractByCodeHash
      );
    },
    divValues: async (
      params: HelpersTypes.CallMethodParams<"divValues">
    ): Promise<HelpersTypes.CallMethodResult<"divValues">> => {
      return callMethod(
        Helpers,
        this,
        "divValues",
        params,
        getContractByCodeHash
      );
    },
    mulUp: async (
      params: HelpersTypes.CallMethodParams<"mulUp">
    ): Promise<HelpersTypes.CallMethodResult<"mulUp">> => {
      return callMethod(Helpers, this, "mulUp", params, getContractByCodeHash);
    },
    almostOne: async (
      params: HelpersTypes.CallMethodParams<"almostOne">
    ): Promise<HelpersTypes.CallMethodResult<"almostOne">> => {
      return callMethod(
        Helpers,
        this,
        "almostOne",
        params,
        getContractByCodeHash
      );
    },
    one: async (
      params: HelpersTypes.CallMethodParams<"one">
    ): Promise<HelpersTypes.CallMethodResult<"one">> => {
      return callMethod(Helpers, this, "one", params, getContractByCodeHash);
    },
  };

  async multicall<Calls extends HelpersTypes.MultiCallParams>(
    calls: Calls
  ): Promise<HelpersTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      Helpers,
      this,
      calls,
      getContractByCodeHash
    )) as HelpersTypes.MultiCallResults<Calls>;
  }
}
