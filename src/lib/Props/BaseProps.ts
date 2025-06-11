export default interface BaseProps {
    className?: string;
    params?: Promise<{
        slug: string[];
    }>;
    searchParams?: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}