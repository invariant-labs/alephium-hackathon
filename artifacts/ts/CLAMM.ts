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
import { default as CLAMMContractJson } from "../math/CLAMM.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace CLAMMTypes {
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
      params: CallContractParams<{
        from: bigint;
        fromScale: bigint;
        expectedScale: bigint;
      }>;
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
    getDeltaX: {
      params: CallContractParams<{
        sqrtPriceA: bigint;
        sqrtPriceB: bigint;
        liquidity: bigint;
        roundingUp: boolean;
      }>;
      result: CallContractResult<bigint>;
    };
    getDeltaY: {
      params: CallContractParams<{
        sqrtPriceA: bigint;
        sqrtPriceB: bigint;
        liquidity: bigint;
        roundingUp: boolean;
      }>;
      result: CallContractResult<bigint>;
    };
    getNextSqrtPriceXUp: {
      params: CallContractParams<{
        startingSqrtPrice: bigint;
        liquidity: bigint;
        x: bigint;
        addX: boolean;
      }>;
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

class Factory extends ContractFactory<CLAMMInstance, {}> {
  at(address: string): CLAMMInstance {
    return new CLAMMInstance(address);
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
          { from: bigint; fromScale: bigint; expectedScale: bigint }
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
    getDeltaX: async (
      params: Omit<
        TestContractParams<
          never,
          {
            sqrtPriceA: bigint;
            sqrtPriceB: bigint;
            liquidity: bigint;
            roundingUp: boolean;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getDeltaX", params);
    },
    getDeltaY: async (
      params: Omit<
        TestContractParams<
          never,
          {
            sqrtPriceA: bigint;
            sqrtPriceB: bigint;
            liquidity: bigint;
            roundingUp: boolean;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getDeltaY", params);
    },
    getNextSqrtPriceXUp: async (
      params: Omit<
        TestContractParams<
          never,
          {
            startingSqrtPrice: bigint;
            liquidity: bigint;
            x: bigint;
            addX: boolean;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getNextSqrtPriceXUp", params);
    },
  };
}

// Use this object to test and deploy the contract
export const CLAMM = new Factory(
  Contract.fromJson(
    CLAMMContractJson,
    "",
    "727cfbb13ece2e81066a851c82b547af7fafa62ef1d690a8c2690779841948cb"
  )
);

// Use this class to interact with the blockchain
export class CLAMMInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<CLAMMTypes.State> {
    return fetchContractState(CLAMM, this);
  }

  methods = {
    getSqrtPriceScale: async (
      params?: CLAMMTypes.CallMethodParams<"getSqrtPriceScale">
    ): Promise<CLAMMTypes.CallMethodResult<"getSqrtPriceScale">> => {
      return callMethod(
        CLAMM,
        this,
        "getSqrtPriceScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getLiquidityScale: async (
      params?: CLAMMTypes.CallMethodParams<"getLiquidityScale">
    ): Promise<CLAMMTypes.CallMethodResult<"getLiquidityScale">> => {
      return callMethod(
        CLAMM,
        this,
        "getLiquidityScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getFeeGrowthScale: async (
      params?: CLAMMTypes.CallMethodParams<"getFeeGrowthScale">
    ): Promise<CLAMMTypes.CallMethodResult<"getFeeGrowthScale">> => {
      return callMethod(
        CLAMM,
        this,
        "getFeeGrowthScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getFixedPointScale: async (
      params?: CLAMMTypes.CallMethodParams<"getFixedPointScale">
    ): Promise<CLAMMTypes.CallMethodResult<"getFixedPointScale">> => {
      return callMethod(
        CLAMM,
        this,
        "getFixedPointScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getPercentageScale: async (
      params?: CLAMMTypes.CallMethodParams<"getPercentageScale">
    ): Promise<CLAMMTypes.CallMethodResult<"getPercentageScale">> => {
      return callMethod(
        CLAMM,
        this,
        "getPercentageScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTokenAmountScale: async (
      params?: CLAMMTypes.CallMethodParams<"getTokenAmountScale">
    ): Promise<CLAMMTypes.CallMethodResult<"getTokenAmountScale">> => {
      return callMethod(
        CLAMM,
        this,
        "getTokenAmountScale",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMaxTick: async (
      params?: CLAMMTypes.CallMethodParams<"getMaxTick">
    ): Promise<CLAMMTypes.CallMethodResult<"getMaxTick">> => {
      return callMethod(
        CLAMM,
        this,
        "getMaxTick",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMinTick: async (
      params?: CLAMMTypes.CallMethodParams<"getMinTick">
    ): Promise<CLAMMTypes.CallMethodResult<"getMinTick">> => {
      return callMethod(
        CLAMM,
        this,
        "getMinTick",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMaxSqrtPrice: async (
      params?: CLAMMTypes.CallMethodParams<"getMaxSqrtPrice">
    ): Promise<CLAMMTypes.CallMethodResult<"getMaxSqrtPrice">> => {
      return callMethod(
        CLAMM,
        this,
        "getMaxSqrtPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getMinSqrtPrice: async (
      params?: CLAMMTypes.CallMethodParams<"getMinSqrtPrice">
    ): Promise<CLAMMTypes.CallMethodResult<"getMinSqrtPrice">> => {
      return callMethod(
        CLAMM,
        this,
        "getMinSqrtPrice",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTickSearchRange: async (
      params?: CLAMMTypes.CallMethodParams<"getTickSearchRange">
    ): Promise<CLAMMTypes.CallMethodResult<"getTickSearchRange">> => {
      return callMethod(
        CLAMM,
        this,
        "getTickSearchRange",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    mulToValueUp: async (
      params: CLAMMTypes.CallMethodParams<"mulToValueUp">
    ): Promise<CLAMMTypes.CallMethodResult<"mulToValueUp">> => {
      return callMethod(
        CLAMM,
        this,
        "mulToValueUp",
        params,
        getContractByCodeHash
      );
    },
    mulToValue: async (
      params: CLAMMTypes.CallMethodParams<"mulToValue">
    ): Promise<CLAMMTypes.CallMethodResult<"mulToValue">> => {
      return callMethod(
        CLAMM,
        this,
        "mulToValue",
        params,
        getContractByCodeHash
      );
    },
    divValuesToTokenUp: async (
      params: CLAMMTypes.CallMethodParams<"divValuesToTokenUp">
    ): Promise<CLAMMTypes.CallMethodResult<"divValuesToTokenUp">> => {
      return callMethod(
        CLAMM,
        this,
        "divValuesToTokenUp",
        params,
        getContractByCodeHash
      );
    },
    divValuesToToken: async (
      params: CLAMMTypes.CallMethodParams<"divValuesToToken">
    ): Promise<CLAMMTypes.CallMethodResult<"divValuesToToken">> => {
      return callMethod(
        CLAMM,
        this,
        "divValuesToToken",
        params,
        getContractByCodeHash
      );
    },
    fromDecimalToValue: async (
      params: CLAMMTypes.CallMethodParams<"fromDecimalToValue">
    ): Promise<CLAMMTypes.CallMethodResult<"fromDecimalToValue">> => {
      return callMethod(
        CLAMM,
        this,
        "fromDecimalToValue",
        params,
        getContractByCodeHash
      );
    },
    divValuesUp: async (
      params: CLAMMTypes.CallMethodParams<"divValuesUp">
    ): Promise<CLAMMTypes.CallMethodResult<"divValuesUp">> => {
      return callMethod(
        CLAMM,
        this,
        "divValuesUp",
        params,
        getContractByCodeHash
      );
    },
    divValues: async (
      params: CLAMMTypes.CallMethodParams<"divValues">
    ): Promise<CLAMMTypes.CallMethodResult<"divValues">> => {
      return callMethod(
        CLAMM,
        this,
        "divValues",
        params,
        getContractByCodeHash
      );
    },
    mulUp: async (
      params: CLAMMTypes.CallMethodParams<"mulUp">
    ): Promise<CLAMMTypes.CallMethodResult<"mulUp">> => {
      return callMethod(CLAMM, this, "mulUp", params, getContractByCodeHash);
    },
    almostOne: async (
      params: CLAMMTypes.CallMethodParams<"almostOne">
    ): Promise<CLAMMTypes.CallMethodResult<"almostOne">> => {
      return callMethod(
        CLAMM,
        this,
        "almostOne",
        params,
        getContractByCodeHash
      );
    },
    one: async (
      params: CLAMMTypes.CallMethodParams<"one">
    ): Promise<CLAMMTypes.CallMethodResult<"one">> => {
      return callMethod(CLAMM, this, "one", params, getContractByCodeHash);
    },
    getDeltaX: async (
      params: CLAMMTypes.CallMethodParams<"getDeltaX">
    ): Promise<CLAMMTypes.CallMethodResult<"getDeltaX">> => {
      return callMethod(
        CLAMM,
        this,
        "getDeltaX",
        params,
        getContractByCodeHash
      );
    },
    getDeltaY: async (
      params: CLAMMTypes.CallMethodParams<"getDeltaY">
    ): Promise<CLAMMTypes.CallMethodResult<"getDeltaY">> => {
      return callMethod(
        CLAMM,
        this,
        "getDeltaY",
        params,
        getContractByCodeHash
      );
    },
    getNextSqrtPriceXUp: async (
      params: CLAMMTypes.CallMethodParams<"getNextSqrtPriceXUp">
    ): Promise<CLAMMTypes.CallMethodResult<"getNextSqrtPriceXUp">> => {
      return callMethod(
        CLAMM,
        this,
        "getNextSqrtPriceXUp",
        params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends CLAMMTypes.MultiCallParams>(
    calls: Calls
  ): Promise<CLAMMTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      CLAMM,
      this,
      calls,
      getContractByCodeHash
    )) as CLAMMTypes.MultiCallResults<Calls>;
  }
}
