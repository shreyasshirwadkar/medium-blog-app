import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@shreyas.ss10/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use(async (c, next) => {
  const jwt = c.req.header("authorization") || "";
  if (!jwt) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
  c.set("jwtPayload", payload.id);
  await next();
});

blogRouter.post("/", async (c) => {
  const userId = c.get("jwtPayload");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Invalid Inputs",
    });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const userId = c.get("jwtPayload");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Invalid Inputs",
    });
  }

  await prisma.post.update({
    data: {
      title: body.title,
      content: body.content,
    },
    where: {
      id: body.id,
      authorId: userId,
    },
  });

  return c.text("Blog updated");
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogid = c.req.param("id");
  const blog = await prisma.post.findUnique({
    where: {
      id: blogid,
    },
  });

  return c.json(blog);
});
