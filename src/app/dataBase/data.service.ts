import { Injectable } from "@angular/core";
import { Data } from "../Models/Data.model";

@Injectable()

export class DataService {
    data: Data[] = [{ Id: 15656565665, Name: "Moshe", Country: "Israel", City: "Jerusalem", DataJoined: "fds", Date: new Date('01/01/2020'), Email: "555@gmail.com", Grade: 56, Subject: "Mathematics", Zip: 255656 },
    { Id: 15656565665, Name: "Moshe", Country: "Israel", City: "Jerusalem", DataJoined: "fds", Date: new Date('01/02/2020'), Email: "555@gmail.com", Grade: 98, Subject: "Algebra", Zip: 255656 },
    { Id: 15656565665, Name: "Moshe", Country: "Israel", City: "Ashdod", DataJoined: "jjk", Date: new Date('01/03/2020'), Email: "4664@gmail.com", Grade: 95, Subject: "Sciences", Zip: 255656 },
    { Id: 5454542, Name: "Yael", Country: "Israel", City: "Ashdod", DataJoined: "jjk", Date: new Date('01/01/2020'), Email: "4664@gmail.com", Grade: 100, Subject: "Mathematics", Zip: 255656 },
    { Id: 5454542, Name: "Yael", Country: "Israel", City: "Ashdod", DataJoined: "jjk", Date: new Date('01/02/2020'), Email: "4664@gmail.com", Grade: 100, Subject: "Sciences", Zip: 255656 },
    { Id: 565656564, Name: "Israel", Country: "Israel", City: "Ashdod", DataJoined: "jjk", Date: new Date('01/01/2020'), Email: "4664@gmail.com", Grade: 41, Subject: "Mathematics", Zip: 255656 },
    { Id: 565656564, Name: "Israel", Country: "Israel", City: "Ashdod", DataJoined: "jjk", Date: new Date('01/02/2020'), Email: "4664@gmail.com", Grade: 41, Subject: "Algebra", Zip: 255656 },
    { Id: 656565, Name: "Motty", Country: "Israel", City: "Jerusalem", DataJoined: "fds", Date: new Date('01/01/2020'), Email: "555@gmail.com", Grade: 85, Subject: "Sciences", Zip: 255656 },
    { Id: 656565, Name: "Motty", Country: "Israel", City: "Jerusalem", DataJoined: "fds", Date: new Date('01/02/2020'), Email: "555@gmail.com", Grade: 36, Subject: "Algebra", Zip: 255656 },
    { Id: 7545454, Name: "Yosef", Country: "Israel", City: "Jerusalem", DataJoined: "fds", Date: new Date('01/01/2020'), Email: "555@gmail.com", Grade: 46, Subject: "Sciences", Zip: 255656 },
    { Id: 7545454, Name: "Yosef", Country: "Israel", City: "Jerusalem", DataJoined: "fds", Date: new Date('01/01/2020'), Email: "555@gmail.com", Grade: 46, Subject: "Algebra", Zip: 255656 },
    { Id: 7545454, Name: "Yosef", Country: "Israel", City: "Jerusalem", DataJoined: "fds", Date: new Date('01/01/2020'), Email: "555@gmail.com", Grade: 46, Subject: "Mathematics", Zip: 255656 },
    { Id: 8565656, Name: "Shira", Country: "Israel", City: "Netanya", DataJoined: "jjk", Date: new Date('01/01/2020'), Email: "4664@gmail.com", Grade: 73, Subject: "Physics", Zip: 255656 },
    { Id: 8565656, Name: "Shira", Country: "Israel", City: "Netanya", DataJoined: "jjk", Date: new Date('01/02/2020'), Email: "4664@gmail.com", Grade: 73, Subject: "Algebra", Zip: 255656 },
    { Id: 8565656, Name: "Shira", Country: "Israel", City: "Netanya", DataJoined: "jjk", Date: new Date('01/03/2020'), Email: "4664@gmail.com", Grade: 73, Subject: "Mathematics", Zip: 255656 }];
    getData() {
        return this.data;
    }
    addData(data: Data) {
        this.data.push(data);
    }
    deleteData(index: number) {
        this.data.splice(index, 1);

    }
    getSubjects() {
        return this.data.map(x => x.Subject);


    }
    getDates() {
        return this.data.map(x => x.Date);
    }

}