import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  user_sender: number;

  @JoinColumn({ name: "user_sender" })
  @ManyToOne(() => User)
  userSender: number;

  @Column()
  user_receiver: number;

  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  userReceiver: number;

  @Column()
  tag_id: number;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: string;

  /* constructor() {
    if (!this.id) {
      this.id = v4();
    }
  } */
}

export { Compliment };
