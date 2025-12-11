import canada from 'canada';

const provinces = canada.provinces;

const abbrs = Object.keys(provinces);

export const provinceOptions = Object.keys(provinces).map((abbr) => {
    return { label: provinces[abbr], value: abbr };
});

export const isValidProvince = (province: string) => {
    for (let i = 0; i < abbrs.length; i++) {
        if (province === abbrs[i]) {
            return true;
        }
    }

    return false;
}