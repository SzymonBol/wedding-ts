import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { addEntities, removeEntity, withEntities } from '@ngrx/signals/entities';
import { Invitation } from "../../types/guests-store-data.types";

export const AdminStore = signalStore(
    { providedIn: 'root' },
    withEntities<Invitation>(),
    withMethods((store) => (
        {
            setStoreState(invitations: Invitation[]) : void {
                patchState(store, addEntities(invitations))
            },
            removeInvitation(id: string){
                patchState(store, removeEntity(id));
            }
        }
    ))
)