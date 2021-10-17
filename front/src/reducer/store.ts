import { IDeck, IHero } from "./RingsDbTypes";
type IType = "NEW_DECK" | "ADD_HERO" | "CLEAR";

interface DeckReducerState{
    deck?: IDeck;
    heros?: IHero[];
}

interface Iaction{
    type: IType;
    payload: any;
}

export const DeckReducerInitial: DeckReducerState = {
    deck: undefined,
    heros: undefined
}

export const deckReducer = (state: DeckReducerState, action: Iaction) => {
    switch (action.type) {
        // Adds new deck to store and loses the old one
      case 'NEW_DECK':
        let deckResponse = action.payload
        // I take the hero codes and put them to array for easier handling
        let heroCodes: number[] = []
        for (let key in deckResponse.heroes){
            heroCodes.push(Number(key))
        }
        // I parse the response json to match the correct interface
        let newDeck = {
            name: deckResponse.name,
            description_md: deckResponse.description_md,
            heroCodes,
            id: deckResponse.id
        }
        return {
            deck: newDeck,
            heros: []
        }
        case 'ADD_HERO':
            let heroResponse = action.payload

            let newHeros = []
             // I parse the response json to match the correct interface
            let decodedHero = {
                name: heroResponse.name,
                image: heroResponse.imagesrc,
                traits: heroResponse.traits,
                sphere_name: heroResponse.sphere_name,
                position: heroResponse.position,
                is_unique: heroResponse.is_unique,
                threat: heroResponse.threat,
                attack: heroResponse.attack,
                defense: heroResponse.defense,
                health: heroResponse.health,
                quantity: heroResponse.quantity,
                deck_limit: heroResponse.deck_limit,
                illustrator: heroResponse.illustrator,
                text: heroResponse.text,
                url: heroResponse.url,
                flavor: heroResponse.flavor,
                error: heroResponse.error ? heroResponse.error : undefined,
                code: heroResponse.code ? heroResponse.code : undefined
            }
            if(state.heros){
                newHeros = [...state.heros, decodedHero]
            }else{
                newHeros = [action.payload]
            }
            return{
                ...state,
                heros: newHeros
            }

        case 'CLEAR':
            return DeckReducerInitial
      default:
        return state;
    }
  };