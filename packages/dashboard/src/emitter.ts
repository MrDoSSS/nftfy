import mitt from '@nftfy/common/mitt'
import { BaseError } from 'viem'

type Events = {
  'FailedTransaction:Open': BaseError | Error
}

export const emitter = mitt<Events>()
