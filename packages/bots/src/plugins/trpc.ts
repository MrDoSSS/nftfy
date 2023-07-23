import fp from 'fastify-plugin'
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify'
import { createContext } from '../context'
import { router } from '../routes'

export default fp<FastifyTRPCPluginOptions<typeof router>>(async (fastify) => {
  fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router, createContext },
  })
})
