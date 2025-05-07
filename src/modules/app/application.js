"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = Application;
const react_1 = __importStar(require("react"));
const ol_1 = require("ol");
const Tile_1 = __importDefault(require("ol/layer/Tile"));
const source_1 = require("ol/source");
const proj_1 = require("ol/proj");
require("ol/ol.css");
const format_1 = require("ol/format");
const Vector_1 = __importDefault(require("ol/layer/Vector"));
const Vector_2 = __importDefault(require("ol/source/Vector"));
const style_1 = require("ol/style");
(0, proj_1.useGeographic)();
const osmLayer = new Tile_1.default({ source: new source_1.OSM() });
const municipalityLayer = new Vector_1.default({
  source: new Vector_2.default({
    url: "/geojson/Fylker Norge.geojson",
    format: new format_1.GeoJSON(),
  }),
  style: new style_1.Style({
    stroke: new style_1.Stroke({
      color: "blue",
      width: 2,
    }),
  }),
});
// const schoolLayer = new VectorLayer({
//   source: new VectorSource({
//     url: "/kws2100-kartbaserte-websystemer/api/skoler",
//     format: new GeoJSON(),
//   }),
// });
const map = new ol_1.Map({
  view: new ol_1.View({ center: [10.8, 59.9], zoom: 8 }),
  layers: [osmLayer, municipalityLayer],
});
function Application() {
  const mapRef = (0, react_1.useRef)(null);
  (0, react_1.useEffect)(() => map.setTarget(mapRef.current), []);
  return react_1.default.createElement("div", { ref: mapRef });
}
