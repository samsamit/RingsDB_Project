import { IDeck, IHero } from "./RingsDbTypes";
type IType = "NEW_DECK" | "ADD_HERO";

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
      case 'NEW_DECK':
        let deckResponse = action.payload
        let heroCodes: number[] = []
        for (let key in deckResponse.heroes){
            heroCodes.push(Number(key))
        }
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
            console.log(heroResponse)
            let newHeros = []
            let decodedHero = {
                name: heroResponse.name,
                image: heroResponse.imagesrc,
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

      default:
        return state;
    }
  };