export const convertDateToString = function (dt) {
    let date = dt.toDateString();
    date = date.substring(4, date.length);
    let time = dt.toLocaleTimeString();
    return `${date} at ${time}`;
};
