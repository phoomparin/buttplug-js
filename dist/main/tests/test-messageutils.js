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
const utils_1 = require("./utils");
const index_1 = require("../src/index");
utils_1.SetupTestSuite();
describe("Message Utils Tests", () => {
    let lastMsg;
    const testDevice = new index_1.ButtplugClientDevice(0, "Test Device", {
        VibrateCmd: { FeatureCount: 2 },
        RotateCmd: { FeatureCount: 1 },
        LinearCmd: { FeatureCount: 1 },
        FleshlightLaunchFW12Cmd: {},
        LovenseCmd: {},
        VorzeA10CycloneCmd: {},
        KiirooCmd: {},
        StopDeviceCmd: {},
    }, (aDevice, aMsg) => __awaiter(this, void 0, void 0, function* () { lastMsg = aMsg; }));
    const testVibrateDevice = new index_1.ButtplugClientDevice(0, "Test Vibrate Device", {
        VibrateCmd: { FeatureCount: 2 },
    }, (aDevice, aMsg) => __awaiter(this, void 0, void 0, function* () { lastMsg = aMsg; }));
    const testRotateDevice = new index_1.ButtplugClientDevice(0, "Test Rotate Device", {
        RotateCmd: { FeatureCount: 1 },
    }, (aDevice, aMsg) => __awaiter(this, void 0, void 0, function* () { lastMsg = aMsg; }));
    const testLinearDevice = new index_1.ButtplugClientDevice(0, "Test Linear Device", {
        LinearCmd: { FeatureCount: 1 },
    }, (aDevice, aMsg) => __awaiter(this, void 0, void 0, function* () { lastMsg = aMsg; }));
    it("should create correct message using internal functions", () => __awaiter(this, void 0, void 0, function* () {
        yield testDevice.SendVibrateCmd(0.5);
        expect(lastMsg).toEqual(new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 0.5),
            new index_1.SpeedSubcommand(1, 0.5)], 0));
        yield testDevice.SendVibrateCmd([0.5, 1.0]);
        expect(lastMsg).toEqual(new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 0.5),
            new index_1.SpeedSubcommand(1, 1.0)], 0));
        yield testDevice.SendRotateCmd(0.5, true);
        expect(lastMsg).toEqual(new index_1.RotateCmd([new index_1.RotateSubcommand(0, 0.5, true)], 0));
        yield testDevice.SendRotateCmd([[0.5, true]]);
        expect(lastMsg).toEqual(new index_1.RotateCmd([new index_1.RotateSubcommand(0, 0.5, true)], 0));
        yield testDevice.SendLinearCmd(0.5, 1.5);
        expect(lastMsg).toEqual(new index_1.LinearCmd([new index_1.VectorSubcommand(0, 0.5, 1.5)], 0));
        yield testDevice.SendLinearCmd([[0.5, 1.5]]);
        expect(lastMsg).toEqual(new index_1.LinearCmd([new index_1.VectorSubcommand(0, 0.5, 1.5)], 0));
        yield testDevice.SendFleshlightLaunchFW12Cmd(50, 50);
        expect(lastMsg).toEqual(new index_1.FleshlightLaunchFW12Cmd(50, 50, 0));
        yield testDevice.SendLovenseCmd("Vibrate:10;");
        expect(lastMsg).toEqual(new index_1.LovenseCmd("Vibrate:10;", 0));
        yield testDevice.SendVorzeA10CycloneCmd(50, true);
        expect(lastMsg).toEqual(new index_1.VorzeA10CycloneCmd(50, true, 0));
        yield testDevice.SendKiirooCmd(3);
        expect(lastMsg).toEqual(new index_1.KiirooCmd(3, 0));
        yield testDevice.SendStopDeviceCmd();
        expect(lastMsg).toEqual(new index_1.StopDeviceCmd(0));
    }));
    it("should throw on wrong allowed messages", () => __awaiter(this, void 0, void 0, function* () {
        yield expect(testRotateDevice.SendVibrateCmd(0.5)).rejects.toBeInstanceOf(index_1.ButtplugDeviceException);
        yield expect(testVibrateDevice.SendRotateCmd(0.5, true)).rejects.toBeInstanceOf(index_1.ButtplugDeviceException);
        yield expect(testVibrateDevice.SendLinearCmd(0.5, 1.0)).rejects.toBeInstanceOf(index_1.ButtplugDeviceException);
    }));
    it("should reject on out of bounds arguments", () => __awaiter(this, void 0, void 0, function* () {
        yield expect(testVibrateDevice.SendVibrateCmd([0.5, 0.5, 0.5])).rejects.toBeInstanceOf(index_1.ButtplugDeviceException);
    }));
});
//# sourceMappingURL=test-messageutils.js.map