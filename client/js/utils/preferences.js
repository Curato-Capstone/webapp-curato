export const preferencesInfo = {
    price         : {
        name: 'Price',
        icon: 'money',
        tooltipValues: [],
    },
    culture       : {
        name: 'Culture',
        icon: 'globe',
        tooltipValues: [],
    },
    food          : {
        name: 'Food',
        icon: 'cutlery',
        tooltipValues: [],
    },
    outdoors       : {
        name: 'Outdoors',
        icon: 'tree',
        tooltipValues: [],
    },
    entertainment : {
        name: 'Entertainment',
        icon: 'ticket',
        tooltipValues: [],
    },
    relaxation    : {
        name: 'Relaxation',
        icon: 'bed',
        tooltipValues: [],
    },
    shopping      : {
        name: 'Shopping',
        icon: 'shopping-bag',
        tooltipValues: [],
    },
    sports        : {
        name: 'Sports',
        icon: 'futbol-o',
        tooltipValues: [],
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
