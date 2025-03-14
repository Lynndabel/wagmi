import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, lisk, liskSepolia, base, polygon, meterTestnet, wmcTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

export const supportedChains = [mainnet, sepolia, lisk, liskSepolia, base, polygon, meterTestnet, wmcTestnet]

export const config = createConfig({
  chains: supportedChains, // Use the exported chains array
  connectors: [walletConnect({
    projectId: import.meta.env.VITE_PROVIDER
  })],
  multiInjectedProviderDiscovery: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
