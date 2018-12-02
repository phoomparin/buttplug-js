import * as Messages from "../core/Messages";
export declare class ButtplugMessageSorter {
    protected _counter: number;
    protected _waitingMsgs: Map<number, [(val: Messages.ButtplugMessage) => void, (err: Error) => void]>;
    PrepareOutgoingMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>;
    ParseIncomingMessages(aMsgs: Messages.ButtplugMessage[]): Messages.ButtplugMessage[];
}
