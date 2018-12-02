import * as Messages from "./Messages";
import { ButtplugLogger } from "./Logging";
export declare class ButtplugException extends Error {
    readonly ErrorClass: Messages.ErrorClass;
    readonly InnerException: Error | undefined;
    readonly Id: number | undefined;
    static LogAndError<T extends ButtplugException>(aConstructor: new (aStr: string, aNum: number) => T, aLogger: ButtplugLogger, aMessage: string, aId?: number): T;
    static FromError(aError: Messages.Error): ButtplugDeviceException | ButtplugInitException | ButtplugUnknownException | ButtplugPingException | ButtplugMessageException;
    errorClass: Messages.ErrorClass;
    innerError: Error | undefined;
    messageId: number | undefined;
    protected constructor(aMessage: string, aErrorClass: Messages.ErrorClass, aId?: number, aInner?: Error);
}
export declare class ButtplugInitException extends ButtplugException {
    constructor(aMessage: string, aId?: number);
}
export declare class ButtplugDeviceException extends ButtplugException {
    constructor(aMessage: string, aId?: number);
}
export declare class ButtplugMessageException extends ButtplugException {
    constructor(aMessage: string, aId?: number);
}
export declare class ButtplugPingException extends ButtplugException {
    constructor(aMessage: string, aId?: number);
}
export declare class ButtplugUnknownException extends ButtplugException {
    constructor(aMessage: string, aId?: number);
}
