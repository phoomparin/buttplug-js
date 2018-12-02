/// <reference types="node" />
import { ButtplugClient } from "../src/index";
import { BluetoothDeviceInfo } from "../src/server/bluetooth/BluetoothDeviceInfo";
import * as Messages from "../src/core/Messages";
import { DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";
export declare class BPTestClient extends ButtplugClient {
    constructor(ClientName: string);
    readonly PingTimer: NodeJS.Timer | null;
    SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>;
}
export declare function SetupLovenseTestDevice(mockBT: WebBluetoothMockObject, deviceLetter?: string): void;
export declare function SetupTestSuite(): void;
export declare class WebBluetoothMockObject {
    device: DeviceMock;
    gatt: GattMock;
    service: PrimaryServiceMock;
    txChar: CharacteristicMock;
    rxChar: CharacteristicMock;
    constructor(device: DeviceMock, gatt: GattMock, service: PrimaryServiceMock, txChar: CharacteristicMock, rxChar: CharacteristicMock);
}
export declare function MakeMockWebBluetoothDevice(deviceInfo: BluetoothDeviceInfo): WebBluetoothMockObject;
export declare function SetupTestServer(): Promise<any>;
