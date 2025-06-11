import CryptoJS from "crypto-js";
import pako from "pako";

export class CryptoHelper {
    private static KEY = "b79fe8f7bb43354bb07f90f700b8c9cfba8b013dfb35c9fa57f46e54c5b736a3";
    private static IV = CryptoJS.enc.Utf8.parse("f5b2c1e0fbbf303cf9d5f5d9d8a4d989");

    public static GenerateRandomValue(): string {
        return Date.now.toString();
    }

    public static GenerateEncryptedValue(number: bigint): string {
        const data = {
            value: number.toString(),
            random: this.GenerateRandomValue()
        }

        let encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(data), this.KEY, {
            iv: this.IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        return this.Compress(encryptedValue);
    }

    public static GetDecryptedValue(data: string): bigint {
        let decompressedData = this.Decompress(data);
        let decryptedData = CryptoJS.AES.decrypt(decompressedData, this.KEY, {
            iv: this.IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);

        const decryptedObject = JSON.parse(decryptedData);
        return BigInt(decryptedObject["value"]);
    }

    public static Compress(data: string): string {
        const compressedString = pako.deflate(data, { level: 9 });
        const base64Encoded = Buffer.from(compressedString).toString('base64');
        return base64Encoded;
    }

    public static Decompress(data: string): string {
        const base64Decoded = Buffer.from(data, 'base64');
        const decompressedString = pako.inflate(base64Decoded, { to: 'string' });
        return decompressedString;
    }
}