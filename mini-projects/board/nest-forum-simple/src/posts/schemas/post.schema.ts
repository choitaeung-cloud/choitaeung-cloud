import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PostDocument = Post & Document;


@Schema({
  timestamps: true, 
})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;


  @Prop({ type: [{ nickname: String, content: String, createdAt: Date }] })
  comments: { nickname: string; content: string; createdAt: Date }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);