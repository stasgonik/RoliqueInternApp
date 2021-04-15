module.exports = {
    userQueryBuilder: (queryParams) => {
        const filterObject = {};

        for (const key in queryParams) {
            switch (key) {
                case 'first_name':
                    filterObject.first_name = {
                        $regex: queryParams.first_name,
                        $options: 'i'
                    };
                    break;
                case 'last_name':
                    filterObject.last_name = {
                        $regex: queryParams.last_name,
                        $options: 'i'
                    };
                    break;
                case 'email':
                    filterObject.email = {
                        $regex: queryParams.email,
                        $options: 'i'
                    };
                    break;
                case 'id':
                    filterObject._id = queryParams.id;
                    break;
                default:
                    filterObject[key] = queryParams[key];
            }
        }

        return filterObject;
    },
};
