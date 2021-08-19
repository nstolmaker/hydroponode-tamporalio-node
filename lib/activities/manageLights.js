"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageLights = void 0;
const child = __importStar(require("child_process"));
async function manageLights(sensorData) {
    const LIGHTS_IP_ADDRESS = process.env.LIGHTS_IP_ADDRESS || '192.168.0.43';
    const GREENHOUSE_LIGHT_MIN = 50; // if for some reason it's bright in the chamber for another reason, hopefully it won't be more than 50 lumens. It will probably never be less than 5-10 lumens, so 0 isnt a good minimum.
    const newState = sensorData.light < GREENHOUSE_LIGHT_MIN ? 'on' : 'off';
    console.log("[activities/manageLights] decision made to turn lights to state " + newState);
    child.exec(`./tplink_smartplug.py -t ${LIGHTS_IP_ADDRESS} -c ${newState}`, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return 'fail!!!!';
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return 'fail!!!';
        }
    });
    return newState;
}
exports.manageLights = manageLights;
//# sourceMappingURL=manageLights.js.map