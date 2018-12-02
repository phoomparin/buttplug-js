"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Messages = require("./Messages");
class ButtplugException extends Error {
    constructor(aMessage, aErrorClass, aId = Messages.SYSTEM_MESSAGE_ID, aInner) {
        super(aMessage);
        this.errorClass = Messages.ErrorClass.ERROR_UNKNOWN;
        this.errorClass = aErrorClass;
        this.innerError = aInner;
        this.messageId = aId;
    }
    get ErrorClass() {
        return this.errorClass;
    }
    get InnerException() {
        return this.innerError;
    }
    get Id() {
        return this.messageId;
    }
    static LogAndError(aConstructor, aLogger, aMessage, aId = Messages.SYSTEM_MESSAGE_ID) {
        aLogger.Error(aMessage);
        return new aConstructor(aMessage, aId);
    }
    static FromError(aError) {
        switch (aError.ErrorCode) {
            case Messages.ErrorClass.ERROR_DEVICE:
                return new ButtplugDeviceException(aError.ErrorMessage, aError.Id);
            case Messages.ErrorClass.ERROR_INIT:
                return new ButtplugInitException(aError.ErrorMessage, aError.Id);
            case Messages.ErrorClass.ERROR_UNKNOWN:
                return new ButtplugUnknownException(aError.ErrorMessage, aError.Id);
            case Messages.ErrorClass.ERROR_PING:
                return new ButtplugPingException(aError.ErrorMessage, aError.Id);
            case Messages.ErrorClass.ERROR_MSG:
                return new ButtplugMessageException(aError.ErrorMessage, aError.Id);
            default:
                throw new Error(`Message type ${aError.ErrorCode} not handled`);
        }
    }
}
exports.ButtplugException = ButtplugException;
class ButtplugInitException extends ButtplugException {
    constructor(aMessage, aId = Messages.SYSTEM_MESSAGE_ID) {
        super(aMessage, Messages.ErrorClass.ERROR_INIT, aId);
    }
}
exports.ButtplugInitException = ButtplugInitException;
class ButtplugDeviceException extends ButtplugException {
    constructor(aMessage, aId = Messages.SYSTEM_MESSAGE_ID) {
        super(aMessage, Messages.ErrorClass.ERROR_DEVICE, aId);
    }
}
exports.ButtplugDeviceException = ButtplugDeviceException;
class ButtplugMessageException extends ButtplugException {
    constructor(aMessage, aId = Messages.SYSTEM_MESSAGE_ID) {
        super(aMessage, Messages.ErrorClass.ERROR_MSG, aId);
    }
}
exports.ButtplugMessageException = ButtplugMessageException;
class ButtplugPingException extends ButtplugException {
    constructor(aMessage, aId = Messages.SYSTEM_MESSAGE_ID) {
        super(aMessage, Messages.ErrorClass.ERROR_PING, aId);
    }
}
exports.ButtplugPingException = ButtplugPingException;
class ButtplugUnknownException extends ButtplugException {
    constructor(aMessage, aId = Messages.SYSTEM_MESSAGE_ID) {
        super(aMessage, Messages.ErrorClass.ERROR_UNKNOWN, aId);
    }
}
exports.ButtplugUnknownException = ButtplugUnknownException;
//# sourceMappingURL=Exceptions.js.map