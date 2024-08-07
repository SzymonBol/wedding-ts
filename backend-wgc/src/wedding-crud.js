export async function findInvitationById(collection, id) {
    return collection.find({ id }).toArray();
 }