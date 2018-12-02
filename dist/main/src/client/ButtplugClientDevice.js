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
const Exceptions_1 = require("../core/Exceptions");
/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
class ButtplugClientDevice {
    /**
     * @param _index Index of the device, as created by the device manager.
     * @param _name Name of the device.
     * @param allowedMsgs Buttplug messages the device can receive.
     */
    constructor(_index, _name, allowedMsgsObj, _sendClosure) {
        this._index = _index;
        this._name = _name;
        this._sendClosure = _sendClosure;
        // Map of messages and their attributes (feature count, etc...)
        this.allowedMsgs = new Map();
        for (const k of Object.keys(allowedMsgsObj)) {
            this.allowedMsgs.set(k, allowedMsgsObj[k]);
        }
    }
    /**
     * Return the name of the device.
     */
    get Name() {
        return this._name;
    }
    /**
     * Return the index of the device.
     */
    get Index() {
        return this._index;
    }
    /**
     * Return a list of message types the device accepts.
     */
    get AllowedMessages() {
        return Array.from(this.allowedMsgs.keys());
    }
    static fromMsg(aMsg, sendClosure) {
        return new ButtplugClientDevice(aMsg.DeviceIndex, aMsg.DeviceName, aMsg.DeviceMessages, sendClosure);
    }
    CheckAllowedMessageType(aName) {
        if (this.AllowedMessages.indexOf(aName) === -1) {
            throw new Exceptions_1.ButtplugDeviceException(`Message ${aName} does not exist on device ${this._name}`);
        }
    }
    /**
     * Return the message attributes related to the given message
     */
    MessageAttributes(messageName) {
        this.CheckAllowedMessageType(messageName);
        return this.allowedMsgs.get(messageName);
    }
    SendMessageAsync(aMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assume we're getting the closure from ButtplugClient, which does all of
            // the index/existence/connection/message checks for us.
            yield this._sendClosure(this, aMsg);
        });
    }
    SendVibrateCmd(aSpeed) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckAllowedMessageType(Messages.VibrateCmd.name);
            let msg;
            if (typeof (aSpeed) === "number") {
                // We can skip the check here since we're building the command array ourselves.
                const features = this.MessageAttributes(Messages.VibrateCmd.name).FeatureCount;
                msg = Messages.VibrateCmd.Create(this._index, new Array(features).fill(aSpeed));
            }
            else if (Array.isArray(aSpeed)) {
                msg = Messages.VibrateCmd.Create(this._index, aSpeed);
                this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name, msg.Speeds, this.MessageAttributes(Messages.VibrateCmd.name).FeatureCount);
            }
            else {
                throw new Exceptions_1.ButtplugDeviceException("SendVibrateCmd can only take numbers or arrays of numbers.");
            }
            yield this.SendMessageAsync(msg);
        });
    }
    SendRotateCmd(aValues, aClockwise) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckAllowedMessageType(Messages.RotateCmd.name);
            let msg;
            if (typeof (aValues) === "number") {
                // We can skip the check here since we're building the command array ourselves.
                const features = this.MessageAttributes(Messages.RotateCmd.name).FeatureCount;
                msg = Messages.RotateCmd.Create(this._index, new Array(features).fill([aValues, aClockwise]));
            }
            else if (Array.isArray(aValues)) {
                msg = Messages.RotateCmd.Create(this._index, aValues);
                this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name, msg.Rotations, this.MessageAttributes(Messages.RotateCmd.name).FeatureCount);
            }
            else {
                throw new Exceptions_1.ButtplugDeviceException("SendRotateCmd can only take a number and boolean, or an array of number/boolean tuples");
            }
            yield this.SendMessageAsync(msg);
        });
    }
    SendLinearCmd(aValues, aDuration) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckAllowedMessageType(Messages.LinearCmd.name);
            let msg;
            if (typeof (aValues) === "number") {
                // We can skip the check here since we're building the command array ourselves.
                const features = this.MessageAttributes(Messages.LinearCmd.name).FeatureCount;
                msg = Messages.LinearCmd.Create(this._index, new Array(features).fill([aValues, aDuration]));
            }
            else if (Array.isArray(aValues)) {
                msg = Messages.LinearCmd.Create(this._index, aValues);
                this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name, msg.Vectors, this.MessageAttributes(Messages.LinearCmd.name).FeatureCount);
            }
            else {
                throw new Exceptions_1.ButtplugDeviceException("SendLinearCmd can only take a number and number, or an array of number/number tuples");
            }
            yield this.SendMessageAsync(msg);
        });
    }
    SendFleshlightLaunchFW12Cmd(aSpeed, aPosition) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckAllowedMessageType(Messages.FleshlightLaunchFW12Cmd.name);
            yield this.SendMessageAsync(new Messages.FleshlightLaunchFW12Cmd(aSpeed, aPosition, this._index));
        });
    }
    SendLovenseCmd(aDeviceCmd) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckAllowedMessageType(Messages.LovenseCmd.name);
            yield this.SendMessageAsync(new Messages.LovenseCmd(aDeviceCmd, this._index));
        });
    }
    SendVorzeA10CycloneCmd(aSpeed, aClockwise) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckAllowedMessageType(Messages.VorzeA10CycloneCmd.name);
            yield this.SendMessageAsync(new Messages.VorzeA10CycloneCmd(aSpeed, aClockwise, this._index));
        });
    }
    SendStopDeviceCmd() {
        return __awaiter(this, void 0, void 0, function* () {
            // Every message should support this, but it doesn't hurt to check
            this.CheckAllowedMessageType(Messages.StopDeviceCmd.name);
            yield this.SendMessageAsync(new Messages.StopDeviceCmd(this._index));
        });
    }
    SendKiirooCmd(aPosition) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckAllowedMessageType(Messages.KiirooCmd.name);
            yield this.SendMessageAsync(new Messages.KiirooCmd(aPosition, this._index));
        });
    }
    CheckGenericSubcommandList(aType, aCmdList, aLimitValue) {
        if (aCmdList.length === 0 || aCmdList.length > aLimitValue) {
            if (aLimitValue === 1) {
                throw new Exceptions_1.ButtplugDeviceException(`${aType} requires 1 subcommand for this device, ${aCmdList.length} present.`);
            }
            throw new Exceptions_1.ButtplugDeviceException(`${aType} requires between 1 and ${aLimitValue} subcommands for this device, ${aCmdList.length} present.`);
        }
        for (const cmd of aCmdList) {
            if (cmd.Index >= aLimitValue) {
                throw new Exceptions_1.ButtplugDeviceException(`Index ${cmd.Index} is out of bounds for ${aType} for this device.`);
            }
        }
    }
}
exports.ButtplugClientDevice = ButtplugClientDevice;
//# sourceMappingURL=ButtplugClientDevice.js.map