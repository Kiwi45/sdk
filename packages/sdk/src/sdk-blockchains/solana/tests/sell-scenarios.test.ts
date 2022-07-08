import { SolanaWallet } from "@rarible/sdk-wallet"
import { toBigNumber, toUnionAddress } from "@rarible/types"
import { createRaribleSdk } from "../../../index"
import { LogsLevel } from "../../../domain"
import { getWallet } from "../common/test/test-wallets"
import { retry } from "../../../common/retry"
import { mintToken } from "../common/test/mint"

describe("Solana sell scenarios", () => {
	const wallet = getWallet(0)
	const wallet2 = getWallet(1)
	const sdk = createRaribleSdk(new SolanaWallet(wallet), "development", { logs: LogsLevel.DISABLED })
	const sdkSecond = createRaribleSdk(new SolanaWallet(wallet2), "development", { logs: LogsLevel.DISABLED })

	test("Should set item to sell then transfer then buy", async () => {
		const item = await mintToken(sdk)
		const itemId = item.id

		// wallet1 sell
		await retry(10, 4000, async () => {
			const sell = await sdk.order.sell({ itemId })
			return sell.submit({
				amount: 1,
				currency: { "@type": "SOLANA_SOL" },
				price: toBigNumber("0.001"),
			})
		})

		// wallet1 transfer
		const transferTx = await retry(10, 4000, async () => {
			const sell = await sdk.nft.transfer({ itemId })
			return sell.submit({
				amount: 1,
				to: toUnionAddress("SOLANA:"+wallet2.publicKey),
			})
		})
		await transferTx.wait()

		// wallet2 sell
		const orderId = await retry(10, 4000, async () => {
			const sell = await sdkSecond.order.sell({ itemId })
			return sell.submit({
				amount: 1,
				currency: { "@type": "SOLANA_SOL" },
				price: toBigNumber("0.002"),
			})
		})

		// wallet1 buy
		const tx = await retry(10, 4000, async () => {
			const buy = await sdk.order.buy({
				orderId,
			})

			return buy.submit({
				amount: 1,
				itemId,
			})
		})

		expect(tx.hash()).toBeTruthy()
		await tx.wait()
	})
})