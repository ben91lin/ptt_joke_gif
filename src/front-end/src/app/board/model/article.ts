export interface Article {
    meta: Meta;
    href: Href;
    update: string;

}

interface Meta {
    board: string;
    url: string;
    timestamp: number;
    title: string;
    push: number;
    author: Author;
}

interface Author {
    ip: string;
    id: string;
    nickname: string;
}

interface Href {
    article: string[];
}