'use client'
import { useState } from "react";
import AllOrders from "./AllOrders";
import MeetupOrders from "./MeetupOrders";
import ShippingOrders from "./ShippingOrders";

const Orders = () => {
    const options = ["All", "Meetup", "Shipping"];

    const [currentOption, setCurrentOption] = useState(options[0]);

    return (
        <div className="w-full flex justify-center mt-3">
            <div className="w-full max-w-[900px]">
                <h1 className="text-3xl font-bold">
                    Orders
                </h1>
                <div className="flex items-center gap-3 mt-3">
                    {
                        options.map((e, idx) => {
                            return (
                                <button key={idx} className={`${currentOption === e ? "bg-indigo-500 text-white" : "hover:bg-indigo-500 hover:text-white"} p-1 px-2 rounded-md cursor-pointer`} onClick={() => setCurrentOption(e)}>
                                    {e}
                                </button>
                            );
                        })
                    }
                </div>
                <hr className="my-3" />
                {currentOption === options[0] && <AllOrders />}
                {currentOption === options[1] && <MeetupOrders />}
                {currentOption === options[2] && <ShippingOrders />}
            </div>
        </div>
    );
}

export default Orders;