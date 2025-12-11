import canada from 'canada';

// get array of cities and their provinces
const cities = canada.cities

export const getCities = (province: string) => {
    const results: {label: string, value: string}[] = [];
    cities.map((cityData: any) => {
        if (cityData[1] === province) {
            results.push({label: cityData[0], value: cityData[0]});
        }
    });

    return results;
}

const getCitiesLocal = (province: string) => {
    const results: string[] = [];
    cities.map((cityData: any) => {
        if (cityData[1] === province) {
            results.push(cityData[0]);
        }
    });

    return results;
}

export const isValidCity = (province: string, city: string) => {
    const res = getCitiesLocal(province);

    for (let i = 0; i < res.length; i++) {
        if (res[i] === city) {
            return true;
        }
    }

    return false;
}