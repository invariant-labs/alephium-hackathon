import { DUST_AMOUNT, ONE_ALPH, sleep, web3 } from '@alephium/web3'
import { getSigner } from '@alephium/web3-test'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { Flip, InitializeChunk, SetAdmins } from '../artifacts/ts'

import { MaxTick, deployTickmap } from '../src/utils'

web3.setCurrentNodeProvider('http://127.0.0.1:22973')
let sender: PrivateKeyWallet
const poolKey = ''
const TICK_SEARCH_RANGE = 256n
describe('tickmap tests', () => {
  beforeAll(async () => {
    sender = await getSigner(ONE_ALPH * 1000n, 0)
  })

  test('flip', async () => {
    const tickmap = await deployTickmap(sender)

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const params = [
      { tickSpacing: 1n, tick: 0n },
      { tickSpacing: 1n, tick: 7n },
      { tickSpacing: 1n, tick: MaxTick - 1n },
      { tickSpacing: 1n, tick: MaxTick - 40n },
      { tickSpacing: 100n, tick: 20000n }
    ]
    for (const { tick, tickSpacing } of params) {
      const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
        .returns

      await InitializeChunk.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          caller: sender.address,
          poolKey,
          chunk: chunkIndex
        },
        attoAlphAmount: ONE_ALPH
      })

      expect(
        (
          await tickmap.contractInstance.methods.get({
            args: { tick, tickSpacing, poolKey }
          })
        ).returns
      ).toBe(false)

      await Flip.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          value: true,
          tick,
          tickSpacing,
          poolKey
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })

      expect(
        (
          await tickmap.contractInstance.methods.get({
            args: { tick, tickSpacing, poolKey }
          })
        ).returns
      ).toBe(true)

      await Flip.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          value: false,
          tick,
          tickSpacing,
          poolKey
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })

      expect(
        (
          await tickmap.contractInstance.methods.get({
            args: { tick, tickSpacing, poolKey }
          })
        ).returns
      ).toBe(false)
    }
  })
  test('next initialized chunk - simple', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 5n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.nextInitialized({ args: { tick: 0n, tickSpacing: 1n, poolKey } })
    ).returns
    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('next initialized chunk - multiple', async () => {
    const tickmap = await deployTickmap(sender)
    const tick50 = 50n
    const tick100 = 100n
    const tickSpacing = 10n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    {
      const [chunkIndex] = (
        await tickmap.contractInstance.methods.tickToPosition({ args: { tick: tick50, tickSpacing } })
      ).returns

      await InitializeChunk.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          caller: sender.address,
          poolKey,
          chunk: chunkIndex
        },
        attoAlphAmount: ONE_ALPH
      })

      await Flip.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          value: true,
          tick: tick50,
          tickSpacing,
          poolKey
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })
    }
    {
      const [chunkIndex] = (
        await tickmap.contractInstance.methods.tickToPosition({ args: { tick: tick100, tickSpacing } })
      ).returns

      await InitializeChunk.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          caller: sender.address,
          poolKey,
          chunk: chunkIndex
        },
        attoAlphAmount: ONE_ALPH
      })

      await Flip.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          value: true,
          tick: tick100,
          tickSpacing,
          poolKey
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })
    }
    {
      const [isSome, index] = (
        await tickmap.contractInstance.methods.nextInitialized({ args: { tick: 0n, tickSpacing: 10n, poolKey } })
      ).returns
      expect(isSome).toBe(true)
      expect(index).toBe(tick50)
    }
    {
      const [isSome, index] = (
        await tickmap.contractInstance.methods.nextInitialized({ args: { tick: 50n, tickSpacing: 10n, poolKey } })
      ).returns
      expect(isSome).toBe(true)
      expect(index).toBe(tick100)
    }
  })

  test('next initialized chunk - current is last', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 0n
    const tickSpacing = 10n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.nextInitialized({ args: { tick, tickSpacing, poolKey } })
    ).returns
    expect(isSome).toBe(false)
  })
  test('next initialized chunk - just below limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 0n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.nextInitialized({
        args: { tick: -TICK_SEARCH_RANGE, tickSpacing: 1n, poolKey }
      })
    ).returns
    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('next initialized chunk - at limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 0n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.nextInitialized({
        args: { tick: -TICK_SEARCH_RANGE - 1n, tickSpacing: 1n, poolKey }
      })
    ).returns
    expect(isSome).toBe(false)
  })
  test('next initialized chunk - farther than limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = MaxTick - 10n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.nextInitialized({
        args: { tick: -MaxTick + 1n, tickSpacing: 1n, poolKey }
      })
    ).returns
    expect(isSome).toBe(false)
  })
  test('next initialized chunk - hitting the limit limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = MaxTick - 22n
    const tickSpacing = 4n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.nextInitialized({ args: { tick, tickSpacing, poolKey } })
    ).returns
    expect(isSome).toBe(false)
  })
  test('next initialized chunk - already at limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = MaxTick - 2n
    const tickSpacing = 4n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome] = (await tickmap.contractInstance.methods.nextInitialized({ args: { tick, tickSpacing, poolKey } }))
      .returns
    expect(isSome).toBe(false)
  })
  test('next initialized chunk - at pos 255', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = MaxTick - 255n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.nextInitialized({ args: { tick: MaxTick - 256n, tickSpacing, poolKey } })
    ).returns
    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('prev initialized - simple', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = -5n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.prevInitialized({ args: { tick: 0n, tickSpacing, poolKey } })
    ).returns
    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('prev initialized chunk - multiple', async () => {
    const tickmap = await deployTickmap(sender)
    const tick50 = -50n
    const tick100 = -100n
    const tickSpacing = 10n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    {
      const [chunkIndex] = (
        await tickmap.contractInstance.methods.tickToPosition({ args: { tick: tick50, tickSpacing } })
      ).returns

      await InitializeChunk.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          caller: sender.address,
          poolKey,
          chunk: chunkIndex
        },
        attoAlphAmount: ONE_ALPH
      })

      await Flip.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          value: true,
          tick: tick50,
          tickSpacing,
          poolKey
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })
    }
    {
      const [chunkIndex] = (
        await tickmap.contractInstance.methods.tickToPosition({ args: { tick: tick100, tickSpacing } })
      ).returns

      await InitializeChunk.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          caller: sender.address,
          poolKey,
          chunk: chunkIndex
        },
        attoAlphAmount: ONE_ALPH
      })

      await Flip.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          value: true,
          tick: tick100,
          tickSpacing,
          poolKey
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })
    }
    {
      const [isSome, index] = (
        await tickmap.contractInstance.methods.prevInitialized({ args: { tick: 0n, tickSpacing, poolKey } })
      ).returns
      expect(isSome).toBe(true)
      expect(index).toBe(tick50)
    }
    {
      const [isSome, index] = (
        await tickmap.contractInstance.methods.prevInitialized({ args: { tick: -50n, tickSpacing: 10n, poolKey } })
      ).returns
      expect(isSome).toBe(true)
      expect(index).toBe(tick50)
    }
  })
  test('prev initialized chunk - current is last', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 0n
    const tickSpacing = 10n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.prevInitialized({ args: { tick, tickSpacing, poolKey } })
    ).returns
    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('prev initialized chunk - next is last', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 10n
    const tickSpacing = 10n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome] = (
      await tickmap.contractInstance.methods.prevInitialized({ args: { tick: 0n, tickSpacing, poolKey } })
    ).returns
    expect(isSome).toBe(false)
  })
  test('prev initialized chunk - just below limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 0n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.prevInitialized({
        args: { tick: TICK_SEARCH_RANGE, tickSpacing, poolKey }
      })
    ).returns

    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('prev initialized chunk - at limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = 0n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome] = (
      await tickmap.contractInstance.methods.prevInitialized({
        args: { tick: TICK_SEARCH_RANGE + 1n, tickSpacing, poolKey }
      })
    ).returns
    expect(isSome).toBe(false)
  })
  test('prev initialized chunk - farther than limit', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = -MaxTick + 1n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome] = (
      await tickmap.contractInstance.methods.prevInitialized({
        args: { tick: MaxTick - 1n, tickSpacing, poolKey }
      })
    ).returns
    expect(isSome).toBe(false)
  })
  test('prev initialized chunk - at pos 255', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = -MaxTick + 255n
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.prevInitialized({
        args: { tick: -MaxTick + 320n, tickSpacing, poolKey }
      })
    ).returns
    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('prev initialized chunk - at pos 0', async () => {
    const tickmap = await deployTickmap(sender)
    const tick = -MaxTick
    const tickSpacing = 1n

    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [chunkIndex] = (await tickmap.contractInstance.methods.tickToPosition({ args: { tick, tickSpacing } }))
      .returns

    await InitializeChunk.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        caller: sender.address,
        poolKey,
        chunk: chunkIndex
      },
      attoAlphAmount: ONE_ALPH
    })

    await Flip.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        value: true,
        tick,
        tickSpacing,
        poolKey
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    const [isSome, index] = (
      await tickmap.contractInstance.methods.prevInitialized({
        args: { tick: -MaxTick + 255n, tickSpacing, poolKey }
      })
    ).returns
    expect(isSome).toBe(true)
    expect(index).toBe(tick)
  })
  test('get search limit', async () => {
    const tickmap = await deployTickmap(sender)
    await SetAdmins.execute(sender, {
      initialFields: {
        tickmap: tickmap.contractInstance.contractId,
        admin: sender.address
      },
      attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
    })

    {
      const tick = 0n
      const tickSpacing = 1n
      const up = true
      const result = (await tickmap.contractInstance.methods.getSearchLimit({ args: { tick, tickSpacing, up } }))
        .returns
      expect(result).toBe(TICK_SEARCH_RANGE)
    }
    {
      const tick = 0n
      const tickSpacing = 1n
      const up = false
      const result = (await tickmap.contractInstance.methods.getSearchLimit({ args: { tick, tickSpacing, up } }))
        .returns
      expect(result).toBe(-TICK_SEARCH_RANGE)
    }
    {
      const tick = 60n
      const tickSpacing = 12n
      const up = true
      const result = (await tickmap.contractInstance.methods.getSearchLimit({ args: { tick, tickSpacing, up } }))
        .returns
      const expected = tick + TICK_SEARCH_RANGE * tickSpacing
      expect(result).toBe(expected)
    }
    {
      const tick = 60n
      const tickSpacing = 12n
      const up = false
      const result = (await tickmap.contractInstance.methods.getSearchLimit({ args: { tick, tickSpacing, up } }))
        .returns
      const expected = tick - TICK_SEARCH_RANGE * tickSpacing
      expect(result).toBe(expected)
    }
    {
      const tick = MaxTick - 22n
      const tickSpacing = 5n
      const up = true
      const result = (await tickmap.contractInstance.methods.getSearchLimit({ args: { tick, tickSpacing, up } }))
        .returns
      const expected = MaxTick - 3n
      expect(result).toBe(expected)
    }
    {
      const tick = MaxTick - 3n
      const tickSpacing = 5n
      const up = true
      const result = (await tickmap.contractInstance.methods.getSearchLimit({ args: { tick, tickSpacing, up } }))
        .returns
      const expected = tick
      expect(result).toBe(expected)
    }
  })
  test('test next and prev intialized', async () => {
    // initialized edges
    for (let tickSpacing = 1n; tickSpacing <= 10n; tickSpacing++) {
      const tickmap = await deployTickmap(sender)
      await SetAdmins.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          admin: sender.address
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })

      const maxIndex = MaxTick - (MaxTick % tickSpacing)
      const minIndex = -maxIndex

      {
        const [chunkIndex] = (
          await tickmap.contractInstance.methods.tickToPosition({ args: { tick: maxIndex, tickSpacing } })
        ).returns

        await InitializeChunk.execute(sender, {
          initialFields: {
            tickmap: tickmap.contractInstance.contractId,
            caller: sender.address,
            poolKey,
            chunk: chunkIndex
          },
          attoAlphAmount: ONE_ALPH
        })

        await Flip.execute(sender, {
          initialFields: {
            tickmap: tickmap.contractInstance.contractId,
            value: true,
            tick: maxIndex,
            tickSpacing,
            poolKey
          },
          attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
        })
      }
      {
        const [chunkIndex] = (
          await tickmap.contractInstance.methods.tickToPosition({ args: { tick: minIndex, tickSpacing } })
        ).returns

        await InitializeChunk.execute(sender, {
          initialFields: {
            tickmap: tickmap.contractInstance.contractId,
            caller: sender.address,
            poolKey,
            chunk: chunkIndex
          },
          attoAlphAmount: ONE_ALPH
        })

        await Flip.execute(sender, {
          initialFields: {
            tickmap: tickmap.contractInstance.contractId,
            value: true,
            tick: minIndex,
            tickSpacing,
            poolKey
          },
          attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
        })
      }
      const tickEdgeDiff = (TICK_SEARCH_RANGE / tickSpacing) * tickSpacing
      {
        const [isSome] = (
          await tickmap.contractInstance.methods.nextInitialized({
            args: { tick: maxIndex - tickEdgeDiff, tickSpacing, poolKey }
          })
        ).returns
        expect(isSome).toBe(true)
      }
      {
        const [isSome] = (
          await tickmap.contractInstance.methods.prevInitialized({
            args: { tick: minIndex + tickEdgeDiff, tickSpacing, poolKey }
          })
        ).returns
        expect(isSome).toBe(true)
      }
    }
    for (let tickSpacing = 1n; tickSpacing <= 10n; tickSpacing++) {
      const tickmap = await deployTickmap(sender)
      await SetAdmins.execute(sender, {
        initialFields: {
          tickmap: tickmap.contractInstance.contractId,
          admin: sender.address
        },
        attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n
      })

      const maxIndex = MaxTick - (MaxTick % tickSpacing)
      const minIndex = -maxIndex

      const tickEdgeDiff = (TICK_SEARCH_RANGE / tickSpacing) * tickSpacing
      {
        const [isSome] = (
          await tickmap.contractInstance.methods.nextInitialized({
            args: { tick: maxIndex - tickEdgeDiff, tickSpacing, poolKey }
          })
        ).returns
        expect(isSome).toBe(false)
      }
      {
        const [isSome] = (
          await tickmap.contractInstance.methods.prevInitialized({
            args: { tick: minIndex + tickEdgeDiff, tickSpacing, poolKey }
          })
        ).returns
        expect(isSome).toBe(false)
      }
    }
  }, 175000)
})
