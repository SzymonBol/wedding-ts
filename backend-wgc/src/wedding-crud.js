export async function findInvitationById(collection, id) {
    return collection.find({ id }).toArray();
 }

 export async function createInvitation(collection, invitationObj) {
    await collection.insertOne(invitationObj);
 }

 export async function updateIsGoing(collection, idVal, guestName, isGoing) {
    await collection.updateOne(
        { id : idVal},
        { $set: { "values.$[elem].isGoing" : isGoing } },
        { arrayFilters: [ { "elem.name": guestName } ]}
    );
 }

 export async function updateInvitationById(collection, id, guestObject, confirmed, comment) {
   await collection.updateOne(
       { id : id},
       { $set: {guests : guestObject, confirmed, comment}}
   );
}