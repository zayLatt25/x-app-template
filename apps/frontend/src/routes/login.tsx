import React, { useEffect, useState } from "react";
import { useWallet } from "@vechain/dapp-kit-react";
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { account } = useWallet();
    const navigate = useNavigate()

    if (account) {
        navigate('/')
    }
    return <div className="absolute inset-0 h-full grid place-items-center">

        <div className=" " data-x="bg-emerald-500 px-5 md:px-24 shadow-xl rounded-2xl">
            <div className="max-w-md bg-white p-8 rounded-2xl px-10">
                <h2 className="text-3xl font-bold text-green-800 mb-4">SG Odyssey</h2>

                <p className="text-green-700 mb-6 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <form className="">
                    <input type="text" placeholder="Username" className="w-full px-2 py-1  rounded-full border-[#506c4c] border mb-2" />
                    <input type="password" placeholder="Password" className="w-full px-2 py-1  rounded-full border-[#506c4c] border mb-6" />

                    <button className="w-full bg-[#506c4c] text-white rounded-full py-3 hover:bg-green-700 transition-colors">

                        Login
                    </button>
                </form>
                <div className="mt-6 text-right">
                    <span className="inline-block transform rotate-45 text-orange-400 text-2xl">👣</span>
                </div>
            </div>
        </div>
    </div>
}