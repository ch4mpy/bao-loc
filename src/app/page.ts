export class Link {
    constructor(
        readonly href: string) { }
}

export class PageLinks {

    constructor(
        readonly self: Link) { }
}

export class PageMeta {
    constructor(
        readonly size: number,
        readonly totalElements: number,
        readonly totalPages: number,
        readonly number: number) { }
}
