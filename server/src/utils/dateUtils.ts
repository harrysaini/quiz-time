
/**
* Convert date
* JSDATE - 2020-02-19T12:02:27.385Z
* MySQL - 2020-02-19 12:02:27.385
 **/
export const toMysqlFormat = function(date: Date) {
    return date.toISOString().replace('T', ' ').replace('Z', '');
};
