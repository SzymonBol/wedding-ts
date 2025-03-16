function makeId(length) {
   let result = '';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   let counter = 0;
   while (counter < length) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
     counter += 1;
   }
   return result;
}

export async function findInvitationById(collection, id) {
   id = id.replace("l", "I");
    return collection.find({ id }).toArray();
 }

 export async function createInvitation(collection, invitationObj) {
   let guestsArray = [];

   for(let guest of invitationObj.guests){
      guestsArray.push({
         name: guest.name,
         surname: guest.surname,
         isGoing: true,
         isVege: false
      })
   }

   if(invitationObj.additionalPerson && invitationObj.guests.length === 1){
      guestsArray.push({
         name: 'Osoba',
         surname: 'Towarzysząca',
         isGoing: true,
         isVege: false
      })
   }

   let invitation = {
      id : makeId(8),
      guests: guestsArray,
      needAccommodation: false,
      comment: '',
      confirmed: false
   };

    await collection.insertOne(invitation);
 }

 export async function updateIsGoing(collection, idVal, guestName, isGoing) {
    await collection.updateOne(
        { id : idVal},
        { $set: { "values.$[elem].isGoing" : isGoing } },
        { arrayFilters: [ { "elem.name": guestName } ]}
    );
 }

 export async function updateInvitationById(collection, id, guestObject, confirmed, comment, needAccommodation) {
   await collection.updateOne(
       { id : id},
       { $set: {guests : guestObject, confirmed, comment, needAccommodation}}
   );
}

export async function getAllInvitations(collection){
   return collection.find().toArray();
}

export async function deleteInvitation(collection, id){
   return collection.deleteOne({id})
}