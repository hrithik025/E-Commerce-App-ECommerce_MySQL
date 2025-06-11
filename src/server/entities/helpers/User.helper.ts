import CryptoJS from "crypto-js";

export class UserHelper {
    public static GenerateHashedPassword(Email: string, Password: string) {
        const passwordHash = CryptoJS.SHA256(this.MixedPassword(Email, Password));
        return passwordHash.toString(CryptoJS.enc.Base64);
    }

    private static MixedPassword(Email: string, Password: string): string {
        let mixedPassword = "";
        let emailLength = Email.length;
        let passwordLength = Password.length;

        for (let i = 0; i < Math.max(emailLength, passwordLength); i++) {
            if (i < emailLength) {
                mixedPassword += Email.charAt(i);
            }
            if (i < passwordLength) {
                mixedPassword += Password.charAt(i);
            }
        }

        return mixedPassword;
    }
}