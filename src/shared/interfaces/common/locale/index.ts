export interface ILanguage {
    code: string;
    value: string;
    prefix: string;
    label: string;
    flag: string;
    text: string;
    alt: string;
    [key: string]: any;
}

export interface ICurrency {
    flag: string;
    text: string;
    [key: string]: any;
}
