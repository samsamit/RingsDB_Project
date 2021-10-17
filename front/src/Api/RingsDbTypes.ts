export interface IDeck{
    id: number;
    name: string;
    description_md: string;
    heroes: any;
}

export const decodeDeckResponse = (deckResponse: any): IDeck => {
    return {
        name: deckResponse.name,
        description_md: deckResponse.description_md,
        heroes: deckResponse.heroes,
        id: deckResponse.id
    }
}