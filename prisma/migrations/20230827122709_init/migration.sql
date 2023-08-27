-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL,
    "dateCompleted" DATETIME NOT NULL,
    "userName" TEXT NOT NULL,
    "userAvatar" TEXT NOT NULL
);
