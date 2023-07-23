import { t } from '../trpc'
import { z } from 'zod'

export default t.router({
  get: t.procedure.input(z.string()).query((opts) => {}),
  list: t.procedure.query((opts) => {}),
  create: t.procedure.mutation((opts) => {}),
})
