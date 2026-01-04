'use client'

import { useState } from "react";
import SellerAllOrders from "./SellerAllOrders";
import SellerPendingOrders from "./SellerPendingOrders";
import SellerCompletedOrders from "./SellerCompletedOrders";

const SellerOrders = () => {
    const options = ["ALL", "Pending", "Completed"];

    const [currentOption, setCurrentOption] = useState(options[0]);


    return (
        <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <div className="flex items-center gap-3 mt-3">
                {
                    options.map((e, idx) => {
                        return (
                            <button key={idx} className={`${currentOption === e ? "bg-indigo-500 text-white" : "hover:bg-indigo-500 hover:text-white"} p-1 rounded-md px-2 ffont-bold cursor-pointer`} 
                            onClick={() => setCurrentOption(e)}>
                                {e}
                            </button>
                        );
                    })
                }
            </div>
            <hr className="my-3" />
            {currentOption === options[0] && <SellerAllOrders />}
            {currentOption === options[1] && <SellerPendingOrders />}
            {currentOption === options[2] && <SellerCompletedOrders />}
        </div>
    );
}

export default SellerOrders;