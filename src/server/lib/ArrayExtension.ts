

export class ArrayExtension<T> extends Array<T> {
    public static GroupBy<T>(items: T[], keyGetterFunc: (item: T) => string): Map<string, T[]> {
        const map = new Map<string, T[]>();
        items.forEach(item => {
            const key = keyGetterFunc(item);
            const items = map.get(key);
            if (items !== null && items !== undefined) {
                items.push(item);
            } else {
                map.set(key, [item]);
            }
        })
        return map;
    }
}