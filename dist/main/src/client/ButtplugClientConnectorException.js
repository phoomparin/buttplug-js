"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../core/Exceptions");
const Messages = require("../core/Messages");
class ButtplugClientConnectorException extends Exceptions_1.ButtplugException {
    constructor(aMessage) {
        super(aMessage, Messages.ErrorClass.ERROR_UNKNOWN);
    }
}
exports.ButtplugClientConnectorException = ButtplugClientConnectorException;
//# sourceMappingURL=ButtplugClientConnectorException.js.map