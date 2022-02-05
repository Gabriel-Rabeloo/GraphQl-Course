import { knex } from '../';
import { comments } from '../../../../db.json';
import { Comment } from '../../../interfaces/simpleTypes';
import { dateISOtoMySQL } from './date-iso-to-mysql';

export const commentsForDb = comments.map((comment) => {
  return {
    comment: comment.comment,
    user_id: comment.userId,
    post_id: comment.postId,
    created_at: dateISOtoMySQL(comment.createdAt),
  };
});

export const insertComment = (comments: Comment[]) => {
  knex('comments')
    .insert(comments)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      knex.destroy();
    });
};
