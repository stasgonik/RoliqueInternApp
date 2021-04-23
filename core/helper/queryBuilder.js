const {
    magicString: {
        INFLUENCER_STRING,
        USER_STRING
    }
} = require('../constants');

module.exports = {
    userQueryBuilder: (queryParams) => {
        let filterObject = {};

        for (const key in queryParams) {
            console.log(key);
            switch (key) {
                case USER_STRING.FIRST_NAME:
                    filterObject.first_name = {
                        $regex: queryParams.first_name,
                        $options: 'i'
                    };
                    break;
                case USER_STRING.LAST_NAME:
                    filterObject.last_name = {
                        $regex: queryParams.last_name,
                        $options: 'i'
                    };
                    break;
                case USER_STRING.EMAIL:
                    filterObject.email = {
                        $regex: queryParams.email,
                        $options: 'i'
                    };
                    break;
                case USER_STRING.ID:
                    filterObject._id = queryParams.id;
                    break;
                case USER_STRING.SEARCH:
                    filterObject = {
                        $or: [
                            {
                                first_name: {
                                    $regex: queryParams.search,
                                    $options: 'i'
                                }
                            },
                            {
                                last_name: {
                                    $regex: queryParams.search,
                                    $options: 'i'
                                }
                            }
                        ]
                    };
                    break;
                default:
                    filterObject[key] = queryParams[key];
            }
        }

        return filterObject;
    },
    influencerObjectFilter: (queryParams) => {
        let filterObject = {};

        for (const key in queryParams) {
            switch (key) {
                case INFLUENCER_STRING.FIRST_NAME:
                    filterObject.first_name = {
                        $regex: queryParams.first_name,
                        $options: 'i'
                    };
                    break;
                case INFLUENCER_STRING.LAST_NAME:
                    filterObject.last_name = {
                        $regex: queryParams.last_name,
                        $options: 'i'
                    };
                    break;
                case INFLUENCER_STRING.PROFESSION:
                    filterObject.profession = {
                        $regex: queryParams.profession,
                        $options: 'i'
                    };
                    break;
                case INFLUENCER_STRING.SEARCH:
                    filterObject = {
                        $or: [
                            {
                                first_name: {
                                    $regex: queryParams.search,
                                    $options: 'i'
                                }
                            },
                            {
                                last_name: {
                                    $regex: queryParams.search,
                                    $options: 'i'
                                }
                            },
                            {
                                user_name: {
                                    $regex: queryParams.search,
                                    $options: 'i'
                                }
                            }
                        ]
                    };
                    break;
                default:
                    filterObject[key] = queryParams[key];
            }
        }
        return filterObject;
    },
};
