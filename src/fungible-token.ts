import {
  Address,
  addressFromContractId,
  DUST_AMOUNT,
  hexToString,
  NodeProvider,
  SignerProvider,
  stringToHex,
  TransactionBuilder,
  web3
} from '@alephium/web3'
import { Network } from './network'
import { TokenFaucet, Withdraw } from '../artifacts/ts'
import { balanceOf, signAndSend, waitTxConfirmed } from './utils'
import { MAX_U256 } from './consts'
import { TokenAmount } from './types'

export type TokenMetaData = {
  symbol: string
  name: string
  decimals: bigint
  totalSupply: TokenAmount
}

export class FungibleToken {
  network: Network

  private constructor(network: Network) {
    this.network = network
  }

  static async deploy(
    signer: SignerProvider,
    network: Network,
    supply = 0n as TokenAmount,
    name: string = '',
    symbol: string = '',
    decimals: bigint = 0n
  ): Promise<string> {
    const deployResult = await waitTxConfirmed(
      TokenFaucet.deploy(signer, {
        initialFields: {
          name: stringToHex(name),
          symbol: stringToHex(symbol),
          decimals,
          supply: MAX_U256,
          balance: MAX_U256
        },
        issueTokenAmount: MAX_U256
      })
    )

    await Withdraw.execute(signer, {
      initialFields: {
        token: deployResult.contractInstance.contractId,
        amount: supply
      },
      attoAlphAmount: DUST_AMOUNT
    })

    return deployResult.contractInstance.contractId
  }

  static load(network: Network): FungibleToken {
    return new FungibleToken(network)
  }

  async mintTx(signer: SignerProvider, value: TokenAmount, tokenId: string) {
    const tokenAddress = addressFromContractId(tokenId)
    const tokenFaucet = TokenFaucet.at(tokenAddress)
    const builder = TransactionBuilder.from(web3.getCurrentNodeProvider())
    const bytecode = Withdraw.script.buildByteCodeToDeploy({
      token: tokenFaucet.contractId,
      amount: value
    })

    const { address, publicKey } = await signer.getSelectedAccount()

    const unsignedTxBuild = await builder.buildExecuteScriptTx(
      { signerAddress: address, bytecode, attoAlphAmount: DUST_AMOUNT },
      publicKey
    )
    return unsignedTxBuild
  }

  async mint(signer: SignerProvider, value: TokenAmount, tokenId: string) {
    const tx = await this.mintTx(signer, value, tokenId)
    return await signAndSend(signer, tx)
  }

  async getAllBalances(tokens: string[], owner: Address): Promise<Map<string, TokenAmount>> {
    const balances = await Promise.all(tokens.map(token => this.getBalanceOf(owner, token)))

    return new Map(tokens.map((token, i) => [token, balances[i]]))
  }

  async getBalanceOf(owner: Address, tokenId: string): Promise<TokenAmount> {
    return balanceOf(tokenId, owner)
  }

  async getTokenMetaDataMulti(tokenId: Array<string>): Promise<Map<string, TokenMetaData>> {
    const metadata = await Promise.all(tokenId.map((tokenId, _) => this.getTokenMetadata(tokenId)))

    return new Map(tokenId.map((tokenId, i) => [tokenId, metadata[i]]))
  }

  async getTokenMetadata(tokenId: string): Promise<TokenMetaData> {
    const nodeProvider = web3.getCurrentNodeProvider()
    const metadata = await nodeProvider.fetchFungibleTokenMetaData(tokenId)
    return {
      symbol: hexToString(metadata.symbol),
      name: hexToString(metadata.name),
      decimals: BigInt(metadata.decimals),
      totalSupply: BigInt(metadata.totalSupply) as TokenAmount
    }
  }

  async getTokenName(tokenId: string): Promise<string> {
    const nodeProvider = web3.getCurrentNodeProvider()
    return hexToString((await nodeProvider.fetchFungibleTokenMetaData(tokenId)).name)
  }

  async getTokenSymbol(tokenId: string): Promise<string> {
    const nodeProvider = web3.getCurrentNodeProvider()
    return hexToString((await nodeProvider.fetchFungibleTokenMetaData(tokenId)).symbol)
  }

  async getTokenDecimals(tokenId: string): Promise<bigint> {
    const nodeProvider = web3.getCurrentNodeProvider()
    return BigInt((await nodeProvider.fetchFungibleTokenMetaData(tokenId)).decimals)
  }
}
