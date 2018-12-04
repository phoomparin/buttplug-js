/// <reference types="node" />
import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../index";
import { TestDevice } from "./TestDevice";
import { ButtplugLogger } from "../index";
export declare class TestDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    private _logger;
    private _isScanning;
    private _testVibrationDevice;
    private _testLinearDevice;
    private _testRotationDevice;
    constructor();
    SetLogger(aLogger: ButtplugLogger): void;
    ConnectVibrationDevice(): void;
    ConnectLinearDevice(): void;
    ConnectRotationDevice(): void;
    StartScanning(): void;
    readonly VibrationDevice: TestDevice;
    readonly LinearDevice: TestDevice;
    readonly RotationDevice: TestDevice;
    StopScanning(): void;
    readonly IsScanning: boolean;
}
