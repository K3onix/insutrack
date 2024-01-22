import { Component } from "react";
import { StorageHandler } from "../ressources/StorageHandler";
import { Util } from "../ressources/Util";
import logo from "../logo.png";

export class InsuTrack extends Component {
    constructor(props) {
        super(props);
        StorageHandler.validateStorageConfig();
        const data = StorageHandler.getLatestDataPoint();
        
        this.state = {
            displayDate: data !== null ? Util.convertDateTime(data, Util.ConvertType.DATE) : null,
            displayTime: data !== null ? Util.convertDateTime(data, Util.ConvertType.TIME) : "Keine Daten",
            historyData: StorageHandler.getStorageItem("data"),
            showHistory: false
        };

        this.addValue = this.addValue.bind(this);
        this.renderHistory = this.renderHistory.bind(this);
        this.clearStorage = this.clearStorage.bind(this);
        this.toggleShowHistory = this.toggleShowHistory.bind(this);
    }

    addValue() {
        const dateTime = Date.now();
        const storageDateTime = StorageHandler.getLatestDataPoint();
        if(storageDateTime !== null 
            && Util.strcmp(Util.convertDateTime(dateTime, Util.ConvertType.DATETIME), 
            Util.convertDateTime(storageDateTime, Util.ConvertType.DATETIME)) === 0) {
                return;
        }

        StorageHandler.addDataToStorage(dateTime);

        this.setState({
            displayDate: Util.convertDateTime(dateTime, Util.ConvertType.DATE),
            displayTime: Util.convertDateTime(dateTime, Util.ConvertType.TIME),
            historyData: StorageHandler.getStorageItem("data"),
        });
    }

    toggleShowHistory() {
        this.setState({
            showHistory: !this.state.showHistory
        })
    }

    renderHistory() {
        if(this.state.showHistory === false) {
            return;
        }
        let data = this.state.historyData
        if (data === null || data.length <= 1) {
            return (<p>Keine Daten</p>);
        }
        data = data.slice(0,data.length-1).reverse();
        return(
            <ul className="no-bullet">
                {data.map((value, index) => {return <li key={index}>{Util.convertDateTime(value, Util.ConvertType.DATETIME)}</li>})}
            </ul>
        );
    }

    clearStorage() {
        if (window.confirm("Wollen Sie alle Daten löschen?") === true) {
            StorageHandler.resetStorage();
            this.setState({
                displayDate: null,
                displayTime: "Keine Daten",
                historyData: null
            });
        }
    }

    render() {
        return (
            <div>
                <div className="header"><img className="app-logo" src={logo} alt="Logo der Applikation"/>InsuTrack</div>
                <div className="content">
                    <div className="card">
                        <span className="card-title">Letzte Insulingabe</span>
                        <p className="date-indicator">{this.state.displayDate}</p>
                        <p className="time-indicator">{this.state.displayTime}</p>
                        <button className="btn-measure" onClick={this.addValue}>Insulingabe erfassen</button>
                    </div>

                    <div className="card" onClick={this.toggleShowHistory}>
                        <span className="card-title">Vorherige Insulingaben</span><span className={this.state.showHistory ? "collapse-indicator rotate" : "collapse-indicator"}>⌃</span>
                        {this.renderHistory()}
                    </div>

                    </div>
                <div className="footer">
                    <p>Alle Daten sind nur auf diesem Gerät gespeichert</p>
                    <p className="link danger" onClick={this.clearStorage}>Speicher löschen</p>
                    <p>&copy; {new Date().getFullYear()} | Kevin Gerspacher | Version 1.0.0</p>
                </div>
            </div>
        );
    }
}