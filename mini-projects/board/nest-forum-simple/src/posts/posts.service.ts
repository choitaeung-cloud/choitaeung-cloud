import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel(createPostDto);
    return newPost.save();
  }

  async findAll(page: number = 1, limit: number = 10, search: string = ''): Promise<{ posts: Post[], totalCount: number }> {
    const skip = (page - 1) * limit;
    const query: any = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const totalCount = await this.postModel.countDocuments(query).exec();

    const posts = await this.postModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
      
    return { posts, totalCount };
  }

  // ⭐ findOne의 리턴 타입은 PostDocument로 유지합니다.
  async findOne(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return updatedPost;
  }

  async delete(id: string): Promise<any> {
    const result = await this.postModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return result;
  }

  // ⭐ post를 PostDocument로 강제 지정하여 save() 오류를 해결합니다.
  async addComment(id: string, commentDto: any): Promise<PostDocument> {
    const post = await this.findOne(id);
    
    post.comments.push({ ...commentDto, createdAt: new Date() });
    return (post as PostDocument).save(); // ⭐ 여기를 수정했습니다.
  }

  // ⭐ post를 PostDocument로 강제 지정하여 save() 오류를 해결합니다.
  async deleteComment(postId: string, commentIndex: number): Promise<PostDocument> {
    const post = await this.findOne(postId);
    
    if (commentIndex >= 0 && commentIndex < post.comments.length) {
        post.comments.splice(commentIndex, 1);
        return (post as PostDocument).save(); // ⭐ 여기를 수정했습니다.
    } else {
        throw new NotFoundException('Comment not found');
    }
  }
}