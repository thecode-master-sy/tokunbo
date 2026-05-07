import { Either } from "@/src/lib/fp";
import { ApplicationError } from "@/src/entities/errors";
import { Option } from "@/src/lib/fp";
import { NewOrder, Order } from "@/src/entities/models/order";

export interface IOrderRepository {
  createOrder(input: NewOrder): Promise<Either<ApplicationError, Order>>;
}
