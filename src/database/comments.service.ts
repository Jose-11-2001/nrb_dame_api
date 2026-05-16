import { Injectable } from '@nestjs/common';
import { NeonService } from './neon.service';

@Injectable()
export class CommentsService {
  constructor(private neonService: NeonService) {}

  async createComment(comment: string) {
    const result = await this.neonService.query(
      'INSERT INTO comments (comment) VALUES ($1) RETURNING *',
      [comment]
    );
    return result[0];
  }

  async getAllComments() {
    return await this.neonService.query('SELECT * FROM comments ORDER BY created_at DESC');
  }
}