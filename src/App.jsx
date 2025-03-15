import { useEffect, useState } from "react";
import "./App.css";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { supportedChains } from "./config/wagmiConfig";
import AnimatedCounter from "./Counter";

const Wagmi = () => {
  const { address, connector, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [isWalletSelectionOpen, setWalletSelectionOpen] = useState(false);
  const [activeConnector, setActiveConnector] = useState(null);
  const [animateIntro, setAnimateIntro] = useState(true);
  const [walletIcons, setWalletIcons] = useState({});
  const [showCounters, setShowCounters] = useState(false);

  useEffect(() => {
    // Extract icons from connectors
    const icons = {};
    connectors.forEach(connector => {
      if (connector.icon) {
        icons[connector.id] = connector.icon;
      }
    });
    setWalletIcons(icons);
  }, [connectors]);

  useEffect(() => {
    if (connectors.length === 0 || !address) return;
    setActiveConnector(connector);
    setWalletSelectionOpen(false);
  }, [connector, connectors, address]);

  useEffect(() => {
    // Turn off intro animation after 3 seconds
    const timer = setTimeout(() => {
      setAnimateIntro(false);
      // Start counter animations after intro animation
      setShowCounters(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleConnectWallet = () => setWalletSelectionOpen(true);
  
  const handleSelectConnector = (selectedConnector) => {
    connect({ connector: selectedConnector });
  };

  const handleDisconnectWallet = () => {
    if (activeConnector) {
      disconnect();
      setActiveConnector(null);
      setWalletSelectionOpen(false);
    }
  };

  const handleSwitchNetwork = async (chainId) => switchChain({ chainId: Number(chainId) });

  // Function to render wallet icon
  const renderWalletIcon = (wallet) => {
    if (walletIcons[wallet.id]) {
      return (
        <img 
          src={walletIcons[wallet.id]} 
          alt={`${wallet.name} icon`} 
          className="w-6 h-6 mr-3"
        />
      );
    } else {
      return (
        <div className="w-6 h-6 mr-3 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
          {wallet.name.charAt(0)}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className={`max-w-lg w-full bg-gray-800 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-xl relative ${animateIntro ? 'animate-pulse' : ''}`}>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>
        
        {!activeConnector ? (
          <div className="p-8">
            {!isWalletSelectionOpen ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    <span className="text-cyan-400">EMPOWERING</span> THE NEXT <br/> 
                    GENERATION OF <span className="text-cyan-400">WEB3</span> <br/>
                    INFRASTRUCTURE
                  </h1>
                  <p className="text-gray-400">
                    Dedicated partners committed to helping Web3 startups grow and reach their full potential.
                  </p>
                </div>
                
                <button
                  onClick={handleConnectWallet}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 group relative overflow-hidden"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Connect Wallet</span>
                </button>
                
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="col-span-1 p-4 rounded-lg bg-gray-700/50 text-center">
                    <div className="text-cyan-400 text-xl font-bold">
                      {showCounters ? (
                        <AnimatedCounter end={2.5} decimals={1} suffix="K+" />
                      ) : "0"}
                    </div>
                    <div className="text-gray-400 text-xs">Active Users</div>
                  </div>
                  <div className="col-span-1 p-4 rounded-lg bg-gray-700/50 text-center">
                    <div className="text-cyan-400 text-xl font-bold">
                      {showCounters ? (
                        <AnimatedCounter end={5.6} decimals={1} />
                      ) : "0"}
                    </div>
                    <div className="text-gray-400 text-xs">Million Assets</div>
                  </div>
                  <div className="col-span-1 p-4 rounded-lg bg-gray-700/50 text-center">
                    <div className="text-cyan-400 text-xl font-bold">
                      {showCounters ? (
                        <AnimatedCounter end={12} />
                      ) : "0"}
                    </div>
                    <div className="text-gray-400 text-xs">Networks</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Select Wallet</h2>
                
                <div className="space-y-3">
                  {connectors.map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => handleSelectConnector(wallet)}
                      className="flex items-center w-full p-4 border border-gray-700 rounded-lg bg-gray-700/30 hover:border-cyan-500 hover:bg-gray-700/60 transition-all duration-200"
                    >
                      {/* Wallet logo */}
                      {renderWalletIcon(wallet)}
                      
                      {/* Wallet name */}
                      <span className="font-medium text-white flex-grow text-left">{wallet.name}</span>
                      
                      {/* Arrow indicator */}
                      <span className="text-cyan-400">→</span>
                    </button>
                  ))}
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => setWalletSelectionOpen(false)}
                    className="w-full py-3 px-4 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Wallet Connected</h2>
              <div className="bg-green-900/50 text-green-400 text-xs font-medium px-3 py-1 rounded-full border border-green-500/30">
                {isConnected && "Connected"}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-gray-700/30 p-4 rounded-lg border border-cyan-500/30">
              {activeConnector && walletIcons[activeConnector.id] ? (
                <img 
                  src={walletIcons[activeConnector.id]} 
                  alt={`${activeConnector.name} icon`} 
                  className="w-8 h-8"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                  {activeConnector?.name?.charAt(0) || 'W'}
                </div>
              )}
              <div className="font-medium text-white">
                {activeConnector?.name || "Wallet"}
              </div>
            </div>
            
            <div className="bg-gray-700/30 p-5 rounded-lg border border-cyan-500/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-cyan-400 font-medium">Address</span>
                <span className="bg-cyan-900/30 text-cyan-400 text-xs font-medium px-3 py-1 rounded-full border border-cyan-500/30">
                  {chain?.name || "Unknown Network"}
                </span>
              </div>
              <div className="font-mono text-gray-300 bg-gray-800/70 p-3 rounded border border-gray-700 text-sm truncate">
                {address}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
                <select
                  value={chain?.id}
                  onChange={(e) => handleSwitchNetwork(e.target.value)}
                  className="block w-full p-3 text-base border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 rounded-lg appearance-none"
                >
                  {supportedChains.map((network) => (
                    <option key={network.id} value={network.id}>
                      {network.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <a 
                  href="https://www.binance.com/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="col-span-1 p-4 rounded-lg bg-gray-700/30 text-center border border-gray-700 hover:border-cyan-500 transition-all duration-200"
                >
                  <div className="text-cyan-400 font-medium">Asset Management</div>
                  <div className="text-gray-400 text-xs">Active • Passive</div>
                </a>
                <a 
                  href="https://coinmarketcap.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="col-span-1 p-4 rounded-lg bg-gray-700/30 text-center border border-gray-700 hover:border-cyan-500 transition-all duration-200"
                >
                  <div className="text-cyan-400 font-medium">Global Markets</div>
                  <div className="text-gray-400 text-xs">Trading • Derivatives</div>
                </a>
              </div>
              
              <button
                onClick={handleDisconnectWallet}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 mt-2"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wagmi;