import { ValidationError } from 'apollo-server';
import { Knex } from 'knex';
import { Comment, CreateCommentInput, DbComment } from '../../../interfaces/simpleTypes';
import { SQLDataSource } from '../../datasources/sql/sql-datasource';

interface CreateComment extends CreateCommentInput {
  userId: string;
}

const commentReducer = (comment: DbComment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    userId: comment.user_id,
    createdAt: new Date(comment.created_at).toISOString(),
  };
};

export class CommentSQLDataSource extends SQLDataSource<Knex> {
  tableName: string;

  constructor(dbConnection: Knex) {
    super(dbConnection);
    this.tableName = 'comments';
  }

  async getById(id: string): Promise<Comment[]> {
    const query = this.db<DbComment>(this.tableName).where('id', '=', id);
    const comments = await query;

    return comments.map((comment) => commentReducer(comment));
  }

  async getByPostId(postId: string): Promise<Comment[]> {
    const query = this.db<DbComment>(this.tableName).where('post_id', '=', postId);
    const comments = await query;

    return comments.map((comment: DbComment) => commentReducer(comment));
  }

  async create({ userId, postId, comment }: CreateComment) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment: comment,
    };

    const exists = await this.db(this.tableName).where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError('Comment already created');
    }

    const created = await this.db(this.tableName).insert(partialComment);

    const dataCreated = await this.db(this.tableName).where('id', '=', created[0]);
    const dataToReturn = commentReducer(dataCreated[0]);

    return dataToReturn;
  }

  async batchLoaderCallback(postIds: string[]) {
    const query = this.db<DbComment>(this.tableName).whereIn('post_id', postIds);
    const comments = await query;

    const filteredComments = postIds.map((postId) => {
      return comments
        .filter((comment) => String(comment.post_id) === String(postId))
        .map((comment) => commentReducer(comment));
    });

    return filteredComments;
  }
}
