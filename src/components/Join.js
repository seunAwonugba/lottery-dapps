import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Button from "@mui/material/Button";
import { useNotification } from "@web3uikit/core";
export const Join = () => {
    const [entranceFee, setEntranceFee] = useState("0");
    const [numberOfPlayers, setNumberOfPlayers] = useState("0");
    const [winner, setWinner] = useState("0");
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const dispatch = useNotification();
    const chainId = parseInt(chainIdHex);
    const lotteryContractAddress =
        chainId in contractAddress ? contractAddress[chainId][0] : null;

    const {
        data,
        // error,
        runContractFunction: joinLottery,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi,
        contractAddress: lotteryContractAddress,
        functionName: "joinLottery",
        params: {},
        msgValue: entranceFee,
    });

    const {
        // data,
        // error,
        runContractFunction: getEntranceFee,
        // isFetching,
        // isLoading,
    } = useWeb3Contract({
        abi,
        contractAddress: lotteryContractAddress,
        functionName: "getEntranceFee",
        params: {},
        // msgValue: "",
    });

    const {
        // data,
        // error,
        runContractFunction: getNumberOfPlayers,
        // isFetching,
        // isLoading,
    } = useWeb3Contract({
        abi,
        contractAddress: lotteryContractAddress,
        functionName: "getNumberOfPlayers",
        params: {},
        // msgValue: "",
    });

    const {
        // data,
        // error,
        runContractFunction: getWinner,
        // isFetching,
        // isLoading,
    } = useWeb3Contract({
        abi,
        contractAddress: lotteryContractAddress,
        functionName: "getWinner",
        params: {},
        // msgValue: "",
    });

    const updateUi = async () => {
        setEntranceFee((await getEntranceFee()).toString());
        setNumberOfPlayers((await getNumberOfPlayers()).toString());
        setWinner((await getWinner()).toString());
    };
    useEffect(() => {
        try {
            if (isWeb3Enabled) {
                updateUi();
            }
        } catch (error) {}
    }, [isWeb3Enabled]);

    const handleNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction complete",
            title: "Transaction Notification",
            icon: "bell",
            // position: position || "topR",
        });
    };
    const handleSuccess = async (tx) => {
        console.log(tx);

        try {
            await tx.wait(1);
            handleNotification(tx);
            updateUi();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            Play lottery
            {lotteryContractAddress ? (
                <div>
                    <Button
                        disabled={isLoading || isFetching}
                        variant="contained"
                        sx={{ textTransform: "capitalize" }}
                        onClick={async function () {
                            try {
                                // Execute the contract function and wait for the transaction response
                                const tx = await joinLottery({
                                    onSuccess: handleSuccess,
                                    onError: (error) =>
                                        console.log("On error", error),
                                    onComplete: (data) =>
                                        console.log("On complete", data),
                                });
                                console.log("Transaction", tx);
                            } catch (error) {
                                console.error("Transaction failed:", error);
                            }
                        }}
                    >
                        {isLoading || isFetching ? (
                            <div>{isLoading ? "Loading" : "Fetching"}</div>
                        ) : (
                            <div>Play</div>
                        )}
                    </Button>
                    <div>
                        Lottery entrance fee:{" "}
                        {ethers.formatUnits(entranceFee, "ether")} ETH
                    </div>
                    <div>Number of players: {numberOfPlayers}</div>
                    <div> Winner: {winner}</div>
                </div>
            ) : (
                <div>No lottery contact address detected</div>
            )}
        </div>
    );
};
