import { Blockchain, Order, OrderId } from "@rarible/api-client"
import { BigNumber } from "@rarible/types/build/big-number"
import { EthOrderPayout } from "@rarible/api-client/build/models/EthOrderPayout"
import { ActionBuilder } from "@rarible/action"
import { IBlockchainTransaction } from "@rarible/sdk-transaction/src/domain"

export type PrepareFillRequest = {
	/**
	 * Order identifier to fill
	 */
	orderId: OrderId
} | {
	/**
	 * Order to fill
	 */
	order: Order
}

export enum OriginFeeSupport {
	NONE = "NONE",
	AMOUNT_ONLY = "AMOUNT_ONLY",
	FULL = "FULL",
}

export enum PayoutsSupport {
	NONE = "NONE",
	SINGLE = "SINGLE",
	MULTIPLE = "MULTIPLE",
}

export type PrepareFillResponse = {
	/**
	 * Maximum amount to fill (of NFTs)
	 */
	maxAmount: BigNumber
	/**
	 * Base fee of the underlying exchange contract (this can not be changed)
	 */
	baseFee: number
	/**
	 * Whether the underlying exchange contract supports origin fees
	 */
	originFeeSupport: OriginFeeSupport
	/**
	 * Whether the underlying exchange contract supports specifying payouts
	 */
	payoutsSupport: PayoutsSupport
}

export type FillRequest = PrepareFillRequest & {
	/**
	 * Number of NFTs to buy or to sell (in case of accepting bids)
	 */
	amount: number
	/**
	 * Origin fees, if not supported by the underlying contract, will throw Error
	 */
	originFees?: EthOrderPayout[]
	/**
	 * Payouts, if not supported by the underlying contract, will throw Error
	 */
	payouts?: EthOrderPayout[]
	/**
	 * Use infinite approvals (for ERC-20)
	 */
	infiniteApproval?: boolean
}

export type IFillSdk = {
	prepare(request: PrepareFillRequest): Promise<PrepareFillResponse>
	submit: ActionBuilder<Blockchain, "send-transaction", FillRequest, IBlockchainTransaction>
}