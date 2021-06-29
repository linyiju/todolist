# ToDoList API Side Project

## overview 
The easy application for node.js !!

## Requirements
- Node.js
## Database
- MySQL

## API Description
|Name|URL | Action|Description|
|---|------|-----------|------|
|首頁| /	|GET	|使用者查詢所有代辦資訊
|註冊	|/user	|POST	|1. 使用者使用相心及密碼註冊
|登入	|/user/login|	POST|	1. 使用帳號密碼登入
|登出	|/user/logout|POST	|使用者登出和清除Session和Token相關資訊|
|刪除使用者|	/user/delete/{id}|	DELETE	|
|編輯使用者|	/user/{id}|	PATCH	|
|獲取使用者|	/user/{id}	|GET	|
|新增代辦事項|	/task/|	POST	|1. 新增代辦事項
|刪除代辦事項|	/task/delete	|DELETE	|1. 刪除代辦事項
|編輯代辦事項|	/task/{id}	|PATCH	|1. 編輯代辦事項
|變更代辦事項	|/change		| |1.編輯代辦狀態

## Ref.
- [Sequelize](http://sequelize.org/)
- [How to use Sequelize](https://ste5022424.github.io/2019/06/14/Sequelize-sequelize-auto/)