import { Either, left, right } from "@/src/lib/fp";
import {
  ApplicationError,
  makeError,
  mapPostgrestErrorToApplicationError,
} from "@/src/entities/errors";
import { IOrderRepository } from "@/src/application/repositories/order.repository.interface";
import { NewOrder } from "@/src/entities/models/order";
import db from "@/db";
import { eq } from "drizzle-orm";
import { orderTable } from "@/db/schema";
import { PostgresError } from "postgres";
import { Order, UpdateOrderInput } from "@/src/entities/models/order";

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

  const updateOrder = async (
    reference: string,
    input: UpdateOrderInput,
  ): Promise<Either<ApplicationError, Order>> => {
    try {
      const [updated] = await db
        .update(orderTable)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(orderTable.paymentReference, reference))
        .returning();

      if (!updated) {
        return left(
          makeError(
            "NotFoundError",
            `Order with reference ${reference} not found`,
          ),
        );
      }

      return right(updated);
    } catch (error) {
      return left(mapPostgrestErrorToApplicationError(error as PostgresError));
    }
  };

  return { createOrder, updateOrder };
};

export default makeOrderRepository;
