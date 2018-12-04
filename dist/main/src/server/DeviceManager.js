"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Messages = require("../core/Messages");
const WebBluetoothDeviceManager_1 = require("./bluetooth/WebBluetoothDeviceManager");
const events_1 = require("events");
const Logging_1 = require("../core/Logging");
const Exceptions_1 = require("../core/Exceptions");
class DeviceManager extends events_1.EventEmitter {
    constructor(aMsgClosure) {
        super();
        this._subtypeManagers = [];
        this._devices = new Map();
        this._deviceCounter = 0;
        this._logger = Logging_1.ButtplugLogger.Logger;
        this.Shutdown = () => __awaiter(this, void 0, void 0, function* () {
            for (const d of this._devices.values()) {
                yield d.Disconnect();
            }
        });
        this.ClearDeviceManagers = () => {
            this._logger.Info("DeviceManager: Clearing device subtype managers");
            this._subtypeManagers = [];
        };
        this.AddDeviceManager = (aManager) => {
            this._logger.Info(`DeviceManager: Adding Device Manager ${aManager.constructor.name}`);
            aManager.SetLogger(this._logger);
            this._subtypeManagers.push(aManager);
            aManager.addListener("deviceadded", this.OnDeviceAdded);
            aManager.addListener("deviceremoved", this.OnDeviceRemoved);
            aManager.addListener("scanningfinished", this.OnScanningFinished);
        };
        this.SendMessage = (aMessage) => __awaiter(this, void 0, void 0, function* () {
            const id = aMessage.Id;
            // We need to switch on type here, since using constructor would cause
            // issues with how we do message versioning.
            switch (aMessage.Type) {
                case Messages.StartScanning:
                    this._logger.Debug(`DeviceManager: Starting scan`);
                    if (this._subtypeManagers.length === 0) {
                        // If we have no managers by this point, return an error, because we'll
                        // have nothing to scan with.
                        throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugDeviceException, this._logger, "No device managers available, cannot scan.", id);
                    }
                    for (const manager of this._subtypeManagers) {
                        if (!manager.IsScanning) {
                            try {
                                yield manager.StartScanning();
                            }
                            catch (e) {
                                // Something is wrong. Stop all other managers and rethrow.
                                // TODO Should this only fail on the bad manager, or all managers?
                                for (const mgr of this._subtypeManagers) {
                                    if (mgr.IsScanning) {
                                        mgr.StopScanning();
                                    }
                                }
                                throw e;
                            }
                        }
                    }
                    return new Messages.Ok(id);
                case Messages.StopScanning:
                    this._logger.Debug(`DeviceManager: Stopping scan`);
                    for (const manager of this._subtypeManagers) {
                        if (manager.IsScanning) {
                            manager.StopScanning();
                        }
                    }
                    return new Messages.Ok(id);
                case Messages.StopAllDevices:
                    this._logger.Debug(`DeviceManager: Stopping all devices`);
                    this._devices.forEach((deviceObj, index) => {
                        deviceObj.ParseMessage(new Messages.StopDeviceCmd());
                    });
                    return new Messages.Ok(id);
                case Messages.RequestDeviceList:
                    this._logger.Debug(`DeviceManager: Sending device list`);
                    const devices = [];
                    this._devices.forEach((v, k) => {
                        devices.push(new Messages.DeviceInfoWithSpecifications(k, v.Name, v.MessageSpecifications));
                    });
                    return new Messages.DeviceList(devices, id);
            }
            const deviceMsg = aMessage;
            if (deviceMsg.DeviceIndex === undefined) {
                throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugMessageException, this._logger, `Message Type ${aMessage.Type} unhandled by this server.`, id);
            }
            if (!this._devices.has(deviceMsg.DeviceIndex)) {
                throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugDeviceException, this._logger, `Device Index ${deviceMsg.DeviceIndex} does not exist`, id);
            }
            const device = this._devices.get(deviceMsg.DeviceIndex);
            if (device.AllowedMessageTypes.indexOf(aMessage.Type.name) < 0) {
                throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugDeviceException, this._logger, `Device ${device.Name} does not take message type ${aMessage.Type}`, id);
            }
            this._logger.Trace(`DeviceManager: Sending ${deviceMsg.Type} to ${device.Name} (${deviceMsg.Id})`);
            return yield device.ParseMessage(deviceMsg);
        });
        this.OnDeviceAdded = (device) => {
            for (const dev of this._devices.values()) {
                if (dev.Id === device.Id) {
                    this._logger.Info(`DeviceManager: Device ${device.Name} (id: ${device.Id}) already added, ignoring.`);
                    return;
                }
            }
            const deviceIndex = this._deviceCounter;
            this._deviceCounter += 1;
            this._devices.set(deviceIndex, device);
            this._logger.Info(`DeviceManager: Device Added: ${device.Name} (${deviceIndex})`);
            device.addListener("deviceremoved", this.OnDeviceRemoved);
            this._msgClosure(new Messages.DeviceAdded(deviceIndex, device.Name, device.MessageSpecifications));
        };
        this.OnDeviceRemoved = (device) => {
            let deviceIndex = null;
            for (const entry of Array.from(this._devices.entries())) {
                if (entry[1] === device) {
                    deviceIndex = entry[0];
                    break;
                }
            }
            if (deviceIndex === null) {
                return;
            }
            device.removeAllListeners("deviceremoved");
            this._devices.delete(deviceIndex);
            this._logger.Info(`DeviceManager: Device Removed: ${device.Name} (${deviceIndex})`);
            this._msgClosure(new Messages.DeviceRemoved(deviceIndex));
        };
        this.OnScanningFinished = () => {
            this._logger.Debug(`DeviceManager: Scanning Finished.`);
            for (const manager of this._subtypeManagers) {
                if (manager.IsScanning) {
                    return;
                }
            }
            this._msgClosure(new Messages.ScanningFinished());
        };
        this._logger.Debug("DeviceManager: Starting Device Manager");
        // If we have a bluetooth object on navigator, load the device manager
        if (typeof (window) !== "undefined" &&
            typeof (window.navigator) !== "undefined" &&
            navigator.bluetooth) {
            this.AddDeviceManager(new WebBluetoothDeviceManager_1.WebBluetoothDeviceManager(this._logger));
        }
        else {
            this._logger.Info("DeviceManager: Not adding WebBluetooth Manager, no WebBluetooth capabilities found.");
        }
        this._msgClosure = aMsgClosure;
    }
    get DeviceManagers() {
        return this._subtypeManagers;
    }
}
exports.DeviceManager = DeviceManager;
//# sourceMappingURL=DeviceManager.js.map