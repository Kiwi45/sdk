import { TezosWallet } from "@rarible/sdk-wallet"
import { IRaribleSdk } from "../../domain"
import { Sell } from "./sell"
import { Fill } from "./fill"

export async function createTezosSdk(wallet: TezosWallet): Promise<IRaribleSdk> {
	return {
		nft: {
			mint: null as any,
		},
		order: {
			fill: new Fill(wallet.provider).fill,
			sell: new Sell(wallet.provider).sell,
		},
	}
}