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
    const {  institution, studentsPerInstitute,organization, admin } = counts;
    const users = [];
   // let studentsPerInstitute = 5;
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
            email: `institution${i+1}@institution.com`,
            userType: 'institution',
            institutionName: college.college,
            organizationName: null
        });


        for (let j = 0; j < studentsPerInstitute; j++) {

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
            email: `org${i+1}@org.com`,
            userType: 'organization',
            institutionName: null,
            organizationName: org.name
        });
    }

    for (let i = 0; i < admin; i++) {
        users.push({
            email: `admin${i + 1}@admin.com`,
            userType: 'admin',
            institutionName: null,
            organizationName: null
        });
    }

    return users;
};

function  getSeedDataForUsers() {


    const seedConfig = { institution: 10,studentsPerInstitute:10, organization: 10, admin: 2 };
    const users = generateUsers(seedConfig).map((user) => {
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
    logger.info("Deleting users table");
    await User.drop();
    logger.info("Users table deleted");
}