export const preferencesInfo = {
    price         : {
        name: 'Price',
        icon: 'money',
        tooltipValues: ["Saving is all I can do", "I'd prefer to save...",
                        "I could spend a little", "I have some money to blow",
                        "Money isn't an object"]
    },
    culture       : {
        name: 'Culture',
        icon: 'globe',
        tooltipValues: ["You couldn't make me interested", "Once in a while is OK",
                        "I like art and culture", "I'll make sure to see some culture regularly",
                        "I spend hours at a time in a museum!"]
    },
    food          : {
        name: 'Food',
        icon: 'cutlery',
        tooltipValues: ["I only eat if necessary", "I guess I'll eat...", "I like to mix it up.",
                        "I like eating more often than not.", "What else is there in life but food?"]
    },
    outdoor       : {
        name: 'Outdoor',
        icon: 'tree',
        tooltipValues: ["I definitely prefer the indoors", "I don't really spend time outdoors",
                        "I'll hike every once in a while", "You'll find me outside most of the time!",
                        "I'm ready to climb a mountain."]
    },
    entertainment : {
        name: 'Entertainment',
        icon: 'ticket',
        tooltipValues: ["I make my own entertainment better", "Movies and shows are only for artists I care about",
                        "I'll catch a movie every so often", "I like going to shows weekly", "Couldn't live without movies/shows!"]
    },
    relaxation    : {
        name: 'Relaxation',
        icon: 'bed',
        tooltipValues: ["There's too much to do to relax!", "blah",
                        "I'll slow it down from time to time.", "I like kicking back pretty often.",
                        "There's still sand in my shoes from the last time I was at the beach!"]
    },
    shopping      : {
        name: 'Shopping',
        icon: 'shopping-bag',
        tooltipValues: ["Malls terrify me", "I'll do my best to avoid shopping",
                        "Sometimes it's nice to shop.", "I definintely enjoy shopping.",
                        "I'm counting down the minutes till I shop next"],
    },
    sports        : {
        name: 'Sports',
        icon: 'futbol-o',
        tooltipValues: ["What are sports?", "I'll usually pass on sports things.",
                        "I've gone to a few sporting events!", "I own my team's jersey and go regularly.",
                        "I know the fight song by heart and I own my own face paint."],
    }
};

export function prefsToValue(preferences: Object): Object {
    const scaledPrefs = {};
    for (const pref in preferences) {
        if (preferences.hasOwnProperty(pref)) {
            scaledPrefs[pref] = Math.round(preferences[pref] / (200 / 5));
        }
    }
    return scaledPrefs;
}

export function prefsToPx(preferences: Object): Object {
    const scaledPrefs = {};
    for (const pref in preferences) {
        if (preferences.hasOwnProperty(pref)) {
            scaledPrefs[pref] = preferences[pref] * (200 / 5);
        }
    }
    return scaledPrefs;
}
