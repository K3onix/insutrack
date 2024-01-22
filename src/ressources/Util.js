export class Util {
    static ConvertType = {
        DATE: 0,
        TIME: 1,
        DATETIME: 2,
        DATETIMESEC: 3
    }

    static strcmp(a,b) {
        if(a.toString() < b.toString()) return -1;
        if(a.toString() > b.toString()) return 1;
        return 0;
    }

    static convertDateTime(savedDateTime, convertType) {
        const dateTime = new Date(savedDateTime);
        let day, month, year, hours, minutes, seconds;

        if(convertType === this.ConvertType.DATE) {
            day = dateTime.getDate();
            day = ("0" + day).slice(-2);
            month = dateTime.getMonth() + 1;
            month = ("0" + month).slice(-2);
            year = dateTime.getFullYear();
            return day + "." + month + "." + year;
        }

        if(convertType === this.ConvertType.TIME) {
            hours = dateTime.getHours();
            hours = ("0" + hours).slice(-2);
            minutes = dateTime.getMinutes();
            minutes = ("0" + minutes).slice(-2);
            return hours + ":" + minutes;
        }

        if(convertType === this.ConvertType.DATETIME) {
            day = dateTime.getDate();
            day = ("0" + day).slice(-2);
            month = dateTime.getMonth() + 1;
            month = ("0" + month).slice(-2);
            year = dateTime.getFullYear();
            hours = dateTime.getHours();
            hours = ("0" + hours).slice(-2);
            minutes = dateTime.getMinutes();
            minutes = ("0" + minutes).slice(-2);
            return day + "." + month + "." + year + " " + hours + ":" + minutes;
        }

        if(convertType === this.ConvertType.DATETIMESEC) {
            day = dateTime.getDate();
            day = ("0" + day).slice(-2);
            month = dateTime.getMonth() + 1;
            month = ("0" + month).slice(-2);
            year = dateTime.getFullYear();
            hours = dateTime.getHours();
            hours = ("0" + hours).slice(-2);
            minutes = dateTime.getMinutes();
            minutes = ("0" + minutes).slice(-2);
            seconds = dateTime.getSeconds();
            seconds = ("0" + seconds).slice(-2);
            return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
        }
    }
}