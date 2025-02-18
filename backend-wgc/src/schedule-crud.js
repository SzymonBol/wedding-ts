export async function getSchedule(collection){
    return collection.find().toArray();
 }
 
export async function createSchedulePoint(collection, params) {
    return await collection.insertOne(params);
}
 
export async function updateSchedulePoint(collection, schedulePoint, id) {
    collection.updateOne(
        { _id : id},
        { $set: schedulePoint}
    )
    return {message: 'jest git mordeczko'};
}

export async function deleteSchedulePoint(collection, id) {
    return await collection.deleteOne({_id: id});
}