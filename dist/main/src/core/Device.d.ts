import * as Messages from "./Messages";
/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export declare class Device {
    private index;
    private name;
    static fromMsg(aMsg: Messages.DeviceAddedVersion1 | Messages.DeviceInfoWithSpecifications): Device;
    private allowedMsgs;
    /**
     * @param _index Index of the device, as created by the device manager.
     * @param _name Name of the device.
     * @param _allowedMsgs Buttplug messages the device can receive.
     */
    constructor(index: number, name: string, allowedMsgsObj: object);
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
    /**
     * Return the message attributes related to the given message
     */
    MessageAttributes(messageName: string): Messages.MessageAttributes;
}