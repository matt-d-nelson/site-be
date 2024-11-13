import { Injectable } from '@nestjs/common'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { FeedPostEntity } from '../models/post.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FeedPost } from '../models/post.interface'
import { from, Observable } from 'rxjs'
import { AuthUser } from 'src/auth/models/auth.interface'

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(user: AuthUser, feedPost: FeedPost): Observable<FeedPost> {
    feedPost.body = user.email
    return from(this.feedPostRepository.save(feedPost))
  }

  getAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find())
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost))
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id))
  }
}
