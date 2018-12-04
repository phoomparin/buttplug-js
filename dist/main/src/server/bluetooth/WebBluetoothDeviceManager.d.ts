/// <reference types="node" />
import { ButtplugLogger } from "../../core/Logging";
import { IDeviceSubtypeManager } from "../IDeviceSubtypeManager";
import { EventEmitter } from "events";
export declare class WebBluetoothDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    private _logger;
    constructor(aLogger: ButtplugLogger | undefined);
    SetLogger(aLogger: ButtplugLogger): void;
    StartScanning(): Promise<void>;
    StopScanning(): void;
    readonly IsScanning: boolean;
    private OpenDevice;
}
