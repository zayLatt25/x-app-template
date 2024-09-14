import React, { useEffect, useState } from "react";
import { useWalletModal } from "@vechain/dapp-kit-react";
import { useWallet } from "@vechain/dapp-kit-react";

export default function Protected() {
    const { account } = useWallet();


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 text-white">
            <div className="px-4 hidden md:block">
                <h2 className=" font-bold text-3xl">Fun Facts</h2>
                <div className="h-[30vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[30vh] bg-white/40 my-4 rounded-xl"></div>
            </div>
            <div className="px-4">
                <h2 className=" text-left text-3xl font-bold">View Posts</h2>
                <div className="h-[20vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[20vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[20vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[20vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[20vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[20vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[20vh] bg-white/40 my-4 rounded-xl"></div>
            </div>
            <div className="px-4 hidden lg:block">
                <h2 className=" font-bold text-3xl">Badges</h2>
                <div className="h-[15vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[15vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[15vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[15vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[15vh] bg-white/40 my-4 rounded-xl"></div>
                <div className="h-[15vh] bg-white/40 my-4 rounded-xl"></div>
            </div>
        </div>
    );
}