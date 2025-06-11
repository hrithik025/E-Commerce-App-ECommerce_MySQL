import CryptoJS from "crypto-js";

type EncryptionData = {
    uniqueId: string;
    createdTime: Date;
    lastRefreshedTime: number;
}

type DecryptionData = {
    success: boolean;
    data?: EncryptionData;
    error?: unknown
}

const key = "Y2ZmODc0MzYyMzMwNzFiZmQ2NTczNTZkZDhkZGM0NTM3YjE4ZDk3YmI0";
const iv = CryptoJS.enc.Utf8.parse("hMjM9nE9UnzUotxXrCyb6w==");
const tokenRefreshTime = 600000;  // For every 10 mins

export async function GenerateToken(data: Omit<EncryptionData, "lastRefreshedTime">) {
    const dataToEncrypt = JSON.stringify({
        uniqueId: data.uniqueId,
        createdTime: data.createdTime,
        lastRefreshedTime: Date.now(),
    })

    let encryptedToken = CryptoJS.AES.encrypt(dataToEncrypt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()

    return encryptedToken;
}

export async function TryDecryptToken(encryptedToken: string): Promise<DecryptionData> {
    try {
        let decrypted = CryptoJS.AES.decrypt(encryptedToken, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);

        const decryptedData = JSON.parse(decrypted);
        return { success: true, data: decryptedData };
    } catch (error) {
        return { success: false, error: error }
    }
}

export async function VerifyToken(encryptedToken: string): Promise<boolean> {
    let decryptedData = await TryDecryptToken(encryptedToken);
    return decryptedData.success;
}

export async function RefreshToken(encryptedToken: string) {
    let decryptedData = await TryDecryptToken(encryptedToken);
    let currentTime = Date.now()
    if (decryptedData.success && decryptedData.data !== undefined && (currentTime - decryptedData.data.lastRefreshedTime) >= tokenRefreshTime) {
        return await GenerateToken(decryptedData.data);
    }
    return encryptedToken;
}
