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
const MessageUtils_1 = require("../core/MessageUtils");
const DeviceManager_1 = require("./DeviceManager");
const events_1 = require("events");
const Logging_1 = require("../core/Logging");
const Messages_1 = require("../core/Messages");
const Exceptions_1 = require("../core/Exceptions");
class ButtplugServer extends events_1.EventEmitter {
    constructor(_serverName = "Buttplug JS Internal Server", _maxPingTime = 0) {
        super();
        this._serverName = _serverName;
        this._maxPingTime = _maxPingTime;
        // Member: PingTimer?
        this._clientSchemaVersion = -1;
        this._clientName = undefined;
        this._pingTimedOut = false;
        this._receivedRequestServerInfo = false;
        this._logger = Logging_1.ButtplugLogger.Logger;
        this._outgoingLogLevel = Logging_1.ButtplugLogLevel.Off;
        this._connected = false;
        this.AddDeviceManager = (aManager) => {
            this._deviceManager.AddDeviceManager(aManager);
        };
        this.ClearDeviceManagers = () => {
            this._deviceManager.ClearDeviceManagers();
        };
        this.Disconnect = () => {
            this._connected = false;
        };
        this.CheckConnection = () => {
            if (!this._connected) {
                // This doesn't even get a class because if we're not connected, we have
                // nothing to pass through objects. It's just a straight up error.
                throw new Error("Server not connected to client.");
            }
        };
        this.SendMessage = (aMessage) => __awaiter(this, void 0, void 0, function* () {
            if (!(aMessage instanceof Messages_1.RequestServerInfo)) {
                this.CheckConnection();
            }
            const id = aMessage.Id;
            this._logger.Trace(`Server: Got Message: ${aMessage}`);
            if (id === 0) {
                throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugMessageException, this._logger, "Message Id 0 is reserved for outgoing system messages. Use another Id.", id);
            }
            if (this._pingTimedOut) {
                throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugPingException, this._logger, "Ping timed out.", id);
            }
            if (!this._receivedRequestServerInfo && aMessage.Type !== Messages.RequestServerInfo) {
                throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugInitException, this._logger, "RequestServerInfo must be first message received by server.", id);
            }
            // We need to switch on type here, since using constructor would cause
            // issues with how we do message versioning.
            switch (aMessage.Type) {
                case Messages.RequestLog:
                    const logmsg = aMessage;
                    this._logger.Debug(`Server: RequestLog received for level ${logmsg.LogLevel}`);
                    if (logmsg.LogLevel === Logging_1.ButtplugLogLevel[Logging_1.ButtplugLogLevel.Off]) {
                        this._logger.removeListener("log", this.OnLogMessage);
                    }
                    else if (this._outgoingLogLevel === Logging_1.ButtplugLogLevel.Off) {
                        this._logger.addListener("log", this.OnLogMessage);
                    }
                    this._logger.MaximumEventLogLevel = Logging_1.ButtplugLogLevel[logmsg.LogLevel];
                    this._outgoingLogLevel = Logging_1.ButtplugLogLevel[logmsg.LogLevel];
                    return new Messages.Ok(logmsg.Id);
                case Messages.Ping:
                    // TODO: Implement Ping
                    return new Messages.Ok(aMessage.Id);
                case Messages.RequestServerInfo:
                    this._logger.Debug(`Server: RequestServerInfo received.`);
                    const msg = aMessage;
                    if (this._clientSchemaVersion > 1) {
                        // Client automatically disconnects on error message.
                        throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugInitException, this._logger, `Client schema (${this._clientSchemaVersion}) newer than ` +
                            "server schema (1). Please upgrade server.", id);
                    }
                    this._receivedRequestServerInfo = true;
                    this._clientSchemaVersion = msg.MessageVersion;
                    this._clientName = msg.ClientName;
                    // TODO: Figure out how to encode this from the package version?
                    this._connected = true;
                    return new Messages.ServerInfo(0, 0, 0, MessageUtils_1.GetSchemaVersion(), this._maxPingTime, this._serverName, id);
                case Messages.Test:
                    this._logger.Debug(`Server: Test received.`);
                    const testmsg = aMessage;
                    return new Messages.Test(testmsg.TestString, aMessage.Id);
            }
            return this._deviceManager.SendMessage(aMessage);
        });
        this.Shutdown = () => __awaiter(this, void 0, void 0, function* () {
            this.Disconnect();
            yield this._deviceManager.Shutdown();
        });
        this.OnLogMessage = (aMsg) => {
            if (aMsg.LogLevel > this._outgoingLogLevel) {
                return;
            }
            this.SendOutgoingMessage(new Messages.Log(Logging_1.ButtplugLogLevel[aMsg.LogLevel], aMsg.Message));
        };
        this.SendOutgoingMessage = (msg) => {
            if (!this._connected) {
                return;
            }
            if (this._clientSchemaVersion === -1) {
                throw Exceptions_1.ButtplugException.LogAndError(Exceptions_1.ButtplugMessageException, this._logger, "Cannot discern client schema version. Was RequestServerInfo message sent?");
            }
            while (msg.SchemaVersion !== this._clientSchemaVersion && msg.SchemaVersion > 0) {
                // If we can't downgrade any farther back, this will throw, which should
                // be handled by the caller.
                msg = msg.DowngradeMessage();
            }
            this.emit("message", msg);
        };
        this._logger.Info(`Server: Starting Buttplug Server: ${this._serverName}`);
        this._deviceManager = new DeviceManager_1.DeviceManager((aMsg) => this.SendOutgoingMessage(aMsg));
    }
    get DeviceManagers() {
        return this._deviceManager.DeviceManagers;
    }
}
exports.ButtplugServer = ButtplugServer;
//# sourceMappingURL=ButtplugServer.js.map