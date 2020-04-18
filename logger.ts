// @ts-nocheck
// import * as Koa from "koa";

// async function logger(ctx: Koa.BaseContext, next: () => Promise<any>) {
//   const db = await getDB(mongoConf.db); // 从db链接池中获取链接实例
//   if (!db) {
//       ctx.body = "mongodb errror at controllers/logger";
//       ctx.status = 500;
//       return;
//   }

//   const doc: LogScheme = {
//       staffName: ctx.headers["staffname"] || "unknown",
//       visitTime: Date.now().toString(10),
//       url: ctx.url,
//       params: ctx.request.body
//   };

//   // 不需要await等待这段逻辑执行完毕
//   db.collection(collectionName)
//       .insertOne(doc)
//       .catch(error =>
//       print(`fail to log info to mongo: ${error.message}`, "error")
//       );

//   return next();
// }

// export default logger;