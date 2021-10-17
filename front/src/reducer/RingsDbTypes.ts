export interface IDeck{
    id: number;
    name: string;
    description_md: string;
    heroCodes: number[];
}

export interface IHero{
    name?: string;
    image?: string;
    error?: string;
    code?: number;
}