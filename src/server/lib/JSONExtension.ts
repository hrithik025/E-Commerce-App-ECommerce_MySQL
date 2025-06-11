import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { Prisma } from "@prisma/client";

export class JSONExtension {
    public static Serialize(data: [{}] | unknown) {
        if (Array.isArray(data)) {
            data.forEach((element, idx) => {
                this.SerializeObject(element);
            })
        } else {
            this.SerializeObject(data);
        }

        return data;
    }

    private static SerializeObject(data: any) {
        Object.keys(data).forEach((key, idx) => {
            if (typeof data[key] === "bigint" && key.endsWith("Id")) {
                data[key] = CryptoHelper.GenerateEncryptedValue(data[key]);
            }
            if (data[key] instanceof Prisma.Decimal) {
                data[key] = data[key].toNumber()
            }
        })
    }
}