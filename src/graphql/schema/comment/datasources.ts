import { ValidationError } from 'apollo-server';
import { Comment, CreateCommentInput } from '../../../interfaces/simpleTypes';
import { SQLDataSource } from '../../datasources/sql/sql-datasource';

interface CreateComment extends CreateCommentInput {
  userId: string;
}

export class CommentSQLDataSource extends SQLDataSource {
  async getById(id: string): Promise<Comment> {
    return this.db('comments').where('id', '=', id) as Comment;
  }

  async create({ userId, postId, comment }: CreateComment) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment: comment,
    };

    const exists = await this.db('comments').where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError('Comment already created');
    }

    const created = await this.db('comments').insert(partialComment);
    // const dataCreated = await this.db('comments').where('id', '=', created[0]);

    return {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment,
    };
  }
}
