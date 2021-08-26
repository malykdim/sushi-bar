export interface IUser {
    objectId: string;
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
}