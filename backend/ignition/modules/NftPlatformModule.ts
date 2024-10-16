import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import * as dotenv from "dotenv";
dotenv.config();

const baseUri = process.env.BASE_URI;
if (!baseUri) {
  throw new Error("BASE_URI is not defined in the environment variables.");
}

const NftPlatformModule = buildModule("NftPlatformModule", (m) => {
  const NftPlatform = m.contract("NftPlatform", [baseUri]);
  return { NftPlatform };
});

export default NftPlatformModule;
