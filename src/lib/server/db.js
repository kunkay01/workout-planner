import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);

await client.connect();

const db = client.db('WorkoutPlannerDB')

//Get all Exercises
async function getExercises() {
    let exercises = [];
    try {
        const collection = db.collection('Exercise');
        const query = {};
        exercises = await collection.find(query).toArray();
        exercises.forEach(exercise => {
            // convert ObjectId to String
            exercise._id = exercise._id.toString();
        });
    } catch (error) {
        // TODO: errorhandling
    }
    return exercises;
}

//Get all workouts
async function getWorkouts() {
    let workouts = [];
    try {
        const collection = db.collection('Workout');
        const query = {};
        workouts = await collection.find(query).toArray();
        workouts.forEach(workout => {
            // convert ObjectId to String
            workout._id = workout._id.toString();
        });
    } catch (error) {
        // TODO: errorhandling
    }
    return workouts;
}

// Get workout by id
async function getWorkout(id) {
    let workout = null;
    try {
        const collection = db.collection("Workout");
        const query = { _id: new ObjectId(id) }; // filter by id
        workout = await collection.findOne(query);

        if (!workout) {
            console.log("No workout with id " + id);
            // TODO: errorhandling
        } else {
            workout._id = workout._id.toString(); // convert ObjectId to String
        }
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return workout;
}

// async function createMovie(movie) {
//     try {
//       const collection = db.collection("movies");
//       const result = await collection.insertOne(movie);
//       return result.insertedId.toString(); // convert ObjectId to String
//     } catch (error) {
//       // TODO: errorhandling
//       console.log(error.message);
//     }
//     return null;
//   }
  


export default { getExercises, getWorkouts, getWorkout }