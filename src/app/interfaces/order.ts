import { ISushi } from "./Sushi";
import { IUser } from "./user";

export interface IOrder {
    userId: IUser;
    sushiIds: ISushi[];
    totalPrice: number;
    status: string;
}