import { Map, List, Record } from 'immutable';

export class StoreValue extends Record({
    name: "",
    data: null,
    updated_at: 0,
}) {}

export class StoreList extends Record({
    data: List<string>(),
}) {}

export class CampuEvent extends Record({
    id: "",
    name: "",
    start_date: "",
    end_date: "",
    school_id: "",
    created_at: "",
}) {}

export class CampusCurriculum extends Record({
    id: "",
    name: "",
    version: "",
    school_id: "",
    created_at: "",
}) {}

export class CampuSchool extends Record({
    id: "",
    name: "",
    owner_id: "",
    location: "",
    school_id: "",
    created_at: "",
}) {}

export class CampuSubject extends Record({
    id: "",
    name: "",
    school_id: "",
    description: "",
    created_at: "",
}) {}

export class CampusCourse extends Record({
    id: "",
    name: "",
    subject_id: "",
    school_id: "",
    created_at: "",
}) {}

export class CampusTopic extends Record({
    id: "",
    name: "",
    course_id: "",
    school_id: "",
    subject_id: "",
    created_at: "",
}) {}

export class CampusUser extends Record({
    id: "",
    bio: "",
    last_name: "",
    first_name: "",
    profile_image: "",
    school_id: "",
    created_at: "",
}) {}

export class CampusCycle extends Record({
    id: "",
    name: "",
    start_date: "",
    end_date: "",
    school_id: "",
    created_at: "",
}) {}

export class CampusTerm extends Record({
    id: "",
    name: "",
    cycle_id: "",
    school_id: "",
    created_at: "",
}) {}

export class CampusSession extends Record({
    id: "",
    name: "",
    class_id: "",
    lesson_id: "",
    event_id: "",
    term_id: "",
    school_id: "",
    created_at: "",
    instructor_id: "",
}) {}

export class CampusMember extends Record({
    id: "",
    role: "",
    user_id: "",
    class_id: "",
    created_at: "",
}) {}

