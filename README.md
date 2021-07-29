# chat-app

### About Project

This is a basic chat app entirely written in TypeScript with a React front-end. The back-end makes use of a MySQL database. I made this to practice various web technologies, it is not intended to be a production application.

I appreciate much of the code may be sub-optimal or follow bad practice, but this is my first complete React project. There is plenty more that I *could* do to improve the app, but I have no inclination to implement such features right now.

I will not be publically hosting an open chat app like this for obvious reasons, so you will need to follow the steps below to try it yourself.

### Basic Usage

The following steps act as a guide to anyone wanting to casually use the project, it is not a guide for production deployment, although you're probably smart enough to realise that.

1. Create a database in an SQL server and then run the following SQL in it:
```sql
create table users (id serial primary key, username varchar(255) not null, password varchar(60) not null); create table messages (id serial primary key, message varchar(400) not null, userid int references users(id));
```
This reproduces the exact database structure used when creating this app. If you choose to change this, you do so at your own risk.
2. Create a file called ```config.json``` in `/server/src` and fill out your connection details within it.
3. Navigate to `server` and run ```yarn``` followed by ```yarn start```
4. Navigate to `app` and repeat previous two commands.
4. Open ```http://localhost:3000/``` and enjoy!