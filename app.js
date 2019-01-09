const users = [{
    id:1,
    name:'amit',
    schoolId:101
}, {
    id:2,
    name:'Jesse',
    schoolId:102
}, {
    id:3,
    name:'amit',
    schoolId:999
}]

const grade = [{
    id:1,
    schoolId:101,
    grade:86
}, {
    id:2,
    schoolId:102,
    grade:100
}, {
    id:3,
    schoolId:999,
    grade:80
}, {
    id:1,
    schoolId:101,
    grade:96
}];

const getUser = (id)=>{
    return new Promise((resolve, reject)=>{
        const user = users.find((user)=>user.id === id);

        if(user){
            resolve(user);
        }else{
            reject(`Unable to find user with id ${id}`);
        }
    })
}

const getGrades = (schoolId)=>{
    return new Promise((resolve, reject)=>{
        resolve(grade.filter((grade)=>grade.schoolId === schoolId));
    })
}

const getStatus = (userId)=>{
    let person;
    return getUser(userId).then((user)=>{
        person = user;
        return getGrades(user.schoolId);
    }).then((grades)=>{
        let average = 0;

        if(grades.length > 0){
            average = grades.map((grade)=>grade.grade).reduce((a, b)=>a + b)/grades.length;
        }
        return `${person.name} has a ${average}% in the class`;
    })
}

getStatus(12).then((status)=>{
    console.log(status);
}).catch((e)=>{
    console.log(e);
});