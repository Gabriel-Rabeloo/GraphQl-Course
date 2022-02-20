import { ApolloServer } from 'apollo-server';

import { knex } from './infrastructure/knex';

import { context } from './graphql/context';

import { PostsApi } from './graphql/schema/post/dataSources';
import { UsersApi } from './graphql/schema/user/dataSources';

import { typeDefs, resolvers } from './graphql/schema';
import { LoginApi } from './graphql/schema/login/dataSources';

import { CommentSQLDataSource } from './graphql/schema/comment/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
      commentDb: new CommentSQLDataSource(knex),
    };
  },
  uploads: false,
  subscriptions: {
    onConnect: (connectionParams: any, websocket: any) => {
      return {
        req: websocket.upgradeReq,
      };
    },
    path: '/',
    keepAlive: 5000,
  },
});

const port = process.env.PORT || 4003;
server.listen(port).then(({ url }) => {
  console.log(`Server listening on url ${url}`);
});
