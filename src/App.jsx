import { useEffect, useState } from "react";
import "./App.css";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { supportedChains } from "./config/wagmi.config";

const WalletConnect = () => {
  const { address, connector, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [isWalletSelectionOpen, setWalletSelectionOpen] = useState(false);
  const [activeConnector, setActiveConnector] = useState(null);

  useEffect(() => {
    if (!connectors || !address) return;
    setActiveConnector(connector);
    setWalletSelectionOpen(false);
  }, [connector]);

  const handleConnectWallet = () => setWalletSelectionOpen(true);
  const handleSelectConnector = (selectedConnector) => connect({ connector: selectedConnector });
  const handleDisconnectWallet = () => {
    if (activeConnector) {
      disconnect();
      setActiveConnector(null);
      setWalletSelectionOpen(false);
    }
  };
  const handleSwitchNetwork = async (chainId) => switchChain({ chainId: Number(chainId) });

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {!activeConnector ? (
        <div className="p-6">
          {!isWalletSelectionOpen ? (
            <button
              onClick={handleConnectWallet}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Wallet</h2>
              <div className="space-y-2">
                {connectors.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleSelectConnector(wallet)}
                    className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <span className="font-medium text-gray-800">{wallet.name}</span>
                    <span className="text-indigo-500">→</span>
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setWalletSelectionOpen(false)}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Wallet Connected</h2>
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {isConnected && "Connected"}
            </div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-indigo-700 font-medium">Address</span>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {chain?.name || "Unknown Network"}
              </span>
            </div>
            <div className="font-mono text-gray-800 bg-white p-2 rounded border border-indigo-100 text-sm truncate">
              {address}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
              <select
                value={chain?.id}
                onChange={(e) => handleSwitchNetwork(e.target.value)}
                className="block w-full p-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md appearance-none"
              >
                {supportedChains.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleDisconnectWallet}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
