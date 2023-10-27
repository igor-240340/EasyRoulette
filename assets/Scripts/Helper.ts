export default function assert(condition: boolean) {
    if (!condition) {
        throw new Error('Assertion failed');
    }
}

export function extractNumbersFromString(s: string): number[] {
    return s.split(',').map(item => parseInt(item))
}