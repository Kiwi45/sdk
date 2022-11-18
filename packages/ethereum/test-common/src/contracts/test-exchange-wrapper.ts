import type Web3 from "web3"
import type { Address } from "@rarible/ethereum-api-client"
import type { Contract } from "web3-eth-contract"
import type { AbiItem } from "../common/abi-item"

export function createTestExchangeWrapperContract(web3: Web3, address?: Address): Contract {
	return new web3.eth.Contract(EXCHANGEV2_BULK_ABI, address)
}

export async function deployTestExchangeWrapper(web3: Web3) {
	const empty = createTestExchangeWrapperContract(web3)
	const [address] = await web3.eth.getAccounts()
	return empty.deploy({ data: exchangeBulkV2Bytecode }).send({ from: address, gas: 5000000, gasPrice: "0" })
}

export const exchangeBulkV2Bytecode =
	"0x608060405234801561001057600080fd5b5061167d806100206000396000f3fe6080604052600436106100955760003560e01c80638da5cb5b116100595780638da5cb5b1461011e578063a05f32dc14610149578063c9f0a2fa1461015e578063f2fde38b14610173578063ffe66dce146101935761009c565b806355b0126d146100a157806367b1f5df146100b6578063715018a6146100d65780637ad2607e146100eb57806383758e98146100fe5761009c565b3661009c57005b600080fd5b6100b46100af366004610fd6565b6101b3565b005b3480156100c257600080fd5b506100b46100d1366004610fba565b6101fa565b3480156100e257600080fd5b506100b461027e565b6100b46100f93660046111f5565b61032a565b34801561010a57600080fd5b506100b4610119366004610fba565b61033d565b34801561012a57600080fd5b506101336103c1565b60405161014091906113ef565b60405180910390f35b34801561015557600080fd5b506101336103d0565b34801561016a57600080fd5b506101336103df565b34801561017f57600080fd5b506100b461018e366004610fba565b6103ee565b34801561019f57600080fd5b506100b46101ae366004611086565b6104f1565b60005b82518110156101e3576101db8382815181106101ce57fe5b60200260200101516105d5565b6001016101b6565b506101ee34826106e9565b6101f6610763565b5050565b610202610788565b6001600160a01b03166102136103c1565b6001600160a01b03161461025c576040805162461bcd60e51b81526020600482018190526024820152600080516020611628833981519152604482015290519081900360640190fd5b606680546001600160a01b0319166001600160a01b0392909216919091179055565b610286610788565b6001600160a01b03166102976103c1565b6001600160a01b0316146102e0576040805162461bcd60e51b81526020600482018190526024820152600080516020611628833981519152604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b610333826105d5565b6101ee34826106e9565b610345610788565b6001600160a01b03166103566103c1565b6001600160a01b03161461039f576040805162461bcd60e51b81526020600482018190526024820152600080516020611628833981519152604482015290519081900360640190fd5b606580546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031690565b6066546001600160a01b031681565b6065546001600160a01b031681565b6103f6610788565b6001600160a01b03166104076103c1565b6001600160a01b031614610450576040805162461bcd60e51b81526020600482018190526024820152600080516020611628833981519152604482015290519081900360640190fd5b6001600160a01b0381166104955760405162461bcd60e51b81526004018080602001828103825260268152602001806115b36026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b600054610100900460ff168061050a575061050a61078c565b80610518575060005460ff16155b6105535760405162461bcd60e51b815260040180806020018281038252602e8152602001806115d9602e913960400191505060405180910390fd5b600054610100900460ff1615801561057e576000805460ff1961ff0019909116610100171660011790555b61058661079d565b61058e61083e565b606580546001600160a01b038086166001600160a01b031992831617909255606680549285169290911691909117905580156105d0576000805461ff00191690555b505050565b60208101516001825160018111156105e957fe5b14156106855760655460408084015190516000926001600160a01b031691849161061391906113d3565b60006040518083038185875af1925050503d8060008114610650576040519150601f19603f3d011682016040523d82523d6000602084013e610655565b606091505b505090508061067f5760405162461bcd60e51b81526004016106769061143a565b60405180910390fd5b506101f6565b60008251600181111561069457fe5b14156106d157600080600084604001518060200190518101906106b791906110be565b9250925092506106c983838684610937565b5050506101f6565b60405162461bcd60e51b815260040161067690611403565b60006106f58347610ab7565b905060005b825181101561075d57600061072f60a085848151811061071657fe5b6020026020010151901c84610b1990919063ffffffff16565b905080156107545761075484838151811061074657fe5b602002602001015182610b38565b506001016106fa565b50505050565b4780156107855761078581610776610788565b6001600160a01b031690610b38565b50565b3390565b600061079730610bd0565b15905090565b600054610100900460ff16806107b657506107b661078c565b806107c4575060005460ff16155b6107ff5760405162461bcd60e51b815260040180806020018281038252602e8152602001806115d9602e913960400191505060405180910390fd5b600054610100900460ff1615801561082a576000805460ff1961ff0019909116610100171660011790555b8015610785576000805461ff001916905550565b600054610100900460ff1680610857575061085761078c565b80610865575060005460ff16155b6108a05760405162461bcd60e51b815260040180806020018281038252602e8152602001806115d9602e913960400191505060405180910390fd5b600054610100900460ff161580156108cb576000805460ff1961ff0019909116610100171660011790555b60006108d5610788565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610785576000805461ff001916905550565b61093f610c9a565b3081526060858101516020808401919091528087015151918301805192909252905101829052604080516001808252818301909252600091816020015b610984610d05565b81526020019060019003908161097c5790505090506109a1610788565b816000815181106109ae57fe5b6020026020010151600001906001600160a01b031690816001600160a01b031681525050612710816000815181106109e257fe5b6020908102919091018101516bffffffffffffffffffffffff909216910152610a09610d1c565b818152604051610a1d908290602001611463565b60408051601f198184030181529181526101008501919091526323d235ef60e01b60e085015260665490516301d3347f60e71b81526060916001600160a01b03169063e99a3f80908890610a7b908c908c908a9088906004016114b5565b6000604051808303818588803b158015610a9457600080fd5b505af1158015610aa8573d6000803e3d6000fd5b50505050505050505050505050565b600082821115610b0e576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b508082035b92915050565b6000610b31612710610b2b8585610bda565b90610c33565b9392505050565b6040516000906001600160a01b0384169083908381818185875af1925050503d8060008114610b83576040519150601f19603f3d011682016040523d82523d6000602084013e610b88565b606091505b50509050806105d0576040805162461bcd60e51b815260206004820152600f60248201526e1d1c985b9cd9995c8819985a5b1959608a1b604482015290519081900360640190fd5b803b15155b919050565b600082610be957506000610b13565b82820282848281610bf657fe5b0414610b315760405162461bcd60e51b81526004018080602001828103825260218152602001806116076021913960400191505060405180910390fd5b6000808211610c89576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381610c9257fe5b049392505050565b60405180610120016040528060006001600160a01b03168152602001610cbe610d3f565b815260006020820152604001610cd2610d3f565b815260200160008152602001600081526020016000815260200160006001600160e01b0319168152602001606081525090565b604080518082019091526000808252602082015290565b604051806060016040528060608152602001606081526020016000151581525090565b6040518060400160405280610d52610d5f565b8152602001600081525090565b60408051808201909152600081526060602082015290565b8051610bd58161159d565b600082601f830112610d92578081fd5b81356020610da7610da283611531565b61150d565b8281528181019085830183850287018401881015610dc3578586fd5b855b85811015610de157813584529284019290840190600101610dc5565b5090979650505050505050565b80516001600160e01b031981168114610bd557600080fd5b600082601f830112610e16578081fd5b8151610e24610da28261154f565b818152846020838601011115610e38578283fd5b610e49826020830160208701611571565b949350505050565b60006040808385031215610e63578182fd5b805181810167ffffffffffffffff8282108183111715610e7f57fe5b818452829450855181811115610e9457600080fd5b8601808803851315610ea557600080fd5b608084018381108382111715610eb757fe5b8552610ec281610dee565b83526020810151945081851115610ed857600080fd5b610ee488868301610e06565b60608501525050815260209384015193019290925292915050565b600060608284031215610f10578081fd5b6040516060810167ffffffffffffffff8282108183111715610f2e57fe5b816040528293508435915060028210610f4657600080fd5b9082526020848101358184015290604085013581811115610f6657600080fd5b85019050601f81018613610f7957600080fd5b8035610f87610da28261154f565b8181528784838501011115610f9b57600080fd5b8184840185830137600091810190930152506040919091015292915050565b600060208284031215610fcb578081fd5b8135610b318161159d565b60008060408385031215610fe8578081fd5b823567ffffffffffffffff80821115610fff578283fd5b818501915085601f830112611012578283fd5b81356020611022610da283611531565b82815281810190858301875b85811015611057576110458c8684358b0101610eff565b8452928401929084019060010161102e565b5090975050508601359250508082111561106f578283fd5b5061107c85828601610d82565b9150509250929050565b60008060408385031215611098578182fd5b82356110a38161159d565b915060208301356110b38161159d565b809150509250929050565b6000806000606084860312156110d2578081fd5b835167ffffffffffffffff808211156110e9578283fd5b81860191506101208083890312156110ff578384fd5b6111088161150d565b905061111383610d77565b8152602083015182811115611126578485fd5b61113289828601610e51565b60208301525061114460408401610d77565b604082015260608301518281111561115a578485fd5b61116689828601610e51565b6060830152506080830151608082015260a083015160a082015260c083015160c082015261119660e08401610dee565b60e082015261010080840151838111156111ae578586fd5b6111ba8a828701610e06565b8284015250508095505060208601519150808211156111d7578283fd5b506111e486828701610e06565b925050604084015190509250925092565b60008060408385031215611207578182fd5b823567ffffffffffffffff8082111561121e578384fd5b61122a86838701610eff565b9350602085013591508082111561106f578283fd5b6001600160a01b03169052565b6000815180845260208085019450808401835b8381101561129d57815180516001600160a01b031688528301516bffffffffffffffffffffffff16838801526040909601959082019060010161125f565b509495945050505050565b6001600160e01b0319169052565b600081518084526112ce816020860160208601611571565b601f01601f19169290920160200192915050565b600081516040845263ffffffff60e01b8151166040850152602081015190506040606085015261131560808501826112b6565b602093840151949093019390935250919050565b600061012061133984845161123f565b6020830151816020860152611350828601826112e2565b9150506040830151611365604086018261123f565b506060830151848203606086015261137d82826112e2565b9150506080830151608085015260a083015160a085015260c083015160c085015260e08301516113b060e08601826112a8565b5061010080840151858303828701526113c983826112b6565b9695505050505050565b600082516113e5818460208701611571565b9190910192915050565b6001600160a01b0391909116815260200190565b60208082526018908201527f556e6b6e6f776e2070757263686173652064657461696c730000000000000000604082015260600190565b6020808252600f908201526e141d5c98da185cd94819985a5b1959608a1b604082015260600190565b60006020825282516060602084015261147f608084018261124c565b90506020840151601f1984830301604085015261149c828261124c565b9150506040840151151560608401528091505092915050565b6000608082526114c86080830187611329565b82810360208401526114da81876112b6565b905082810360408401526114ee8186611329565b9050828103606084015261150281856112b6565b979650505050505050565b60405181810167ffffffffffffffff8111828210171561152957fe5b604052919050565b600067ffffffffffffffff82111561154557fe5b5060209081020190565b600067ffffffffffffffff82111561156357fe5b50601f01601f191660200190565b60005b8381101561158c578181015183820152602001611574565b8381111561075d5750506000910152565b6001600160a01b038116811461078557600080fdfe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a264697066735822122000e4e948dba81c3f240ccfaa790253ddada64bd45d19b445e907c710fbed260864736f6c63430007060033"

export const EXCHANGEV2_BULK_ABI: AbiItem[] = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address",
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address",
			},
		],
		"name": "OwnershipTransferred",
		"type": "event",
	},
	{
		"inputs": [],
		"name": "exchangeV2",
		"outputs": [
			{
				"internalType": "contract IExchangeV2",
				"name": "",
				"type": "address",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address",
			},
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "wyvernExchange",
		"outputs": [
			{
				"internalType": "contract IWyvernExchange",
				"name": "",
				"type": "address",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "contract IWyvernExchange",
				"name": "_wyvernExchange",
				"type": "address",
			},
			{
				"internalType": "contract IExchangeV2",
				"name": "_exchangeV2",
				"type": "address",
			},
		],
		"name": "__ExchangeWrapper_init",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "contract IWyvernExchange",
				"name": "_wyvernExchange",
				"type": "address",
			},
		],
		"name": "setWyvern",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "contract IExchangeV2",
				"name": "_exchangeV2",
				"type": "address",
			},
		],
		"name": "setExchange",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "enum ExchangeWrapper.Markets",
						"name": "marketId",
						"type": "uint8",
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256",
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes",
					},
				],
				"internalType": "struct ExchangeWrapper.PurchaseDetails",
				"name": "purchaseDetails",
				"type": "tuple",
			},
			{
				"internalType": "uint256[]",
				"name": "fees",
				"type": "uint256[]",
			},
		],
		"name": "singlePurchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "enum ExchangeWrapper.Markets",
						"name": "marketId",
						"type": "uint8",
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256",
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes",
					},
				],
				"internalType": "struct ExchangeWrapper.PurchaseDetails[]",
				"name": "purchaseDetails",
				"type": "tuple[]",
			},
			{
				"internalType": "uint256[]",
				"name": "fees",
				"type": "uint256[]",
			},
		],
		"name": "bulkPurchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
	},
]
