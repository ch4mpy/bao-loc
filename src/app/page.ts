export class Link {
    constructor(
        readonly href: string) { }
}

export class PageLinks {

    constructor(
        readonly first: Link,
        readonly prev: Link,
        readonly self: Link,
        readonly next: Link,
        readonly last: Link) { }
}

export class PageMeta {
    constructor(
        readonly size: number,
        readonly totalElements: number,
        readonly totalPages: number,
        readonly number: number) { }
}
