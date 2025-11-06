import { buildApp } from './app.js'
import { environment } from './config/environment.js'

const app = buildApp()

app.listen(environment.port, () => {
  console.log(`🚀 ${environment.serviceName} listening on port ${environment.port} in ${environment.env} mode`)
})
