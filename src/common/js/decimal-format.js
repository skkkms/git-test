import DecimalFormat, { RoundingMode } from 'decimal-format';

const decimalFormat = (numVal, fmtStr = '#,##0.#', roundingMode = RoundingMode.HALF_UP) => {
    const df = new DecimalFormat(fmtStr);
    df.setRoundingMode(roundingMode);
    return df.format(numVal);
};

export default {
    decimalFormat,
    RoundingMode,
};