import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

export default (req: Request, res: Response, next: NextFunction) => {
  const start = new Date();

  res.on("finish", () => {
    const end = new Date();
    const duration = end.getTime() - start.getTime();
    console.log(
      chalk.green(`${end.toLocaleString()}`) +
        " | " +
        chalk.blue(`${req.method} ${req.url}`) +
        " | " +
        chalk.magenta(`Response sent in ${duration}ms`)
    );
  });

  next();
};
