import { Either, left, right } from "@/src/lib/fp";
import {
  ApplicationError,
  makeError,
  mapPostgrestErrorToApplicationError,
} from "@/src/entities/errors";
import { IOrderRepository } from "@/src/application/repositories/order.repository.interface";
import { NewOrder } from "@/src/entities/models/order";
import db from "@/db";
import { orderTable } from "@/db/schema";
import { PostgresError } from "postgres";
import { Order } from "@/src/entities/models/order";

const makeOrderRepository = (): IOrderRepository => {
  const createOrder = async (
    input: NewOrder,
  ): Promise<Either<ApplicationError, Order>> => {
    try {
      const [order] = await db.insert(orderTable).values(input).returning();

      return right(order);
    } catch (error) {
      return left(mapPostgrestErrorToApplicationError(error as PostgresError));
    }
  };

  return { createOrder };
};

export default makeOrderRepository;
