import {combineReducers} from "redux";
import Course from "./Course";

const reducers = combineReducers({
    course: Course,
});

export default reducers;