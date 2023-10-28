export default function assert(condition: boolean) {
    if (!condition) {
        throw new Error('Assertion failed');
    }
}

export function assertStrictEqual(a: any, b: any) {
    const condition = a === b
    if (!condition) {
        throw new Error(`Assertion failed: ${a} === ${b}`);
    }
}

export function extractNumbersFromString(s: string): number[] {
    return s.split(',').map(item => parseInt(item))
}