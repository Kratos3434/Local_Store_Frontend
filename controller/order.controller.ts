import { Create_Order, Order } from "@/data";
import { orderEndpoint } from "@/endpoints";
import { errorMessage, isDateTodayOrPast, isTimeBetween8pmAnd7am, isValidPhoneNumber } from "@/utils";
import { createRequest } from "@/utils/createRequest";

export const requestOrder = async (data: Create_Order) => {
    if (!data.preferredMeetingPlace) throw errorMessage("Preferred meeting place is required");
    if (!data.preferredMeetupDate) throw errorMessage("Preferred meetup date is required");
    if (isDateTodayOrPast(data.preferredMeetupDate)) throw errorMessage("Preferred meetup date must be se to next day or any other day.");
    if (isTimeBetween8pmAnd7am(data.preferredMeetupDate)) throw errorMessage("Meetup time should not be between 8:00 PM - 7:00 AM due to safety concerns");
    if (!data.contactNumber) throw errorMessage("Contact number is required");
    if (!isValidPhoneNumber(data.contactNumber)) throw errorMessage("Contact number must be a valid phone number");
    if (!data.quantity) throw errorMessage("Quantity is required");
    if (isNaN(+data.quantity)) throw errorMessage("Quantity must be a valid number");

    await createRequest({
        url: orderEndpoint.create,
        method: 'POST',
        body: data
    });

    return true;
}

export const getSellerOrders = async (): Promise<Order[]> => {
    const res = await createRequest({
        url: orderEndpoint.sellerOrders,
        method: 'GET'
    });

    return res.data;
}

export const getSellerPendingOrders = async (): Promise<Order[]> => {
    const res = await createRequest({
        url: `${orderEndpoint.sellerOrders}?filter=pending`,
        method: 'GET'
    });

    return res.data;
}

export const getSellerCompleteOrders = async (): Promise<Order[]> => {
    const res = await createRequest({
        url: `${orderEndpoint.sellerOrders}?filter=complete`,
        method: 'GET'
    });

    return res.data;
}

export const getSellerOrderById = async (orderId: number): Promise<Order | null> => {
    const res = await createRequest({
        url: orderEndpoint.getSellerOrder(orderId),
        method: 'GET'
    });

    return res.data;
}

export const acceptOrderAsSeller = async (orderId: number) => {
    await createRequest({
        url: orderEndpoint.acceptAsSeller(orderId),
        method: 'PUT'
    });

    return true;
}

export const declineOrderAsSeller = async (orderId: number) => {
    await createRequest({
        url: orderEndpoint.declineAsSeller(orderId),
        method: 'PUT'
    });

    return true;
}

export const completeOrderAsSeller = async (orderId: number) => {
    await createRequest({
        url: orderEndpoint.complete(orderId),
        method: 'PUT'
    });

    return true;
}