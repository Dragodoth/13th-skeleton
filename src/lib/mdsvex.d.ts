declare module 'mdsvex' {
    export function compile(markdown: string): Promise<{ code: string }>;
}