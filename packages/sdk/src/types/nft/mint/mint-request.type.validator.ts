// @ts-nocheck
// eslint-disable
// This file is generated by create-validator-ts
import Ajv from 'ajv';
import * as apiTypes from './mint-request.type';

export const SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/MintRequest",
    "definitions": {
        "MintRequest": {
            "type": "object",
            "properties": {
                "uri": {
                    "type": "string"
                },
                "supply": {
                    "type": "number"
                },
                "lazyMint": {
                    "type": "boolean"
                },
                "creators": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Creator"
                    }
                },
                "royalties": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Royalty"
                    }
                }
            },
            "required": [
                "uri",
                "supply",
                "lazyMint"
            ],
            "additionalProperties": false
        },
        "Creator": {
            "type": "object",
            "properties": {
                "account": {
                    "$ref": "#/definitions/UnionAddress"
                },
                "value": {
                    "type": "number"
                }
            },
            "required": [
                "account",
                "value"
            ],
            "additionalProperties": false
        },
        "UnionAddress": {
            "type": "string"
        },
        "Royalty": {
            "type": "object",
            "properties": {
                "account": {
                    "$ref": "#/definitions/UnionAddress"
                },
                "value": {
                    "type": "number"
                }
            },
            "required": [
                "account",
                "value"
            ],
            "additionalProperties": false
        }
    }
};
const ajv = new Ajv({ removeAdditional: true }).addSchema(SCHEMA, "SCHEMA");
export function validateMintRequest(payload: unknown): apiTypes.MintRequest {
  if (!isMintRequest(payload)) {
    const error = new Error('invalid payload: MintRequest');
    error.name = "ValidationError";
    throw error;
  }
  return payload;
}

export function isMintRequest(payload: unknown): payload is apiTypes.MintRequest {
  /** Schema is defined in {@link SCHEMA.definitions.MintRequest } **/
  const ajvValidate = ajv.compile({ "$ref": "SCHEMA#/definitions/MintRequest" });
  return ajvValidate(payload);
}
