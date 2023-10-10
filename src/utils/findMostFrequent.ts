export default function findMostFrequent(arr: string[]): string | undefined {
    let counts: Record<string, number> = {};
    let maxCount = 0;
    let mostFrequent: string | undefined;

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (counts[item] === undefined) {
            counts[item] = 1;
        } else {
            counts[item]++;
        }

        if (counts[item] > maxCount) {
            maxCount = counts[item];
            mostFrequent = item;
        }
    }

    return mostFrequent;
}
