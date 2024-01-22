import { Util } from "./Util";

export class StorageHandler {
    static VERSION = "v1";
    static CONFIG = {
        "version": this.VERSION,
        "created": Util.convertDateTime(Date.now(), Util.ConvertType.DATETIMESEC)
    };
    static DATA = [];
    static MAX_ENTRIES = 11;

    static storageSetup() {
        localStorage.setItem("config", JSON.stringify(this.CONFIG));
        localStorage.setItem("data", JSON.stringify(this.DATA));
    }

    static validateStorageConfig() {
        if(localStorage.getItem("config") === null) {
            this.storageSetup();
        }
    }

    static getStorageItem(itemName) {
        const item = localStorage.getItem(itemName.toLowerCase());
        if(item === null) return null;
        return JSON.parse(item);
    }

    static addDataToStorage(value) {
        let dataStorage = this.getStorageItem("data");
        if (dataStorage.length >= this.MAX_ENTRIES) {
            dataStorage.shift();
        }
        dataStorage.push(value);
        localStorage.setItem("data", JSON.stringify(dataStorage));
    }

    static getLatestDataPoint() {
        const dataStorage = this.getStorageItem("data");

        if(dataStorage.length === 0) {
            return null;
        }
        return dataStorage.slice(-1)[0];
    }

    static resetStorage() {
        localStorage.clear();
        this.storageSetup();
    }
}