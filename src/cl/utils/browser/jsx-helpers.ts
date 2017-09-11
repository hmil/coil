/*
 * jsx-helpers
 *
 * Attempt at making jsx templates more readable despite the language's lack of obvious templating primitives.
 */

/**
 * Repeat an element for each items of an array.
 *
 * @param items The array of items to process
 * @param gen A function generating JSX elements for each array item.
 */
export function foreach<T>(items: T[] | undefined, gen: (item: T) => JSX.Element): JSX.Element[] {
    if (items == null) {
        return [];
    }
    return items.map(gen);
}
