export const routes = {
  urls: {
    base: 'http://localhost:3000/',
    dashboard: 'http://localhost:3000/dashboard/main'
  },
  segments: {
    authConfirm: '**/auth/confirmed',
    login: '**/auth/login',
    dash: '**/dashboard/**'
  },
  api: {
    emails: `http://localhost:1080/email`
  },
  filePath: {
    userFile: 'playwright/.auth/user.json'
  }
};

export const user = {
  email: 'test4@yahoo.com'
};

export const todo = {
  todoTitle: 'todo1',
  todoDescription: 'todo description 1'
};
