"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Messages = require("../core/Messages");
const Exceptions_1 = require("../core/Exceptions");
class ButtplugMessageSorter {
    constructor() {
        this._counter = 1;
        this._waitingMsgs = new Map();
    }
    PrepareOutgoingMessage(aMsg) {
        aMsg.Id = this._counter;
        let res;
        let rej;
        const msgPromise = new Promise((resolve, reject) => { res = resolve; rej = reject; });
        this._waitingMsgs.set(this._counter, [res, rej]);
        // Always increment last, otherwise we might lose sync
        this._counter += 1;
        return msgPromise;
    }
    ParseIncomingMessages(aMsgs) {
        const noMatch = [];
        for (const x of aMsgs) {
            if (x.Id !== Messages.SYSTEM_MESSAGE_ID && this._waitingMsgs.has(x.Id)) {
                const [res, rej] = this._waitingMsgs.get(x.Id);
                // If we've gotten back an error, reject the related promise using a
                // ButtplugException derived type.
                if (x.Type === Messages.Error) {
                    rej(Exceptions_1.ButtplugException.FromError(x));
                    continue;
                }
                res(x);
                continue;
            }
            else {
                noMatch.push(x);
            }
        }
        return noMatch;
    }
}
exports.ButtplugMessageSorter = ButtplugMessageSorter;
//# sourceMappingURL=ButtplugMessageSorter.js.map