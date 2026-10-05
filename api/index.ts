import { createRequestListener } from 'remix/node-fetch-server'

import { router } from '../app/router.ts'

export default createRequestListener(router.fetch, { trustProxy: true })
