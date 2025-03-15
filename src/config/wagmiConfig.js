// import { http, createConfig } from 'wagmi'
// import { mainnet, sepolia, lisk, liskSepolia, base, polygon, meterTestnet, wmcTestnet } from 'wagmi/chains'
// import { walletConnect } from 'wagmi/connectors'
// const projectId = "3fbb6bba6f1de962d911bb5b5c9dba88"
// export const supportedChains = [mainnet, sepolia, lisk, liskSepolia, base, polygon, meterTestnet, wmcTestnet]

// export const config = createConfig({
//   chains: supportedChains, // Use the exported chains array
//   connectors: [walletConnect({
//     projectId,
//   })],
//  // multiInjectedProviderDiscovery: true,
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// })


import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, lisk, liskSepolia, base, polygon, meterTestnet, wmcTestnet } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'

const projectId = "3fbb6bba6f1de962d911bb5b5c9dba88"

export const supportedChains = [mainnet, sepolia, lisk, liskSepolia, base, polygon, meterTestnet, wmcTestnet]

export const config = createConfig({
  chains: supportedChains,
  connectors: [
    walletConnect({
      projectId: projectId,
      metadata: {
        name: 'Your Web3 App',
        description: 'Your Web3 Application',
        url: 'https://yourwebsite.com',
        icons: ['https://yourwebsite.com/icon.png']
      },
      showQrModal: true // Show the QR code modal
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [lisk.id]: http(),
    [liskSepolia.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [meterTestnet.id]: http(),
    [wmcTestnet.id]: http()
  },
})
