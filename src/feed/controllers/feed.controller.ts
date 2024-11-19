import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common'
import { FeedService } from '../services/feed.service'
import { FeedPost } from '../models/post.interface'
import { Observable } from 'rxjs'
import { DeleteResult, UpdateResult } from 'typeorm'
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard'
import { Roles } from 'src/auth/decorators/roles/roles.decorator'
import { ROLE } from 'src/auth/models/auth.interface'
import { RolesGuard } from 'src/auth/guards/roles/roles.guard'

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':orgId')
  create(
    @Param('orgId') orgId: number,
    @Body() feedPost: FeedPost, 
    @Request() req
  ): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost)
  }

  @Get()
  get(): Observable<FeedPost[]> {
    return this.feedService.getAllPosts()
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost)
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id)
  }
}
