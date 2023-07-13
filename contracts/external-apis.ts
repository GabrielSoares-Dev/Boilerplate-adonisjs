declare module '@ioc:ExternalApis/Ntfy' {
  import type { NtfyServicesInterface } from 'App/Interfaces/Services/NtfyServicesInterface'
  const Ntfy: NtfyServicesInterface
  export default Ntfy
}
declare module '@ioc:ExternalApis/ViaCep' {
  import type { ViaCepServicesInterface } from 'App/Interfaces/Services/ViaCepServicesInterface'
  const ViaCep: ViaCepServicesInterface
  export default ViaCep
}
