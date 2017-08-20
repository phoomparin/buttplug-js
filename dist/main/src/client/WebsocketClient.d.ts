import { ButtplugClient } from "./Client";
import { ButtplugMessage } from "../core/Messages";
export declare class ButtplugWebsocketClient extends ButtplugClient {
    private _ws;
    constructor(aClientName: string);
    readonly Connected: boolean;
    ParseIncomingMessage: (aEvent: MessageEvent) => void;
    Connect: (aUrl: string) => Promise<void>;
    Disconnect: () => void;
    protected Send: (aMsg: ButtplugMessage) => void;
    private OnReaderLoad(aEvent);
}