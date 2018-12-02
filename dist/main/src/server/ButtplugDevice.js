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
const events_1 = require("events");
const Exceptions_1 = require("../core/Exceptions");
class ButtplugDevice extends events_1.EventEmitter {
    constructor(_name, _id) {
        super();
        this._name = _name;
        this._id = _id;
        // tslint:disable-next-line:ban-types
        this.MsgFuncs = 
        // tslint:disable-next-line:ban-types
        new Map();
        this.ParseMessage = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (!this.MsgFuncs.has(aMsg.Type)) {
                throw new Exceptions_1.ButtplugMessageException(`${this._name} cannot handle message of type ${aMsg.Type}`, aMsg.Id);
            }
            // Non-null assurance in the middle of functions looks weird.
            return this.MsgFuncs.get(aMsg.Type)(aMsg);
        });
    }
    get Name() {
        return this._name;
    }
    get Id() {
        return this._id;
    }
    get AllowedMessageTypes() {
        return Object.keys(this.MessageSpecifications);
    }
}
exports.ButtplugDevice = ButtplugDevice;
//# sourceMappingURL=ButtplugDevice.js.map