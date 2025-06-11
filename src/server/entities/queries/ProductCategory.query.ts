import { Repository } from "@/server/lib/Repository";

export async function GetProductCategories() {
    return Repository.ProductCategories.findMany({
        select: {
            Label: true,
            Name: true
        }
    })
}