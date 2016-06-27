import {IExperiment} from "./../../../common/Models";
import {ILogger} from "extension-services";
import {Signal} from "signals";

export class AppModel<T>
{
    stateUpdated: Signal;

    private _state : T;    
    private _initialState : T;    

    constructor(private logger : ILogger)
    {
        this.stateUpdated = new Signal();
    }

    async init(initialState:T)
    {
        this._state = initialState;
        this._initialState = initialState;
        await this.depersistState();
        this.logger.debug(this, "App state loaded", this._state);
    }

    resetToInitial()
    {
        this._state = Object.assign({}, this._initialState);
        this.stateUpdated.dispatch(this._state);
        this.persistState();
    }

    private depersistState() : Promise<T>
    {
        return new Promise<any>((resolve, reject) => {
            chrome.storage.local.get("appState", items => {
                if (items["appState"])
                    this._state = items["appState"];
                resolve();
            })
        });
    }

    private persistState() : Promise<void>
    {
        return new Promise<any>((resolve, reject) => {
            chrome.storage.local.set({appState: this.state}, () => resolve());
        });
    }

    update(newState:T)
    {
        this._state = Object.assign({}, this._state, newState);
        this.stateUpdated.dispatch(this._state);
        this.persistState();
    }

    get state() : T
    {
        return this._state;
    }
}