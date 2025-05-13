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

// Get workout by id
async function updateWorkout(workout) {
    try {
        const collection = db.collection("Workout");
        const filter = { _id: new ObjectId(workout._id) };

        const result = await collection.updateOne(filter, {
            $set: {
                name: workout.name,
                description: workout.description,
                duration: workout.duration,
                tags: workout.tags
            },
        });

        return result;
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

async function createWorkout(workout) {
    try {
        const collection = db.collection("Workout");
        const result = await collection.insertOne(workout);
        return result.insertedId.toString(); // convert ObjectId to String
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

async function deleteWorkout(id) {
    try {
        const collection = db.collection("Workout");
        const filter = { _id: new ObjectId(id) };
        const result = await collection.deleteOne(filter);

        return result;
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

async function getWorkoutExercises(id) {
    let workoutExercises = [];
    try {
        const agg = [
            {
                '$match': {
                    'workout_id': id
                }
            }, {
                '$addFields': {
                    'exerciseObjectId': {
                        '$toObjectId': '$exercise_id'
                    }
                }
            }, {
                '$lookup': {
                    'from': 'Exercise',
                    'localField': 'exerciseObjectId',
                    'foreignField': '_id',
                    'as': 'exercise'
                }
            }, {
                '$unwind': {
                    'path': '$exercise'
                }
            }, {
                '$project': {
                    'exerciseObjectId': 0
                }
            }
        ];

        const collection = db.collection('WorkoutExercise');
        const cursor = await collection.aggregate(agg);
        workoutExercises = await cursor.toArray();

        workoutExercises.forEach(workoutExercise => {
            // convert ObjectId to String
            workoutExercise._id = workoutExercise._id.toString();
            workoutExercise.exercise._id = workoutExercise.exercise._id.toString();
        });
    } catch (error) {
        // TODO: errorhandling
    }
    return workoutExercises;
}

async function createWorkoutExercise(workoutExercise) {
    try {
        const collection = db.collection("WorkoutExercise");
        const result = await collection.insertOne(workoutExercise);
        return result.insertedId.toString(); // convert ObjectId to String
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}

async function deleteWorkoutExercise(id) {
    try {
        const collection = db.collection("WorkoutExercise");
        const filter = { _id: new ObjectId(id) };
        const result = await collection.deleteOne(filter);

        return result;
    } catch (error) {
        // TODO: errorhandling
        console.log(error.message);
    }
    return null;
}



export default { getExercises, getWorkouts, getWorkout, updateWorkout, createWorkout, deleteWorkout, getWorkoutExercises, createWorkoutExercise, deleteWorkoutExercise }