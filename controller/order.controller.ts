import { Create_Order } from "@/data";
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