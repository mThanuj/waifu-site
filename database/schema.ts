import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const mediaTypeEnum = pgEnum("media_type", ["image", "gif"]);

const timestampFields = {
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now() AT TIME ZONE 'UTC'`),
};

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  googleId: text("google_id"),
  githubId: text("github_id"),
  picture: text(),
  ...timestampFields,
});

export const waifusTable = pgTable("waifus", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  animeFrom: varchar("anime_from", { length: 255 }).notNull(),
  picture: text().notNull(),
  ...timestampFields,
});

export const mediaTable = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  waifuId: uuid("waifu_id")
    .references(() => waifusTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  mediaType: mediaTypeEnum("media_type").notNull(),
  mediaUrl: text().notNull(),
  ...timestampFields,
});

export const likesTable = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  mediaId: uuid("media_id")
    .references(() => mediaTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  ...timestampFields,
});

export const commentsTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  mediaId: uuid("media_id")
    .references(() => mediaTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  comment: text().notNull(),
  ...timestampFields,
});
