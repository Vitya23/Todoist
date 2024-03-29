import { toDoDataBaseI } from './interfaces/toDoDataBase.interface';

export const userDataBase = {
  users: [
    {
      id: 1,
      email: 'test@email.com',
      password: '123456Aa@',
      accessToken: 'dbrlgm4fwD',
    },
    {
      id: 2,
      email: 'test2@email.com',
      password: '1234567Aa@',
      accessToken: 'dbrlgm4fwZ',
    },
    {
      id: 3,
      email: 'test3@email.com',
      password: '1234568Aa@',
      accessToken: 'dbrlgm4fwA',
    },
    {
      id: 4,
      email: 'tes4@email.com',
      password: '1234564Aa@',
      accessToken: 'dbrlgm4fwS',
    },
    {
      id: 5,
      email: 'tes5@email.com',
      password: '1234561Aa@',
      accessToken: 'dbrlgm4fws',
    },
    {
      id: 6,
      email: 'tes6@email.com',
      password: '1234562Aa@',
      accessToken: 'dbrlgm4fws',
    },
  ],
};

export const toDoDataBase: toDoDataBaseI = {
  tasks: [
    {
      id: 1,
      userId: 1,
      description: 'Закрыть таску',
      category: 1,
      priority: 1,
      endDate: new Date(
        'Sun Jan 28 2024 00:00:00 GMT+0300 (Москва, стандартное время)'
      ),

      status: 'Ожидает',
    },
    {
      id: 2,
      userId: 1,
      description: 'Купить корм',
      category: 3,
      priority: 2,
      endDate: new Date(
        'Mon Jan 29 2024 00:00:00 GMT+0300 (Москва, стандартное время)'
      ),
      status: 'Ожидает',
    },
    {
      id: 3,
      userId: 1,
      description: 'Купить молоко',
      category: 3,
      priority: 3,
      endDate: new Date(
        'Wed Jan 24 2024 00:00:00 GMT+0300 (Москва, стандартное время)'
      ),
      status: 'Выполнено',
    },
    {
      id: 4,
      userId: 2,
      description: 'Убраться дома',
      category: 2,
      priority: 4,
      endDate: new Date(
        'Wed Jan 24 2024 00:00:00 GMT+0300 (Москва, стандартное время)'
      ),
      status: 'Выполнено',
    },
  ],
};

export const categoriesDataBase = {
  categories: [
    { id: 1, userId: 1, title: 'Работа' },
    { id: 2, userId: 2, title: 'Дела по дому' },
    { id: 3, userId: 1, title: 'Купить продукты' },
    { id: 3, userId: 3, title: 'Работа' },
  ],
};
