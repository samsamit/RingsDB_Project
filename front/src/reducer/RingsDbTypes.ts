export interface IDeck{
    id: number;
    name: string;
    description_md: string;
    heroCodes: number[];
}

export interface IHero{
    name?: string;
    traits?: string;
    image?: string;
    sphere_name?: string;
    position?: string;
    is_unique?: string;
    threat?: string;
    attack?: string;
    defense?: string;
    health?: string;
    quantity?: string;
    deck_limit?: string;
    illustrator?: string;
    text?: string;
    url?: string;
    flavor?: string;
    error?: string;
    code?: number;
}