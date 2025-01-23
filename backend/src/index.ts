import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { ssgParams } from "hono/ssg";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});
app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User Not Found" });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

app.use("/api/v1/blog/*", async (c, next) => {
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

app.post("/api/v1/blog", async (c) => {
  const id = c.get("jwtPayload");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: id,
    },
  });

  return c.json({ msg: "added blog" });
});

app.put("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  await prisma.post.update({
    data: {
      title: body.title,
      content: body.content,
      published: true,
    },
    where: {
      id: body.id,
    },
  });

  return c.json({ msg: "Blog updated and published!" });
});

app.get("/api/v1/blog/:id", async (c) => {
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

export default app;
