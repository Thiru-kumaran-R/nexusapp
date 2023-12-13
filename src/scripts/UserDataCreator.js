
import collegesData from './assets/colleges.json';
import orgsData from './assets/orgs.json';
import User from "@/users/UserModel";
import logger from "@/logger";

function getColleges(){
    return collegesData;
}

function getOrgs(){
    return orgsData;

}

const generateUsers = (counts) => {
    const {  institution, organization, admin } = counts;
    const users = [];

    const createEmailPrefixFromName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
    };



    let studentcount = 1;

    const allColleges= getColleges();
    const allOrgs= getOrgs();
    for (let i = 0; i < institution; i++) {
        const college = allColleges[i];
        const emailPrefix = createEmailPrefixFromName(college.college);
        users.push({
            email: `${emailPrefix}@institution.com`,
            userType: 'institution',
            institutionName: college.college,
            organizationName: null
        });

        for (let j = 0; j < 5; j++) {

            users.push({
                email: `student${studentcount }@student.com`,
                userType: 'student',
                institutionName: college.college,
                organizationName: null
            });
            studentcount++;
        }
    }

    for (let i = 0; i < organization; i++) {
        const org = allOrgs[i];
        const emailPrefix = createEmailPrefixFromName(org.name);

        users.push({
            email: `${emailPrefix}@organization.com`,
            userType: 'organization',
            institutionName: null,
            organizationName: org.name
        });
    }

    for (let i = 0; i < admin; i++) {
        users.push({
            email: `admin${i + 1}@test.com`,
            userType: 'admin',
            institutionName: null,
            organizationName: null
        });
    }

    return users;
};

function  getSeedDataForUsers() {

    const userCounts = { student: 2, institution: 1, organization: 1, admin: 1 };
    const users = generateUsers(userCounts).map((user) => {
        const password = "password";
        return {
            ...user,
            password,
            confirmPassword: password
        };
    });
    return users;

}

export async function seedUsers(){

    const isEmpty = await User.isTableEmpty();
    if (isEmpty) {

        logger.info("Seeding users");
        const users = getSeedDataForUsers();

        await User.bulkCreateUsers(users)
        logger.info("Seeding users Complete");
    }else{
        logger.info("Users Already Seeded");
    }


}


export async function cleanUsers(){
    logger.info("Cleaning users");
    await User.truncate();
    logger.info("Cleaning users Complete");
}