'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { todoFormValues } from '@/lib/types/validations';

interface UpdateTodoPropsI extends todoFormValues {
  id: number;
}

interface DeleteTodoPropsI {
  id: number;
}

export const CreateTodo = async ({ title, description }: todoFormValues) => {
  const user = await GetUser();

  const user_id = user?.id;
  const author = user?.display_name || '';
  const data: Prisma.TodoCreateInput = {
    title,
    description,
    author,
    user: { connect: { id: user_id } }
  };

  try {
    await prisma.todo.create({ data });
  } catch (err) {
    PrismaDBError(err);
  }
};

export const UpdateTodo = async ({ id, title, description }: UpdateTodoPropsI) => {
  const data: Prisma.TodoUpdateInput = {
    title,
    description
  };

  try {
    await prisma.todo.update({
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
    await prisma.todo.delete({
      where: {
        id
      }
    });
  } catch (err) {
    PrismaDBError(err);
  }
};
