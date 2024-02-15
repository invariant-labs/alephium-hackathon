/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  ExecutableScript,
  ExecuteScriptParams,
  ExecuteScriptResult,
  Script,
  SignerProvider,
  HexString,
} from "@alephium/web3";
import { default as AddFeeTierScriptJson } from "../AddFeeTier.ral.json";
import { default as CreatePoolScriptJson } from "../CreatePool.ral.json";
import { default as RemoveFeeTierScriptJson } from "../RemoveFeeTier.ral.json";
import { default as WithdrawScriptJson } from "../Withdraw.ral.json";

export const AddFeeTier = new ExecutableScript<{
  invariant: HexString;
  fee: bigint;
  tickSpacing: bigint;
}>(Script.fromJson(AddFeeTierScriptJson));
export const CreatePool = new ExecutableScript<{
  invariant: HexString;
  token0: Address;
  token1: Address;
  fee: bigint;
  tickSpacing: bigint;
  initSqrtPrice: bigint;
  initTick: bigint;
}>(Script.fromJson(CreatePoolScriptJson));
export const RemoveFeeTier = new ExecutableScript<{
  invariant: HexString;
  fee: bigint;
  tickSpacing: bigint;
}>(Script.fromJson(RemoveFeeTierScriptJson));
export const Withdraw = new ExecutableScript<{
  token: HexString;
  amount: bigint;
}>(Script.fromJson(WithdrawScriptJson));
