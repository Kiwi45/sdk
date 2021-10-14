import { Action } from "@rarible/action"
import {
	isErc1155v1Collection,
	isErc1155v2Collection,
	isErc721v1Collection,
	isErc721v2Collection,
	isErc721v3Collection,
	RaribleSdk,
} from "@rarible/protocol-ethereum-sdk"
import { MintResponseTypeEnum } from "@rarible/protocol-ethereum-sdk/build/nft/mint"
import { toAddress, toItemId } from "@rarible/types"
import { NftCollection } from "@rarible/protocol-api-client"
import { toBn } from "@rarible/utils/build/bn"
import { BlockchainEthereumTransaction } from "@rarible/sdk-transaction/src"
import { prepareMintRequest } from "@rarible/protocol-ethereum-sdk/build/nft/prepare-mint-request"
import {
	MintType,
	PrepareMintResponse,
} from "../../nft/mint/domain"
import { MintRequest } from "../../nft/mint/mint-request.type"
import { PrepareMintRequest } from "../../nft/mint/prepare-mint-request.type"
import { validatePrepareMintRequest } from "../../nft/mint/prepare-mint-request.type.validator"
import { validateMintRequest } from "../../nft/mint/mint-request.type.validator"

export class Mint {
	constructor(private sdk: RaribleSdk) {
		this.prepare = this.prepare.bind(this)
	}

	handleSubmit(request: MintRequest, nftCollection: NftCollection) {

		if (isErc721v1Collection(nftCollection)) {
			return this.sdk.nft.mint({
				collection: nftCollection,
				uri: request.uri,
			})
		}
		if (isErc721v2Collection(nftCollection) && request.royalties) {
			return this.sdk.nft.mint({
				collection: nftCollection,
				uri: request.uri,
				royalties: request.royalties.map(r => ({
					account: toAddress(r.account),
					value: toBn(r.value).toNumber(),
				})),
			})
		}
		if (isErc721v3Collection(nftCollection) && request.royalties && request.creators) {
			return this.sdk.nft.mint({
				collection: nftCollection,
				uri: request.uri,
				lazy: request.lazyMint,
				royalties: request.royalties.map(r => ({
					account: toAddress(r.account),
					value: toBn(r.value).toNumber(),
				})),
				creators: request.creators.map(c => ({
					account: toAddress(c.account),
					value: toBn(c.value).toNumber(),
				})),
			})
		}

		if (isErc1155v1Collection(nftCollection) && request.royalties) {
			return this.sdk.nft.mint({
				collection: nftCollection,
				uri: request.uri,
				supply: request.supply,
				royalties: request.royalties.map(r => ({
					account: toAddress(r.account),
					value: toBn(r.value).toNumber(),
				})),
			})
		}

		if (isErc1155v2Collection(nftCollection) && request.royalties && request.creators) {
			return this.sdk.nft.mint({
				collection: nftCollection,
				uri: request.uri,
				supply: request.supply,
				lazy: request.lazyMint,
				royalties: request.royalties.map(r => ({
					account: toAddress(r.account),
					value: toBn(r.value).toNumber(),
				})),
				creators: request.creators.map(c => ({
					account: toAddress(c.account),
					value: toBn(c.value).toNumber(),
				})),
			})
		}
		throw new Error("Unsupported NFT Collection")

	}

	async prepare(prepareRequest: PrepareMintRequest): Promise<PrepareMintResponse> {
		const { collection } = prepareRequest
		if (collection.type === "CRYPTO_PUNKS" || collection.type === "FLOW") {
			throw new Error("Unsupported collection type")
		}

		validatePrepareMintRequest(prepareRequest)

		const nftCollection: NftCollection = {
			...prepareRequest.collection,
			id: toAddress(prepareRequest.collection.id),
			type: collection.type,
			owner: collection.owner && toAddress(collection.owner),
			name: collection.name,
			symbol: collection.symbol,
			features: collection.features,
		}
		const prepareMintRequestData = prepareMintRequest(nftCollection)

		return {
			...prepareMintRequestData,
			submit: Action.create({
				id: "mint" as const,
				run: async (request: MintRequest) => {

					validateMintRequest(request)
					const mintResponse = await this.handleSubmit(request, nftCollection)

					switch (mintResponse.type) {
						case MintResponseTypeEnum.ON_CHAIN:
							return {
								type: MintType.ON_CHAIN,
								itemId: toItemId(mintResponse.itemId),
								transaction: new BlockchainEthereumTransaction(mintResponse.transaction),
							}
						case MintResponseTypeEnum.OFF_CHAIN:
							return {
								type: MintType.OFF_CHAIN,
								itemId: toItemId(mintResponse.itemId),
							}
						default:
							throw new Error("Unrecognized mint response type")
					}
				},
			}),
		}

	}
}