require('dotenv').config();

module.exports = {
  "appId": process.env.APPID,
  "productName": "Gmail",
  "publish": "github",
  "afterSign": "scripts/notarize.js",
  "dmg": {
    "sign": false
  },
  "mac": {
    "target": "dmg",
    "category": "public.app-category.utilities",
    "identity": process.env.APPLEDEVID,
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "timestamp": "http://timestamp.apple.com/ts01",
    "entitlements": "build/entitlements.mac.plist",
    "entitlementsInherit": "build/entitlements.mac.plist"
  }
}