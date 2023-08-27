-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL,
    "dateCompleted" DATETIME,
    "userName" TEXT NOT NULL,
    "userAvatar" TEXT NOT NULL
);
INSERT INTO "new_Task" ("dateCompleted", "dateCreated", "id", "task", "userAvatar", "userName") SELECT "dateCompleted", "dateCreated", "id", "task", "userAvatar", "userName" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
