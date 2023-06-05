export type PropsState<T> = {
    value: T,
    setValue: (func: (a: T) => T) => void
}