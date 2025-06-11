import { ProductFiltersSchema } from "@/server/types";
import { CryptoHelper } from "@/server/lib/CryptoHelper";

export default class URLParamHandler<T> {
    searchParams: any;

    public constructor(searchParams?: string | null) {
        if (searchParams !== undefined && searchParams !== null) {
            this.searchParams = this.decodeParams(searchParams);
        } else {
            this.searchParams = {};
        }
    }

    public getParam(key: string): string | string[] | undefined {
        const jsonKey = key as keyof T;
        return this.searchParams[jsonKey];
    }

    public addOrUpdateParam(key: string, value: string | string[], isOverride: boolean = false) {
        const jsonKey = key as keyof T;
        if (jsonKey !== undefined) {
            let isSrcArray = Array.isArray(this.searchParams[jsonKey]) && !isOverride;
            let isTgtArray = Array.isArray(value);
            if (isSrcArray && isTgtArray) {
                (this.searchParams[jsonKey] as string[])?.concat(value);
            } else if (isSrcArray && !isTgtArray) {
                (this.searchParams[jsonKey] as string[])?.push(value as string);
            } else if (!isSrcArray && isTgtArray) {
                (this.searchParams[jsonKey] as string[]) = value as string[];
            } else {
                (this.searchParams[jsonKey] as string) = value as string;
            }
        }
    }

    public removeParam(key: string) {
        const jsonKey = key as keyof T;
        if (jsonKey !== undefined) {
            delete this.searchParams[jsonKey];
        }
    }

    public static GetURLParamObjectFromSearchParams(obj: { [key: string]: string | string[] | undefined } | undefined): URLSearchParams {
        if (!obj) {
            return new URLSearchParams();
        }
        const params = new URLSearchParams();
        for (const key in obj) {
            const value = obj[key];
            if (value === undefined) {
                continue; // Skip undefined values
            }
            if (typeof value === 'string') {
                params.append(key, value);
            }
            else if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            }
        }

        return params;
    }

    // This method encodes JSON to a URL-safe string
    public encodeParams(): string {
        const jsonString = JSON.stringify(this.searchParams);
        return CryptoHelper.Compress(jsonString);
    }

    // This method decodes a URL-encoded string back to a JSON object
    public decodeParams(encoded: string): object {
        const decodedObject = CryptoHelper.Decompress(encoded);
        return JSON.parse(decodedObject); // Convert the JSON string back to an object
    }

    // Update URL and trigger re-fetch
    static updateURLParam(router: any, paramName: string, paramValue: string): void {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(paramName, paramValue); // Add or update the query param

        // Update the URL without triggering a full page reload
        router.push({
            pathname: window.location.pathname,
            query: Object.fromEntries(urlParams.entries()),
        }, undefined, { shallow: true }); // shallow ensures no full reload
    }

    // Append a new value to an existing parameter or create it if doesn't exist
    static appendToURLParam(router: any, paramName: string, paramValue: string): void {
        const urlParams = new URLSearchParams(window.location.search);
        const existingValue = urlParams.get(paramName);

        if (existingValue) {
            urlParams.set(paramName, `${existingValue},${paramValue}`); // Append new value to existing
        } else {
            urlParams.set(paramName, paramValue); // Create new parameter if none exists
        }
        // // Update the URL and trigger re-fetch
        router.push({
            pathname: window.location.pathname,
            query: Object.fromEntries(urlParams.entries()),
        }, undefined, { shallow: true });
    }

    // Get a specific parameter from the URL
    static getParamFromURL(paramName: string): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(paramName);
    }
}
