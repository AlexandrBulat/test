export interface NormalizedObject<T> {
    byIds: {
        [id: string]: T
        [key: number]: T
    };
    ids: number[];
}