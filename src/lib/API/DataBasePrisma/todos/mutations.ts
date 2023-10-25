'use server';

import prisma, { Prisma } from '../../Init/prisma';
import { getUser } from '../../Services/auth/user';
import { PrismaDBError } from '@/lib/utils/error';
import { todoFormValues } from '@/lib/types/validations';

interface UpdateTodoPropsI extends todoFormValues {
  id: number;
}

interface DeleteTodoPropsI {
  id: number;
}

export const CreateTodo = async ({ title, description }: todoFormValues) => {
  const user = await getUser();

  const user_id = user?.userId;
  const author = user?.display_name || '';
  const data: Prisma.TodosCreateInput = {
    title,
    description,
    author,
    user: { connect: { id: user_id } }
  };

  try {
    await prisma.todos.create({ data });
  } catch (err) {
    PrismaDBError(err);
  }
};

export const UpdateTodo = async ({ id, title, description }: UpdateTodoPropsI) => {
  const data: Prisma.TodosUpdateInput = {
    title,
    description
  };

  try {
    await prisma.todos.update({
      where: {
        id
      },
      data
    });
  } catch (err) {
    PrismaDBError(err);
  }
};

export const DeleteTodo = async ({ id }: DeleteTodoPropsI) => {
  try {
    await prisma.todos.delete({
      where: {
        id
      }
    });
  } catch (err) {
    PrismaDBError(err);
  }
};
