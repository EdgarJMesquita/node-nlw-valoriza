import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: "user_sender" })
  @ManyToOne(() => User)
  userSender: string;

  @Column()
  user_receiver: string;

  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  userReceiver: string;

  @Column()
  tag_id: string;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

export { Compliment };
