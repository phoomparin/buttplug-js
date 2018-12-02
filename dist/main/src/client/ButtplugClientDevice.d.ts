import * as Messages from "../core/Messages";
/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export declare class ButtplugClientDevice {
    private _index;
    private _name;
    private _sendClosure;
    /**
     * Return the name of the device.
     */
    readonly Name: string;
    /**
     * Return the index of the device.
     */
    readonly Index: number;
    /**
     * Return a list of message types the device accepts.
     */
    readonly AllowedMessages: string[];
    static fromMsg(aMsg: Messages.DeviceAdded | Messages.DeviceInfoWithSpecifications, sendClosure: (aDevice: ButtplugClientDevice, aMsg: Messages.ButtplugDeviceMessage) => Promise<void>): ButtplugClientDevice;
    private allowedMsgs;
    /**
     * @param _index Index of the device, as created by the device manager.
     * @param _name Name of the device.
     * @param allowedMsgs Buttplug messages the device can receive.
     */
    constructor(_index: number, _name: string, allowedMsgsObj: object, _sendClosure: (aDevice: ButtplugClientDevice, aMsg: Messages.ButtplugDeviceMessage) => Promise<void>);
    CheckAllowedMessageType(aName: string): void;
    /**
     * Return the message attributes related to the given message
     */
    MessageAttributes(messageName: string): Messages.MessageAttributes;
    SendMessageAsync(aMsg: Messages.ButtplugDeviceMessage): Promise<void>;
    SendVibrateCmd(aSpeed: number | number[]): Promise<void>;
    SendRotateCmd(aValues: number | Array<[number, boolean]>, aClockwise?: boolean): Promise<void>;
    SendLinearCmd(aValues: number | Array<[number, number]>, aDuration?: number): Promise<void>;
    SendFleshlightLaunchFW12Cmd(aSpeed: number, aPosition: number): Promise<void>;
    SendLovenseCmd(aDeviceCmd: string): Promise<void>;
    SendVorzeA10CycloneCmd(aSpeed: number, aClockwise: boolean): Promise<void>;
    SendStopDeviceCmd(): Promise<void>;
    SendKiirooCmd(aPosition: number): Promise<void>;
    private CheckGenericSubcommandList;
}
