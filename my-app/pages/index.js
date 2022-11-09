import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import web3Modal from "web3modal";
import {ethers} from "ethers";
import {WHITELIST_CONTRACT_ADDRESS,abi} from "../Constants"
export default function Home(){

  //Wallet Connected or Not Connected
  const[walletConnected,setWalletConnected]=useState(false);
    //WhiteList Joined or Not Joined
    const[whitelistJoined,setWhitelistJoined]=useState(false);
// joinedWhitelist keeps track of whether the current metamask address has joined the Whitelist or not
const [joinedWhitelist, setJoinedWhitelist] = useState(false);
 // numberOfWhitelisted tracks the number of addresses's whitelisted
 const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
    const web3modalRef=useRef();


  const addWhiteListAddress=async()=>{
    try{
    const signer=await getProviderOrSigner(true);
    const contract=new ethers.Contract(WHITELIST_CONTRACT_ADDRESS,abi,signer);
    const tx=await contract.register();
    setLoading(true);
    await tx.wait();
    setLoading(false);
    await getNumberOfWhilisted();
    setJoinedWhitelist(true);
    console.log(numberOfWhitelisted);
  }catch(err){
    console.error(err);
  }
  }




  const getNumberOfWhilisted=async ()=>{
    try{
    const provider= await getProviderOrSigner();
    const contract=new ethers.Contract(WHITELIST_CONTRACT_ADDRESS,abi,provider);
    const numberOfWhitelist=await contract.count();
    setNumberOfWhitelisted(numberOfWhitelist);
    console.log(numberOfWhitelisted);
    }catch(err){
      console.error(err);
    }
  }



    const getProviderOrSigner=async(needSigner=false)=>{
      console.log("Connect Wallet Called");
        let web3ModalInstance = await new web3modalRef.current.connect(); //connecting Wallet
        const web3Provider=new ethers.providers.Web3Provider(web3ModalInstance); // allows us to interact with the wallet 
        console.log(web3Provider);

        if(needSigner){
          const signer=web3Provider.getSigner();
          return signer;
        }
        return web3Provider;
    };

    const checkAddressInWhitelist=async ()=>{
      try{
      const signer=await getProviderOrSigner(true);
      const whiteListContract=new ethers.Contract(WHITELIST_CONTRACT_ADDRESS,abi,signer);

      const address=signer.getAddress();
      const joinedWhiteList=await whiteListContract.list(address);
      setJoinedWhitelist(joinedWhiteList);
      console.log(joinedWhiteList);
      }catch(err){
        console.error(err);
      }
    }

    async function connectWallet() {
      try{
        await getProviderOrSigner();
        setWalletConnected(true);
       await checkAddressInWhitelist();
        getNumberOfWhilisted();

      }catch(error){
        console.error(error);
      }
    }
    useEffect(()=>{
      //check if the wallet is connected or not
      // if not connected. then create a new instance of web3modal and connect the wallet
      if(!walletConnected)
      {
        web3modalRef.current=new web3Modal({
          network:"goerli",
          providerOptions:{},
          disableInjectedProvider: false,
        });
        console.log(web3modalRef.current);
        connectWallet();
      }
    },[walletConnected]);
    return(
      <>  
      <div>
        <button onClick={()=>console.log(numberOfWhitelisted)}> num</button>
        <button onClick={addWhiteListAddress}>ADD ME</button>
         <button onClick={connectWallet}>Connect</button>
      </div>
     
      </>
    );

}