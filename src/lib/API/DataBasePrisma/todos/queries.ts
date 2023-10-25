import { PrismaDBError } from '@/lib/utils/error';
import { getUser } from '../../Services/auth/user';
import prisma from '../../Init/prisma';
import { Todos } from '@prisma/client';

export const GetTodosByUserId = async (): Promise<Todos[]> => {
  const user = await getUser();
  const user_id = user?.userId;

  try {
    const todos = await prisma.todos.findMany({
      where: {
        user_id
      }
    });

    return todos;
  } catch (err) {
    PrismaDBError(err);
  }
};

export const GetTodoById = async (id: number): Promise<Todos> => {
  try {
    const todo = await prisma.todos.findFirst({
      where: {
        id
      }
    });

    return todo;
  } catch (err) {
    PrismaDBError(err);
  }
};

export const GetAllTodos = async (): Promise<Todos[]> => {
  try {
    const todos = await prisma.todos.findMany({
      take: 10
    });

    return todos;
  } catch (err) {
    PrismaDBError(err);
  }
};
