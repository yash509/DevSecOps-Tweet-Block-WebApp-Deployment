import React, { useEffect, useState } from "react";
import Web3 from "web3";
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';

// ABI should be fetched from ABI.json
import contractABI from './ABI.json';

// Replace with your deployed contract address
const contractAddress = "0x8f0720e322F64145834a6bc3d95332f78C25D4dE";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        setWeb3(web3);
        setContract(contract);
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask to use this dApp!");
      }
    };
    loadBlockchainData();
  }, []);

  const fetchTweets = async () => {
    if (contract && account) {
      try {
        const tweetsData = await contract.methods.getAllTweets(account).call();
        const formattedTweets = tweetsData.map(tweet => ({
          ...tweet,
          id: parseInt(tweet.id, 10), // Convert to Number
          timestamp: parseInt(tweet.timestamp, 10), // Convert to Number
          likes: parseInt(tweet.likes, 10), // Convert to Number
        }));
        setTweets(formattedTweets);
      } catch (err) {
        console.error("Error fetching tweets:", err);
      }
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [contract, account]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Twitter DApp</h1>
        {account && <p className="text-center text-gray-600 mb-4">Connected as: {account}</p>}
        <TweetForm web3={web3} account={account} contract={contract} />
        <TweetList tweets={tweets} account={account} />
      </div>
    </div>
  );
};

export default App;
