const {
    magicString: {
        INFLUENCER_STRING,
        USER_STRING,
        CAMPAIGN_STRING
    }
} = require('../constants');

module.exports = {
    userQueryBuilder: (queryParams) => {
        let filterObject = {};

        for (const key in queryParams) {
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
    campaignQueryBuilder: (queryParams) => {
        const filterObject = {};

        for (const key in queryParams) {
            switch (key) {
                case CAMPAIGN_STRING.TITLE:
                    filterObject.title = {
                        $regex: queryParams[CAMPAIGN_STRING.TITLE],
                        $options: 'i'
                    };
                    break;
                case CAMPAIGN_STRING.BRAND:
                    filterObject._brand = queryParams[CAMPAIGN_STRING.BRAND];
                    break;
                case CAMPAIGN_STRING.BUDGET_LTE:
                    filterObject['budget.totalBudget'] = Object.assign(filterObject['budget.totalBudget'] || {},
                        { $lte: +queryParams[CAMPAIGN_STRING.BUDGET_LTE] });
                    break;
                case CAMPAIGN_STRING.BUDGET_GTE:
                    filterObject['budget.totalBudget'] = Object.assign(filterObject['budget.totalBudget'] || {},
                        { $gte: +queryParams[CAMPAIGN_STRING.BUDGET_GTE] });
                    break;
                default:
                    filterObject[key] = queryParams[key];
            }
        }

        return filterObject;
    },
};
