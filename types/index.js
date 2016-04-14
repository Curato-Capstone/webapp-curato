// @flow

//Models
//-------------------
export type Place = {
    formatted_address      : string,
    website                : string,
    tags                   : Array<string>,
    name                   : string,
    formatted_phone_number : string,
    opening_hours : {
        weekday_text : Array<string>
    },
    geometry : {
        location: {
            lat : number,
            lng : number
        }
    }
}

export type Preferences = {
    price         : string,
    culture       : string,
    food          : string,
    outdoor       : string,
    entertainment : string,
    relaxation    : string,
    shopping      : string,
    sports        : string
}

export type User = {
    email       : string,
    name        : string,
    age         : number,
    gender      : string,
    ethnicity   : string,
    favorites   : Array<Place>,
    preferences : Preferences
};


//Redux
//--------------------------
export type Action = Object;


