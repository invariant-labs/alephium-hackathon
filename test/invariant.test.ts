import { DUST_AMOUNT, ONE_ALPH, ZERO_ADDRESS, toApiByteVec, web3 } from '@alephium/web3'
import { getSigner, testAddress } from '@alephium/web3-test'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { AddFeeTier, CreatePool, CreateTick, Init, Invariant, RemoveFeeTier } from '../artifacts/ts'
import { testPrivateKeys } from '../src/consts'
import { decodePools, deployInvariant, expectError } from '../src/utils'

web3.setCurrentNodeProvider('http://127.0.0.1:22973')
let sender = new PrivateKeyWallet({ privateKey: testPrivateKeys[0] })

describe('invariant tests', () => {
  beforeAll(async () => {
    sender = await getSigner(ONE_ALPH * 1000n, 0)
  })

  test('collection', async () => {
    const invariantResult = await deployInvariant(sender, 0n)

    const invariant = Invariant.at(invariantResult.contractInstance.address)

    await Init.execute(sender, {
      initialFields: { invariant: invariant.contractId },
      attoAlphAmount: ONE_ALPH * 6n + DUST_AMOUNT * 2n
    })

    let feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(0n)

    await AddFeeTier.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        fee: 0n,
        tickSpacing: 1n
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(1n)

    await AddFeeTier.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        fee: 0n,
        tickSpacing: 2n
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(2n)

    await expectError(
      AddFeeTier.execute(sender, {
        initialFields: {
          invariant: invariant.contractId,
          fee: 0n,
          tickSpacing: 1n
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })
    )

    feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(2n)

    await RemoveFeeTier.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        fee: 0n,
        tickSpacing: 1n
      }
    })

    feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(1n)

    await expectError(
      RemoveFeeTier.execute(sender, {
        initialFields: {
          invariant: invariant.contractId,
          fee: 0n,
          tickSpacing: 1n
        }
      })
    )

    feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(1n)

    await expectError(
      RemoveFeeTier.execute(sender, {
        initialFields: {
          invariant: invariant.contractId,
          fee: 0n,
          tickSpacing: 1n
        }
      })
    )

    feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(1n)

    await RemoveFeeTier.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        fee: 0n,
        tickSpacing: 2n
      }
    })

    feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(0n)
  })

  test('create pool', async () => {
    const invariantResult = await deployInvariant(sender, 0n)

    const invariant = Invariant.at(invariantResult.contractInstance.address)

    await Init.execute(sender, {
      initialFields: { invariant: invariant.contractId },
      attoAlphAmount: ONE_ALPH * 6n + DUST_AMOUNT * 2n
    })

    let feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(0n)

    await AddFeeTier.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        fee: 0n,
        tickSpacing: 1n
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    await CreatePool.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        token0: ZERO_ADDRESS,
        token1: testAddress,
        fee: 0n,
        tickSpacing: 1n,
        initSqrtPrice: 1000000000000000000000000n,
        initTick: 0n
      },
      attoAlphAmount: ONE_ALPH * 2n + DUST_AMOUNT * 2n
    })
  })
  test('create pool', async () => {
    const invariantResult = await deployInvariant(sender, 0n)

    const invariant = Invariant.at(invariantResult.contractInstance.address)

    await Init.execute(sender, {
      initialFields: { invariant: invariant.contractId },
      attoAlphAmount: ONE_ALPH * 6n + DUST_AMOUNT * 2n
    })

    let feeTier = await invariant.methods.getFeeTierCount()
    expect(feeTier.returns).toEqual(0n)

    await AddFeeTier.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        fee: 100n,
        tickSpacing: 1n
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    await CreatePool.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        token0: ZERO_ADDRESS,
        token1: testAddress,
        fee: 100n,
        tickSpacing: 1n,
        initSqrtPrice: 1000000000000000000000000n,
        initTick: 0n
      },
      attoAlphAmount: ONE_ALPH * 2n + DUST_AMOUNT * 2n
    })

    const poolKey = toApiByteVec(ZERO_ADDRESS)
    const index = 1n

    await CreateTick.execute(sender, {
      initialFields: {
        invariant: invariant.contractId,
        poolKey,
        tickSpacing: 1n,
        index,
        poolCurrentIndex: 0n,
        poolFeeGrowthGlobalX: 0n,
        poolFeeGrowthGlobalY: 0n,
        poolStartTimestamp: 0n
      },
      attoAlphAmount: ONE_ALPH * 2n + DUST_AMOUNT * 2n
    })

    const pools = await invariant.methods.getPools()
    const parsedPools = decodePools(pools.returns)

    expect(parsedPools.length).toBe(1)
    // expect(parsedPools[0].token0).toBe(ZERO_ADDRESS)
    // expect(parsedPools[0].token1).toBe(testAddress)
    expect(parsedPools[0].fee).toBe(100n)
    expect(parsedPools[0].tickSpacing).toBe(1n)

    {
      const params = { args: { poolKey, index } }
      const [doesExist, isInitialized] = (await invariant.methods.tickExist(params)).returns
    }
  })
})
