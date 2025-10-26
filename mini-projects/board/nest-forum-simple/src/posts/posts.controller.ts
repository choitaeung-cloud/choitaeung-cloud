// src/posts/posts.controller.ts
import { Controller, Get, Post, Render, Body, Param, Redirect, Query, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

// @Controller('posts')는 이 컨트롤러의 모든 경로 앞에 /posts가 붙는다는 의미입니다.
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1. 게시글 목록 페이지 (List) - GET /posts
  @Get()
  @Render('posts/list') // views/posts/list.hbs 파일을 렌더링합니다.
  async getPostList(@Query('search') search: string, @Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    // 4단계: 페이지네이션 및 검색 로직은 4단계에서 완성합니다. (지금은 기본 목록만)
    const posts = await this.postsService.findAll(); // 우선 모든 게시글을 가져옵니다.

    return {
      posts, // list.hbs로 게시글 목록을 넘겨줍니다.
      search, // 검색어
      currentPage: parseInt(page),
      limit: parseInt(limit),
      // 나중에 list.hbs에서 사용할 페이지네이션 정보를 미리 계산해 놓습니다.
      totalPages: 1, // 임시 값
    };
  }

  // 2. 새 게시글 생성 (Create) - POST /posts
  @Post()
  @Redirect('/posts', 302) // 게시글 등록 후 목록 페이지로 이동
  async createPost(@Body() createPostDto: CreatePostDto) {
    // Service에게 게시글을 만들어 달라고 요청합니다.
    await this.postsService.create(createPostDto);
  }

  // 3. 게시글 상세 페이지 (Detail) - GET /posts/:id
  @Get(':id')
  @Render('posts/detail') // views/posts/detail.hbs 파일을 렌더링합니다.
  async getPostDetail(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    // detail.hbs로 게시글 정보와 댓글 정보를 넘겨줍니다.
    return { 
      post,
      comments: post.comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) // 댓글을 시간순으로 정렬
    }; 
  }

  // 4. 게시글 수정 처리 (Update) - POST /posts/:id/update
  @Post(':id/update')
  @Redirect('/posts/:id', 302) // 수정 후 상세 페이지로 이동
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postsService.update(id, updatePostDto);
    // Redirect에서 ':id'가 자동으로 파라미터로 대체됩니다.
  }

  // 5. 게시글 삭제 처리 (Delete) - POST /posts/:id/delete
  @Post(':id/delete')
  @Redirect('/posts', 302) // 삭제 후 목록 페이지로 이동
  async deletePost(@Param('id') id: string) {
    await this.postsService.delete(id);
  }

  // 6. 댓글 작성 처리 (Create Comment) - POST /posts/:id/comments
  // 이 기능은 6단계에서 댓글 폼을 만들 때 사용될 거예요.
  @Post(':id/comments')
  @Redirect('/posts/:id', 302) // 댓글 작성 후 상세 페이지로 이동
  async addComment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto) {
    // 닉네임이 비어 있으면 '익명'으로 처리
    const nickname = createCommentDto.nickname || '익명';
    await this.postsService.addComment(id, { ...createCommentDto, nickname });
  }

  // 7. 댓글 삭제 처리 (Delete Comment) - POST /posts/:id/comments/:commentIndex/delete
  // 이 기능은 6단계에서 댓글 삭제 버튼을 만들 때 사용될 거예요.
  @Post(':postId/comments/:commentIndex/delete')
  @Redirect('/posts/:postId', 302) // 삭제 후 상세 페이지로 이동
  async deleteComment(@Param('postId') postId: string, @Param('commentIndex') commentIndex: string) {
    try {
      // commentIndex는 문자열로 넘어오므로 숫자로 변환
      await this.postsService.deleteComment(postId, parseInt(commentIndex));
    } catch (error) {
        // 댓글이 없거나 문제가 생기면 상세 페이지로 돌아가기
        if (error instanceof NotFoundException) {
            console.error('댓글 삭제 실패:', error.message);
        } else {
            throw error;
        }
    }
  }
}