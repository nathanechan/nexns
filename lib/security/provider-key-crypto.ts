import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

const algorithm = "aes-256-gcm";
const ivLength = 12;

export function encryptProviderKey(plainTextKey: string) {
  const key = getEncryptionKey();
  const iv = randomBytes(ivLength);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainTextKey, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [iv.toString("base64"), tag.toString("base64"), encrypted.toString("base64")].join(".");
}

export function decryptProviderKey(payload: string) {
  const [ivBase64, tagBase64, encryptedBase64] = payload.split(".");
  if (!ivBase64 || !tagBase64 || !encryptedBase64) {
    throw new Error("Invalid encrypted provider key payload.");
  }

  const decipher = createDecipheriv(algorithm, getEncryptionKey(), Buffer.from(ivBase64, "base64"));
  decipher.setAuthTag(Buffer.from(tagBase64, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedBase64, "base64")),
    decipher.final()
  ]);

  return decrypted.toString("utf8");
}

export function createKeyHint(providerKey: string) {
  const visible = providerKey.slice(-4);
  return `************${visible}`;
}

function getEncryptionKey() {
  const secret = process.env.BYOK_ENCRYPTION_KEY;

  if (!secret) {
    throw new Error("Missing BYOK_ENCRYPTION_KEY environment variable.");
  }

  return createHash("sha256").update(secret).digest();
}
