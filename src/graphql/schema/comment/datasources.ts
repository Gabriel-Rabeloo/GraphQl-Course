import { ValidationError } from 'apollo-server';
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
    updatedAt: new Date(comment.updated_at).toISOString(),
  };
};

export class CommentSQLDataSource extends SQLDataSource {
  async getById(id: string): Promise<Comment> {
    return this.db('comments').where('id', '=', id) as Comment;
  }

  async getByPostId(postId: string): Promise<Comment> {
    const query = this.db('comments').where({ post_id: postId });
    const comments = await query;

    return comments.map((comment: DbComment) => commentReducer(comment));
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

    const dataCreated = await this.db('comments').where('id', '=', created[0]);
    const dataToReturn = commentReducer(dataCreated[0]);

    return dataToReturn;
  }
}
